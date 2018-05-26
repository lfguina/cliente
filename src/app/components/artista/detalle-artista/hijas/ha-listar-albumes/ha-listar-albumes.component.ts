import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../../../../services/global';
import { UsuarioService } from '../../../../../services/usuario.service';
import { Artista } from '../../../../../models/artista';
import { Album } from '../../../../../models/album';

import {Router, ActivatedRoute, Params} from "@angular/router";
import { ArtistaService } from '../../../../../services/artista.service';
import { ToasterService } from '../../../../../services/toaster.service';
import { AlbumService } from '../../../../../services/album.service';
import { DataService } from '../../../../../services/daata.service';


@Component({
  selector: 'app-editar-artista',
  templateUrl: './ha-listar-albumes.component.html',
  
})
export class HaListarAlbumesComponent implements OnInit {
  public titulo: string;
	public artista: Artista
	public identificado;
	public token;
  public url;
  public albums : Album[];
  public id_Url;
  constructor (
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UsuarioService,
    private _artistService: ArtistaService,
    private  toastService:ToasterService,
    private data: DataService,
    private  _albumService:AlbumService,
	){
		this.titulo = 'Artista';
		this.identificado = this._userService.getIdentificado();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
    this.artista = new Artista('','','');

    this.data.currentIdUrl.subscribe(idUrl => this.id_Url = idUrl);
    

  }
  ngOnInit() {
    console.log('editar artista cargado');
    //llamar a la api para sacar un artista en base a su id
    this.getArtista();
  }
  getArtista(){
    let id = this.id_Url;
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

    console.log('me apaso' , this.id_Url);

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
  
  
	cancelarEliminar(){
		this.confirmado=null;
	}




}
