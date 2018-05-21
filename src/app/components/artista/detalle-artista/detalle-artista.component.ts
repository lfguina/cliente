import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Artista } from '../../../models/artista';
import { Album } from '../../../models/album';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../services/artista.service';
import { ToasterService } from '../../../services/toaster.service';
import { AlbumService } from '../../../services/album.service';


@Component({
  selector: 'app-editar-artista',
  templateUrl: './detalle-artista.component.html',
  
})
export class DetalleArtistaComponent implements OnInit {
  public titulo: string;
	public artista: Artista
	public identificado;
	public token;
  public url;
  public albums : Album[];
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private  _albumService:AlbumService,
	){
		this.titulo = 'Artista';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.artista = new Artista('','','');

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
            //sacar albumnes
            this._albumService.getAlbums(this.token, response.artista._id)
              .subscribe(
                response=>{
                  if (!response.albums){
                    this.toastService.Info('Este artista no tiene album','Sin Album!');
                  }else{
                    this.albums=response.albums;
                  }


                },
                error=>{
                  let errorMessage= <any>error;
                  if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
                  this.toastService.Error(body.message,'Error!');
                }

              );
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

  public confirmado;

	eliminarRegistroConfirmar(id){
		this.confirmado=id;
	}

	eliminarSeguro(id){
    this._albumService.deleteAlbum(this.token, id)
			.subscribe(
				response=>{
         
					if (!response.album){
						
						alert('error');
					}
				this.getArtista();

				},
			error=>{
				let errorMessage= <any>error;
				if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
				this.toastService.Error(body.message,'Error');
			}
			);

  }
  
  eliminarSeguroArtista(id){
    if(confirm("Esta seguro de eliminar artista")){
      this._artistService.deleteArtista(this.token, id)
			.subscribe(
				response=>{
         
					if (!response.artista){
						
						alert('error');
					}
          this._router.navigate(['/artistas/1']);

				},
			error=>{
				let errorMessage= <any>error;
				if (errorMessage!=null) var body = JSON.parse(errorMessage._body);
				this.toastService.Error(body.message,'Error');
			}
			);

    }
    

	}
	cancelarEliminar(){
		this.confirmado=null;
	}




}
