import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../services/artista.service';
import { ToasterService } from '../../../services/toaster.service';
import { UploadService } from '../../../services/upload.service';


@Component({
  selector: 'app-add-artista',
  templateUrl: './add-artista.component.html',
  styleUrls: ['./add-artista.component.css']
})
export class AddArtistaComponent implements OnInit {
  public titulo: string;
	public artista: Artista
	public identificado;
	public token;
	public url;

  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private _uploadService: UploadService
	){
		this.titulo = 'Crear nuevo Artista';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artista = new Artista('','','');

  }
  
  ngOnInit()
	{
		console.log('artist-add.component.ts cargado', this.artista);
		

		//conseguir el listado de artistas

	}

	onSubmit(){
    console.log(this.artista);
    this._artistService.addArtist(this.token, this.artista)
      .subscribe(
        response=>{
          
          if(!response.artista){
            alert('Error en la peticion');
          }else{
            this.artista= response.artista;
            this.toastService.Success('Guardado correctamente','Correcto');
            console.log('ahora tengo esto', response.artista);
            this._uploadService.makeFileRequest(this.url+'upload/artista/'+response.artista._id,[],this.filesToUpload,this.token,'imagen' )
            .then(
              (result)=>{
                  this._router.navigate(['artistas',1]);
              },
              (error)=>{
                //no eleigio imagen pero igual redireccion
                this._router.navigate(['artistas',1]);
                
              }
            );

          }

        },
        error=>{
          let errorMessage= <any>error;
      if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
      
      console.log(body.message);
      this.toastService.Error(body.message,'Error');
        }
      );
    
    
  }//fin obsumit


  public filesToUpload: Array<File>;

  

  fileChangeEvent(fileIpunt: any)
	{
		this.filesToUpload = <Array<File>> fileIpunt.target.files;
  }
  
  // onSubmit(){
  //   console.log(this.artista);
  //   this._artistService.addArtist(this.token, this.artista)
  //     .subscribe(
  //       response=>{
          
  //         if(!response.artista){
  //           alert('Error en la peticion');
  //         }else{
  //           this.artista= response.artista;
  //           this.toastService.Success('Guardado correctamente','Correcto');
  //           this._router.navigate(['editar-artista',response.artista._id]);

  //         }

  //       },
  //       error=>{
  //         let errorMessage= <any>error;
  //     if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
      
  //     console.log(body.message);
  //     this.toastService.Error(body.message,'Error');
  //       }
  //     );
    
	// }

}
