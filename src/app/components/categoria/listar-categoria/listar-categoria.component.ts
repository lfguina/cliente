import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Categoria } from '../../../models/categoria';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { CategoriaService } from '../../../services/categoria.service';
import { ToasterService } from '../../../services/toaster.service';
@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  public titulo: string;
	public categorias: Categoria;
	public identificado;
	public token;
  public url;
  public estilosCategorias: String[];


  constructor(
    private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _categoriaService: CategoriaService,
    private  toastService:ToasterService,
  ) { 
    this.titulo = 'Generos Musicales';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.categorias = new Categoria('','');
    this.getCategorias();
    this.estilosCategorias= ['bg-primary','bg-secondary','bg-success','bg-danger','bg-warning',
    'bg-info','bg-dark','bg-primary','bg-secondary','bg-success','bg-danger','bg-warning',
    'bg-info','bg-dark','bg-primary','bg-secondary','bg-success','bg-danger','bg-warning',
    'bg-info','bg-dark'];
  }

  ngOnInit() {
  }

  getCategorias(){
		


			this._categoriaService.getTodosLasCategorias(this.token)
				.subscribe(
					response=>{
         
						if (!response.categorias){
							this._router.navigate(['/']);
							alert('error');
						}else{
						
						
						this.categorias=  response.categorias;
						console.log('boorar', this.categorias);
							
					
						}
	
					},
				error=>{
					let errorMessage= <any>error;
					if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
					this.toastService.Error(body.message,'Error');
				}
				);


  }
  
  redireccionar(id){
    this._router.navigate(['genero', id]);
  }

}
