import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';


import { GLOBAL} from './global';
import {Categoria} from '../models/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url: string;
	
	constructor(public _http: Http){
		this.url = GLOBAL.url;
	}

	addCategoria(token, categoria: Categoria){

		let params = JSON.stringify(categoria);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
		});

		return this._http.post(this.url+'categoria', params, {headers:  headers})
					.pipe(map(res => res.json()));
  }
  

  getCategorias(token, desde){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
	});
	
    
    let options = new RequestOptions({headers});
    return this._http.get(this.url+'categorias/'+desde, options)
					.pipe(
						map(
							res => res.json()
							
						)
					);


  }

  getCategoria(token, id){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
    });
    
    let options = new RequestOptions({headers});
    return this._http.get(this.url+'categoria/'+id, options)
					.pipe(map(res => res.json()));


  }

  editCategoria(token,id, categoria: Categoria){

		let params = JSON.stringify(categoria);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
		});

		return this._http.put(this.url+'categoria/'+id, params, {headers:  headers})
					.pipe(map(res => res.json()));
  }

  deleteCategoria(token, id){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
    });
    
    let options = new RequestOptions({headers});
    return this._http.delete(this.url+'categoria/'+id, options)
					.pipe(map(res => res.json()));


  }



  getTodosLasCategorias(token){
    let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
	});
	
    
    let options = new RequestOptions({headers});
    return this._http.get(this.url+'all/categorias/', options)
					.pipe(
						map(
							res => res.json()
							
						)
					);


  }
}
