import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../services/artista.service';
import { ToasterService } from '../../../services/toaster.service';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-editar-artista',
  templateUrl: '../add-artista/add-artista.component.html',
  styleUrls: ['./editar-artista.component.css']
})
export class EditarArtistaComponent implements OnInit {
  public titulo: string;
	public artista: Artista
	public identificado;
	public token;
  public url;
  public is_edit;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private _uploadService: UploadService
	){
		this.titulo = 'Editar Artista';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.artista = new Artista('','','');
    this.is_edit=true;

  }
  ngOnInit() {
    console.log('editar artista cargado');
    //llamar a la api para sacar un artista en base a su id
    this.getArtista();
  }
  getArtista(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._artistService.getArtista(this.token,id)
        .subscribe(response=>{
         
          if (!response.artista){
            this._router.navigate(['/']);
          }else{
            this.artista= response.artista;
          }

        },
      error=>{
        let errorMessage= <any>error;
        if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
        this.toastService.Info(body.message,'Error!');
        this._router.navigate(['/']);
      }
    );



    });
  }


  onSubmit(){
    
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
          this._artistService.editArtista(this.token, id, this.artista)
          .subscribe(
            response=>{
              
              if(!response.artista){
                alert('Error en la peticion');
              }else{
                //this.artista= response.artista;
                //this._router.navigate(['editar-artista'], response.artista._id);
                this.toastService.Success('Actualizado correctamente','Correcto');
                this.artista= response.artista;
                //aki subir imagen
                if (!this.filesToUpload){
                  this._router.navigate(['artista',id]);
                }else{
                  this._uploadService.makeFileRequest(this.url+'upload/artista/'+id,[],this.filesToUpload,this.token,'imagen' )
                .then(
                  (result)=>{
                    this.artista.imagen= result['artista'].imagen;
                    console.log('estoy desde editar',this.artista);
                      this._router.navigate(['artista',id]);
                  },
                  (error)=>{
                   console.log('error al editar');
                  }
                );

                }
                
               
              }

            },
            error=>{
              let errorMessage= <any>error;
                if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
                
                console.log(body.message);
                this.toastService.Error(body.message,'Error!');
            }
          );


    })//fin foreach
    
  }//fin obsumit
  public filesToUpload: Array<File>;

  

  fileChangeEvent(fileIpunt: any)
	{
		this.filesToUpload = <Array<File>> fileIpunt.target.files;
  }



}
