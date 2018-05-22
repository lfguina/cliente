import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import { Album } from '../../../models/album';
import { UploadService } from '../../../services/upload.service';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ToasterService } from '../../../services/toaster.service';
import { AlbumService } from '../../../services/album.service';
import { ArtistaService } from '../../../services/artista.service';
import { NgForm } from '@angular/forms';


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
  public artistas: Artista [];
  public  artistas_inicial_clave:any[]=[];
  public artistasRespaldo: any[];
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private  toastService:ToasterService,
    private _albumService:AlbumService,
    private _uploadService: UploadService,
    private _artistService: ArtistaService

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

    this.obtenerArtistas();
    
    
   
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
           
            for (var i = 0; i < response.album.artista.length; i++) {
              this.artistas_inicial_clave.push(response.album.artista[i]._id);
            }//fin del for
            console.log(this.artistas_inicial_clave);
            //this.artistasRespaldo= this.album.artista;
          //this.album.artista= '';
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
    let artista_actual;
    this._route.params.subscribe(params=>{
      artista_actual=params['artista_id']
    });

    if (!this.album.artista) {
      this.album.artista= this.artistas_inicial_clave;
    }else{
      
    this.album.artista.push(artista_actual);

    }


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
             this._router.navigate(['artista',artista_actual]);
            }else{
               //aki subir imagen
               this._uploadService.makeFileRequest(this.url+'upload/album/'+album_id,[],this.filesToUpload,this.token,'imagen' )
               .then(
                 (result)=>{
                   this.album.imagen= result['album'].imagen;
                     this._router.navigate(['artista',artista_actual]);
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



  obtenerArtistas(){
    let artista_actual;
    this._route.params.subscribe(params=>{
      artista_actual=params['artista_id']
    });
    
    this._artistService.getTodosLosArtistas(this.token)
        .subscribe(response=>{  
          if (!response.artistas){
          }else{
            this.artistas= response.artistas;
            for (var i = 0; i < this.artistas.length; i++) {
              //comparo con el response, porque el modelo no tiene ._id, como esta ordenado ok..
              // for (var j = 0; j<this.artistas_inicial_clave.length; j++){
              //   if (response.artistas[i]._id == this.artistas_inicial_clave[j]){
              //     this.artistas.splice(i,1);

              //     break;
              //   }
              // }
              if (response.artistas[i]._id == artista_actual){
                this.artistas.splice(i,1);
                this.album.artista= '';
                break;
              }
             
             
            }//fin del for

          }
        },
      error=>{
        this.toastService.Info('Error en la peticion','Error!');
        this._router.navigate(['/']);
      }
    );

  }



}
