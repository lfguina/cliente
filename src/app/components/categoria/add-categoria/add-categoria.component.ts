import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Categoria } from '../../../models/categoria';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { CategoriaService } from '../../../services/categoria.service';
import { ToasterService } from '../../../services/toaster.service';


@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  //styleUrls: ['../listar-categoria/listar-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

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
    private _categoriaService: CategoriaService,
    private  toastService:ToasterService,
	){
		this.titulo = 'Crear nuevo Genero Musical';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.categoria = new Categoria('','');
    this.navActual = 'Agregar'

  }
  
  ngOnInit()
	{
		console.log('categoria-add.component.ts cargado', this.categoria);
		

		//conseguir el listado de artistas

	}

	onSubmit(){
    console.log(this.categoria);
    this._categoriaService.addCategoria(this.token, this.categoria)
      .subscribe(
        response=>{
          
          if(!response.categoria){
            alert('Error en la peticion');
          }else{
            this.categoria= response.categoria;
            this.toastService.Success('Guardado correctamente','Correcto');
            this._router.navigate(['generos']);
            
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


  
}
