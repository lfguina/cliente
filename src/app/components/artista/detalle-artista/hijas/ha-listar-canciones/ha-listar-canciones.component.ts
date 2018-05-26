import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../../../services/global';
import { UsuarioService } from '../../../../../services/usuario.service';
import { Artista } from '../../../../../models/artista';
import { Album } from '../../../../../models/album';
import { Musica } from '../../../../../models/musica';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../../../services/artista.service';
import { ToasterService } from '../../../../../services/toaster.service';
import { AlbumService } from '../../../../../services/album.service';
import { DataService } from '../../../../../services/daata.service';
import { MusicaService } from '../../../../../services/musica.service';




@Component({
  selector: 'app-ha-listar-canciones',
  templateUrl: './ha-listar-canciones.component.html',
  styleUrls: ['./ha-listar-canciones.component.css']
})
export class HaListarCancionesComponent implements OnInit {
  public titulo: string;
	public artista: Artista
	public identificado;
	public token;
  public url;
  public albums : any[];
  public musicas : Musica[];

  public id_Url;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private data: DataService,
    private  _albumService:AlbumService,
    private _musicaService: MusicaService
	){
		this.titulo = 'Artista';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.artista = new Artista('','','');

    this.data.currentIdUrl.subscribe(idUrl => this.id_Url = idUrl);
    

  }
  ngOnInit() {
    console.log('editar artista cargado');
    //llamar a la api para sacar un artista en base a su id
    this.getArtista();
  }
  getArtista(){
    let id = this.id_Url;
      
            //sacar albumnes
            this._albumService.getAlbums(this.token, id)
              .subscribe(
                response=>{
                  if (!response.albums){
                    this.toastService.Info('Este artista no tiene album','Sin Album!');
                  }else{
                    this.albums=response.albums;
                    

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
             console.log(this.musicas);
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
 console.log('esto tengo de musicas', this.musicas);

         
                  }


                },
                error=>{
                  let errorMessage= <any>error;
                  if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
                  this.toastService.Error(body.message,'Error!');
                });
          }

        


  

  public confirmado;

	eliminarRegistroConfirmar(id){
		this.confirmado=id;
	}

	eliminarSeguro(id){
    this._albumService.deleteAlbum(this.token, id)
			.subscribe(
				response=>{
         
					if (!response.album){
						
						alert('error');
					}
				this.getArtista();

				},
			error=>{
				let errorMessage= <any>error;
				if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
				this.toastService.Error(body.message,'Error');
			}
			);

  }
  
  
	cancelarEliminar(){
		this.confirmado=null;
	}




}
