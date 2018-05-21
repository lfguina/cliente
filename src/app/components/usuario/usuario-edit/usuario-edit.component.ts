import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { ToasterService } from '../../../services/toaster.service';
import {GLOBAL} from '../../../services/global';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  public titulo:string;
  public usuario:Usuario;
  public identificado;
  public token:string;
  public filesToUpload: Array<File>;
  public url:string;


  constructor(private usuarioServicio:UsuarioService, private toastServicio:ToasterService) {
    this.titulo='Actualizar mis datos';
   // this.usuario = new Usuario('','','','','','ROLE_USER','');
    //localstorage, session
    this.identificado= this.usuarioServicio.getIdentificado();
    this.token= this.usuarioServicio.getToken()
    this.usuario= this.identificado;
    this.url= GLOBAL.url;
    console.log(this.usuario);
   }

  ngOnInit() {
    console.log('usuario-edit cargado', this.identificado);
  }

  onSubmit(){
    console.log(this.usuario);
    this.usuarioServicio.updateUsuario(this.usuario).subscribe(
      response=>{
        
        if (!response.usuario){
          this.toastServicio.Error('Ocurrio un error','Error');
         
        }
        else{
          this.usuario= response.usuario;
          localStorage.setItem('identificado',JSON.stringify(this.usuario));
          document.getElementById('identificado_nombre').innerHTML=this.usuario.nombre;
          if(!this.filesToUpload){
						//redireccion
					}
					else{
						this.makeFileRequest(this.url+'/upload/usuario/'+this.usuario._id,[],this.filesToUpload).then(
							 (result: any)=> {
                   this.usuario.imagen = result.imagen;
							 		localStorage.setItem('identificado', JSON.stringify(this.usuario));

							 		let image_path = this.url + 'imagen/usuario/'+this.usuario.imagen;
                   document.getElementById("image-logged").setAttribute('src',image_path); 
                   this.identificado=this.usuario;

							 		
								}
							);
					}
          this.toastServicio.Success('Usuario Modificado','Correcto');
        }
      },
      error=>{
        let errorMessage= <any>error;
        if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
      
        console.log(body.message);
        this.toastServicio.Error(body.message,'Error');
      }
    )
  }

  fileChangeEvent(fileIpunt: any)
	{
		this.filesToUpload = <Array<File>> fileIpunt.target.files;
		console.log(this.filesToUpload);
  }
  
  makeFileRequest(url: string, params: Array<string>, files : Array<File>)
	{
		var token = this.token;

		return new Promise(function (resolve, reject) {
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i=0; i < files.length; i++){
				formData.append('imagen',files[i], files[i].name);				
			}
			xhr.onreadystatechange = function (){
				if(xhr.readyState == 4){
					if(xhr.status  == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}					
				}
			}	
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);		
		} );
	}

  
  


}
