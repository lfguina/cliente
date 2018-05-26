import { Component, OnInit, Input } from '@angular/core';
import {GLOBAL} from '../../../../../services/global';
import { UsuarioService } from '../../../../../services/usuario.service';
import { Artista } from '../../../../../models/artista';
import { Album } from '../../../../../models/album';
import { Categoria } from '../../../../../models/categoria';
import { Musica } from '../../../../../models/musica';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../../../services/artista.service';
import { ToasterService } from '../../../../../services/toaster.service';
import { AlbumService } from '../../../../../services/album.service';
import { CategoriaService } from '../../../../../services/categoria.service';
import { MusicaService } from '../../../../../services/musica.service';
import { DataService } from '../../../../../services/daata.service';

@Component({
  selector: 'app-hc-listar-albumes',
  templateUrl: './hc-listar-albumes.component.html',
  styleUrls: ['./hc-listar-albumes.component.css']
})
export class HcListarAlbumesComponent implements OnInit {

  public titulo: string;
  public artista: Artista;

  public categoria: Categoria;

	public identificado;
	public token;
  public url;
  public albums : any[];
  public artistas : any[];
  public musicas : any[]=[];
  //heredado
  public idUrl;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private  _albumService:AlbumService,
    private  _musicaService:MusicaService,

    private  _categoriaService:CategoriaService,
    private data: DataService,


	){
		this.titulo = 'Genero';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.categoria = new Categoria('','');
    //actualizo el idUrl que envia el padre
    this.data.currentIdUrl.subscribe(idUrl => this.idUrl = idUrl);
    this.getCategoria();

  }

  ngOnInit() {
    // Recogemos los parametros de la URL
    
}

getCategoria(){

    this._categoriaService.getCategoria(this.token,this.idUrl)
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
 
}

}
