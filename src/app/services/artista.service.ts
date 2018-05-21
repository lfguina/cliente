import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';


import { GLOBAL} from './global';
import {Artista} from '../models/artista';


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  public url: string;
	
	constructor(public _http: Http){
		this.url = GLOBAL.url;
	}

	addArtist(token, artista: Artista){

		let params = JSON.stringify(artista);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
		});

		return this._http.post(this.url+'artista', params, {headers:  headers})
					.pipe(map(res => res.json()));
  }
  

  getArtistas(token, desde){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
	});
	
    
    let options = new RequestOptions({headers});
    return this._http.get(this.url+'artistas/'+desde, options)
					.pipe(
						map(
							res => res.json()
							
						)
					);


  }

  getArtista(token, id){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
    });
    
    let options = new RequestOptions({headers});
    return this._http.get(this.url+'artista/'+id, options)
					.pipe(map(res => res.json()));


  }

  editArtista(token,id, artista: Artista){

		let params = JSON.stringify(artista);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
		});

		return this._http.put(this.url+'artista/'+id, params, {headers:  headers})
					.pipe(map(res => res.json()));
  }

  deleteArtista(token, id){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
    });
    
    let options = new RequestOptions({headers});
    return this._http.delete(this.url+'artista/'+id, options)
					.pipe(map(res => res.json()));


  }
}
