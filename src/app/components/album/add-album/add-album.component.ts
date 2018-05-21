import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import { Album } from '../../../models/album';
import { UploadService } from '../../../services/upload.service';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../services/artista.service';
import { ToasterService } from '../../../services/toaster.service';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-editar-artista',
  templateUrl: './add-album.component.html',
 
})
export class AddAlbumComponent implements OnInit {
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
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private _albumService:AlbumService,
    private _uploadService: UploadService

	){
		this.tituloComponente = 'Agregar Album';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.album = new Album('','',2018,'','');

  }
  ngOnInit() {
    console.log('add album cargado');
    this.comprobar();
   
  }
  comprobar(){
    let artista_id;
    this._route.params.subscribe(params=>{
      artista_id=params['artista_id']
    });

      this._artistService.getArtista(this.token,artista_id)
        .subscribe(response=>{  
          if (!response.artista){
            
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
    let artista_id;
    this._route.params.subscribe(params=>{
      artista_id=params['artista_id']
      this.album.artista= artista_id;
    });
    //peticion
    this._albumService.addAlbum(this.token, this.album)
      .subscribe(
        response=>{
        
          if (!response.album){
            this.toastService.Error('Ocurrio un error','Error');
           
          }
          else{
            this.album= response.album;          

            this.toastService.Success('Guardado correctamente','Correcto');
            if (!this.filesToUpload){
              this._router.navigate(['artista',artista_id]);
            }
            else{
              this._uploadService.makeFileRequest(this.url+'upload/album/'+response.album._id,[],this.filesToUpload,this.token,'imagen' )
            .then(
              (result)=>{
                this._router.navigate(['artista',artista_id]);
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
