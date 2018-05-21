import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";

import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import {Artista} from '../../../models/artista';
import { ArtistaService } from '../../../services/artista.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-listar-artista',
  templateUrl: './listar-artista.component.html',
  styleUrls: ['./listar-artista.component.css']
})
export class ListarArtistaComponent implements OnInit {
	public titulo: string;
	public artistas: any;
	public identificado;
	public token;
	public url;
	public nextPage;
	public prevPage;
  
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
		private _artistaSerive: ArtistaService,
		private  toastService:ToasterService,
	){
		this.titulo = 'Artistas';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artistas = [];
		this.prevPage=1;
		this.nextPage=1;
		this.getArtistas();
		console.log('yo tengo ah estos artistas x page', this.artistas);
		

	}

  ngOnInit()
	{
		console.log('artist-list.component.ts cargado', this.identificado);

		//conseguir el listado de artistas
		
		

		
	}

	getArtistas(){
		


		this._route.params.forEach((params:Params)=>{
			let desde = +params['desde'];
			if (!desde) desde=1;
			else {
				this.nextPage= desde+1;
				this.prevPage = desde-1;
				if (this.prevPage==0)this.prevPage=1;
			}

			this._artistaSerive.getArtistas(this.token, desde)
				.subscribe(
					response=>{
         
						if (!response.artistas){
							this._router.navigate(['/']);
							alert('error');
						}else{
						
						
						this.artistas=  response.artistas
						console.log('boorar', this.artistas);
							
					
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
	public confirmado;

	eliminarRegistroConfirmar(id){
		this.confirmado=id;
	}

	eliminarSeguro(id){
		this._artistaSerive.deleteArtista(this.token, id)
			.subscribe(
				response=>{
         
					if (!response.artista){
						
						alert('error');
					}
					this.getArtistas();

				},
			error=>{
				let errorMessage= <any>error;
				if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
				this.toastService.Error(body.message,'Error');
			}
			);

	}
	cancelarEliminar(){
		this.confirmado=null;
	}

}
