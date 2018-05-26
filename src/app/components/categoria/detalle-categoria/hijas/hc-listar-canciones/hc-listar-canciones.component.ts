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
  selector: 'app-hc-listar-canciones',
  templateUrl: './hc-listar-canciones.component.html',
  styleUrls: ['./hc-listar-canciones.component.css']
})
export class HcListarCancionesComponent implements OnInit {

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


startPlayer(musica){
  console.log('MUSICA ENVIADA', musica);
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


meGusta(musica){
  console.log(musica, 'tambiene', this.identificado);
}

}
