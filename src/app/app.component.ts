import { Component, OnInit } from '@angular/core';

import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';
import { ToasterService } from './services/toaster.service';
import { GLOBAL } from './services/global';
import {Router, ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  titulo='AppMusic';
  public usuario: Usuario;
  public usuario_registro : Usuario;
  public identificado;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;

  constructor(private usuarioServicio:UsuarioService, private  toastService:ToasterService,	private _route: ActivatedRoute,
		private _router : Router,) {
    this.usuario = new Usuario('','','','','','ROLE_USER','');
    this.usuario_registro = new Usuario('','','','','','ROLE_USER','');
    this.url= GLOBAL.url;
    
  }

  ngOnInit(){
    this.identificado= this.usuarioServicio.getIdentificado();
    this.token= this.usuarioServicio.getToken();
    console.log(this.identificado);
    
    
  }

  public onSubmit(){
    this.usuarioServicio.signup(this.usuario)
    .subscribe(response=>{
      this.identificado=response.usuario;
      if (!this.identificado._id)
      this.toastService.Error('Usuario no logeado','Error');
      else{
        //entro se logio bien, falta comprbar token
        localStorage.setItem('identificado',JSON.stringify(this.identificado));

        let token= response.token;
        this.token= token;
        if (this.token.length<=0)
        console.log('token no generado');
        else{
          //crear en localstorage con token
          localStorage.setItem('token',token);
          this.usuario= this.usuario = new Usuario('','','','','','ROLE_USER','');
         
        }

      }
    },
    error=>{
      let errorMessage= <any>error;
      if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
      
      console.log(body.message);
      this.toastService.Error(body.message,'Error');
     
    });
  }//fin

  public onSubmitRegister(){
    this.usuarioServicio.register(this.usuario_registro).subscribe(
      response=>{
        let usuario = response.usuario;
        if (!usuario._id){
          console.log('Error la registrarse');
        }else{
          this.toastService.Success('Usuario Registrado!!','Correcto');
          this.usuario_registro=new Usuario('','','','','','ROLE_USER','');
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

  logout(){
    localStorage.removeItem('identificado');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identificado=null;
    this.token=null;
    this._router.navigate(['/']);
  }
}
