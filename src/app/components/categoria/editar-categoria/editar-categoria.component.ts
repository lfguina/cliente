import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Categoria } from '../../../models/categoria';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { CategoriaService } from '../../../services/categoria.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: '../add-categoria/add-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  public titulo: string;
	public categoria: Categoria;
	public identificado;
	public token;
  public url;
  public navActual;

  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private  toastService:ToasterService,
        private _categoriaService: CategoriaService,

	){
		this.titulo = 'Editar Genero Musical';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.categoria = new Categoria('','');
    this.navActual = 'Editar';
    this.getCategoria();

  }

  ngOnInit() {
  }

  getCategoria(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._categoriaService.getCategoria(this.token,id)
        .subscribe(response=>{
         
          if (!response.categoria){
            this._router.navigate(['/']);
          }else{
            this.categoria= response.categoria;
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
          this._categoriaService.editCategoria(this.token, id, this.categoria)
          .subscribe(
            response=>{
              
              if(!response.categoria){
                alert('Error en la peticion');
              }else{   
                this.toastService.Success('Actualizado correctamente','Correcto');
                this.categoria= response.Categoria;        
                this._router.navigate(['/genero', response.categoria._id]);
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


}
