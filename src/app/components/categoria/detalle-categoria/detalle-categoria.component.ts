import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import { Album } from '../../../models/album';
import { Categoria } from '../../../models/categoria';
import { Musica } from '../../../models/musica';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../services/artista.service';
import { ToasterService } from '../../../services/toaster.service';
import { AlbumService } from '../../../services/album.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MusicaService } from '../../../services/musica.service';
import { DataService } from '../../../services/daata.service';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['./detalle-categoria.component.css']
})
export class DetalleCategoriaComponent implements OnInit {
  public titulo: string;
  public artista: Artista;

  public categoria: Categoria;

	public identificado;
	public token;
  public url;
  public albums : any[];
  public artistas : any[];
  public musicas : any[]=[];

  //enviar
public id_Url;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private  _albumService:AlbumService,
    private  _musicaService:MusicaService,
    private data: DataService,
    private  _categoriaService:CategoriaService,

	){
		this.titulo = 'Genero';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.categoria = new Categoria('','');
    this.getCategoria();
    //establesco el id_url para todos los componentes que usen ese servicio,
    //servira para pasar id url entre componentes
    this.data.currentIdUrl.subscribe(idUrl => this.id_Url = idUrl);
    this._route.params.subscribe(params=>{
      this.data.changeIdUrl(params['id']);
    });

  }

  ngOnInit() {
  }
  getCategoria(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._categoriaService.getCategoria(this.token,id)
        .subscribe(response=>{
         
          if (!response.categoria){
            this._router.navigate(['/']);
          }else{
            this.categoria= response.categoria;
            //sacar albumnes y canciones, y artistas
                        this._albumService.getAlbumCategoria(this.token,response.categoria._id)
                    .subscribe(response=>{
                      if (!response.albumes){
                        this._router.navigate(['/']);
                      }else{
                       this.albums = response.albumes;
                       console.log('esto tiene albums', this.albums);
                       //sacar canciones
                       var array = new Array();

                                  for (let i =0 ; i <= this.albums.length-1;i++){
                                    console.log('vuelta');
                                      this._musicaService.getMusicaAlbum(this.token, this.albums[i]._id)
                                            .subscribe(response=>{
                                              if (!response.musicas){
                                                this._router.navigate(['/']);
                                              }else{
                                                if (response.musicas!=''){
                                                  
                                              for (let i =0 ; i <= response.musicas.length-1;i++){
                                                array.push(response.musicas[i]);
                                              }
                                                }
                                                
                                            
                                              }

                                            },
                                          error=>{
                                            let errorMessage= <any>error;
                                            if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
                                            this.toastService.Info(body.message,'Error!!');
                                            this._router.navigate(['/']);
                                          }
                                        );
                                  }//fin del for

                                  this.musicas= array;
                                  console.log('mirad', this.musicas);
                      }

                    },
                  error=>{
                    let errorMessage= <any>error;
                    if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
                    this.toastService.Info(body.message,'Error!');
                    this._router.navigate(['/']);
                  }
                );
   
            
          }

        },
      error=>{
        let errorMessage= <any>error;
        if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
        this.toastService.Info(body.message,'Error!');
        this._router.navigate(['/']);
      }
    );
    });
  }


  getAlbumesXCategoria(){

  }

}
