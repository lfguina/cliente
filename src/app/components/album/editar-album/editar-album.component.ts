import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import { Album } from '../../../models/album';
import { UploadService } from '../../../services/upload.service';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ToasterService } from '../../../services/toaster.service';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-editar-artista',
  templateUrl: '../add-album/add-album.component.html',
 
})
export class EditarAlbumComponent implements OnInit {
  public tituloComponente: string;
  public artista: Artista;
  public album: Album;
	public identificado;
	public token;
  public url;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private  toastService:ToasterService,
    private _albumService:AlbumService,
    private _uploadService: UploadService

	){
		this.tituloComponente = 'Editar Album';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.album = new Album('','',2018,'','');

  }
  ngOnInit() {
    console.log('add album cargado');
    //llamar a la api para sacar un album en base a su id
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
        }

      },
    error=>{
      let errorMessage= <any>error;
      if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
      this.toastService.Error(body.message,'Error');
    }
  );



  });
}
  onSubmit(){
    let album_id;
    this._route.params.subscribe(params=>{
      album_id=params['id']
    });
    
    //peticion
    this._albumService.editAlbum(this.token, album_id,this.album)
      .subscribe(
        response=>{
        
          if (!response.album){
            this.toastService.Error('Ocurrio un error','Error');
           
          }
          else{
            this.album= response.album;
            this.toastService.Success('Actualizado correctamente','Correcto');
            if (!this.filesToUpload){
              //no puso imagen, redirigir
             this._router.navigate(['artista',response.album.artista]);
            }else{
               //aki subir imagen
               this._uploadService.makeFileRequest(this.url+'upload/album/'+album_id,[],this.filesToUpload,this.token,'imagen' )
               .then(
                 (result)=>{
                   this.album.imagen= result['album'].imagen;
                     this._router.navigate(['artista',response.album.artista]);
                 },
                 (error)=>{
                   alert('error');
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
