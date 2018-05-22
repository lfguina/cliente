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
declare var $:any;



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
  public artistas: Artista [];
  public artista_id;

  
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
    this.obtenerArtistas();
    
    
   
  }

  obtenerArtistas(){
    this._route.params.subscribe(params=>{
      this.artista_id=params['artista_id'];
      //eliminar el artista propio
      
    });
    this._artistService.getTodosLosArtistas(this.token)
        .subscribe(response=>{  
          if (!response.artistas){
       
          }else{
            this.artistas= response.artistas;
            for (var i = 0; i < this.artistas.length; i++) {
              //comparo con el response, porque el modelo no tiene ._id, como esta ordenado ok..
             if ( response.artistas[i]._id == this.artista_id){
              this.artistas.splice(i,1);
              break;
             }
            }//fin del for

          }
          //solo comprobar si no existe
        },
      error=>{
        this.toastService.Info('Error en la peticion','Error!');
        this._router.navigate(['/']);
      }
    );

  }
  comprobar(){
    this._route.params.subscribe(params=>{
      this.artista_id=params['artista_id'];
      //eliminar el artista propio
      
    });

      this._artistService.getArtista(this.token,this.artista_id)
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


  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
 }

  onSubmit(){
    let artista_id;
    this._route.params.subscribe(params=>{
      artista_id=params['artista_id']
    });
     let acu: any[] = [];
     if (!this.album.artista)
     acu.push(artista_id);
     else {
      acu = this.album.artista;
      acu.unshift(artista_id);
     
     }
     this.album.artista = acu;
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
