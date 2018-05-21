import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { UploadService } from '../../../services/upload.service';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ToasterService } from '../../../services/toaster.service';
import { Musica } from '../../../models/musica';
import { Album } from '../../../models/album';
import { MusicaService } from '../../../services/musica.service';

@Component({
  selector: 'app-edit-musica',
  templateUrl: '../add-musica/add-musica.component.html',
 
})
export class EditMusicaComponent implements OnInit {
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
    private _musicaService:MusicaService

	){
		this.tituloComponente = 'Editar Musica';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.musica = new Musica(1,'','','','');

  }
  ngOnInit() {
    console.log('add musica cargado');
    //sacar cancion a ediar
    this.getMusica();
   
  }

  
  getMusica(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._musicaService.getMusica(this.token,id)
        .subscribe(response=>{
         
          if (!response.musica){
            this._router.navigate(['/']);
          }else{
            this.musica= response.musica;
          }
  
        },
      error=>{
        let errorMessage= <any>error;
        if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
        this.toastService.Error(body.message,'Error!!!!');
        this._router.navigate(['/']);
      }
    );
  
  
  
    });
  }

  

  onSubmit(){
    let id;
    this._route.params.subscribe(params=>{
      id=params['id']
    });
    console.log(this.musica);
    //peticion   
    this._musicaService.updateMusica(this.token,id, this.musica)
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
              this._uploadService.makeFileRequest(this.url+'upload/musica/'+id,[],this.filesToUpload,this.token,'file' )
            .then(
              (result)=>{
                this._router.navigate(['/album',response.musica.album]);
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
          this.toastService.Error(body.message,'Error');
        }
      );
      

  }

  public filesToUpload: Array<File>;

  

  fileChangeEvent(fileIpunt: any)
	{
		this.filesToUpload = <Array<File>> fileIpunt.target.files;
  }








}
