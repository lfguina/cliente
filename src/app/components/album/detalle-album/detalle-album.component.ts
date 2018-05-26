import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Album } from '../../../models/album';
import { Musica } from '../../../models/musica';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ToasterService } from '../../../services/toaster.service';
import { AlbumService } from '../../../services/album.service';
import { MusicaService } from '../../../services/musica.service';


@Component({
  selector: 'app-detalle-abum',
  templateUrl: './detalle-album.component.html',
  
})
export class DetalleAlbumComponent implements OnInit {
  public titulo: string;
	public album: Album
	public identificado;
	public token;
  public url;
  public albums : Album[];
  public musicas: Musica[];
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private  toastService:ToasterService,
    private  _albumService:AlbumService,
    private _musicaService:MusicaService
	){
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;

  }
  ngOnInit() {
    console.log('album-detalle cargado');
    //llamar a la api para sacar un artista en base a su id
    this.getAlbum();

  }
  getAlbum(){
    
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._albumService.getAlbum(this.token,id)
        .subscribe(response=>{
         
          if (!response.album){
            this._router.navigate(['/']);
          }else{
            this.album= response.album;
           // sacar canciones de albumnes
            this._musicaService.getMusicas(this.token, response.album._id)
              .subscribe(
                response=>{
                  if (!response.musicas){
                    this.toastService.Info('Album sin canciones','Sin Album!');
                  }else{
                    this.musicas=response.musicas;
                    console.log('esto tengo de musica', this.musicas);
                  }

                },
                error=>{
                  let errorMessage= <any>error;
                  if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
                  this.toastService.Error(body.message,'Error');
                }

              );
          }

        },
      error=>{
        let errorMessage= <any>error;
        if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
        this.toastService.Info(body.message,'Error!!');
        this._router.navigate(['/']);
      }
    );



    });

    
  }


  public confirmado;

	eliminarRegistroConfirmar(id){
		this.confirmado=id;
	}

	eliminarSeguro(id){
		this._musicaService.deleteMusica(this.token, id)
			.subscribe(
				response=>{
         
					if (!response.musica){
						
            this.toastService.Error('error en peticion','Error');
					}
				this.getAlbum();

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
  startPlayer(musica){
    let song_player = JSON.stringify(musica);
    let file_path = this.url + 'get/musica/' + musica.file;
    let image_path = this.url + 'imagen/album/' + musica.album.imagen;

    localStorage.setItem('sound_song',song_player);

    document.getElementById("mp3-source").setAttribute("src",file_path);

    (document.getElementById("player") as any ).load();
    (document.getElementById("player") as any ).play();

    document.getElementById('play-song-title').innerHTML = musica.nombre;
    document.getElementById('play-song-artist').innerHTML = musica.album.titulo;
    document.getElementById('play-image-album').setAttribute('src',image_path);
    

}
 




}
