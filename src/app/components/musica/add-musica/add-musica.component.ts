import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { UploadService } from '../../../services/upload.service';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ToasterService } from '../../../services/toaster.service';
import { Musica } from '../../../models/musica';
import { Album } from '../../../models/album';
import { MusicaService } from '../../../services/musica.service';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-add-musica',
  templateUrl: './add-musica.component.html',
 
})
export class AddMusicaComponent implements OnInit {
  public tituloComponente: string;
  public musica: Musica;
	public identificado;
	public token;
  public url;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private  toastService:ToasterService,
    private _uploadService: UploadService,
    private _musicaService:MusicaService,
    private _albumService:AlbumService,


	){
		this.tituloComponente = 'Agregar Musica';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.musica = new Musica(1,'','','','');

  }
  ngOnInit() {
    console.log('add musica cargado');
    this.comprobar();
   
  }

  comprobar(){
    let album_id;
    this._route.params.subscribe(params=>{
      album_id=params['album_id']
    });

      this._albumService.getAlbum(this.token,album_id)
        .subscribe(response=>{  
          if (!response.album){
            
            this.toastService.Info('Error en la peticion','Error!');
            this._router.navigate(['/']);
          }
          //solo comprobar si no existe
        },
      error=>{
        this.toastService.Info('Error en la peticion','Error!');
        this._router.navigate(['/']);
      }
    );
  
  
  }

  

  onSubmit(){
    let album_id;
    this._route.params.subscribe(params=>{
      album_id=params['album_id']
      this.musica.album= album_id;
    });
    //peticion   
    this._musicaService.addMusica(this.token, this.musica)
      .subscribe(
        response=>{    
          if (!response.musica){
            this.toastService.Error('Ocurrio un error','Error');          
          }
          else{
            this.musica= response.musica;          
            this.toastService.Success('Guardado correctamente','Correcto');
            if (!this.filesToUpload){
              this._router.navigate(['/album',response.musica.album]);
            }
            else{
              this._uploadService.makeFileRequest(this.url+'upload/musica/'+response.musica._id,[],this.filesToUpload,this.token,'file' )
            .then(
              (result)=>{
                this._router.navigate(['/album',response.musica.album]);
               this.musica.file= result['musica'].file;
              },
              (error)=>{
                //no eleigio imagen pero igual redireccion
                console.log('erro no imagen');
                
              }
            );

            }          
          }
        },
        error=>{
          let errorMessage= <any>error;
          if (errorMessage!=null) var body = JSON.parse(errorMessage._body);      
          console.log(body.message);
          this.toastService.Error(body.message,'Error!!');
        }
      );


  }
  public filesToUpload: Array<File>;

  

  fileChangeEvent(fileIpunt: any)
	{
		this.filesToUpload = <Array<File>> fileIpunt.target.files;
  }








}
