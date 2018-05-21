import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';


import { GLOBAL} from './global';
import {Musica} from '../models/musica';



@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  public url: string;
	
	constructor(public _http: Http){
		this.url = GLOBAL.url;
    }
    

    getMusica(token, id){
        let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
        });
        let options = new RequestOptions({headers});
        return this._http.get(this.url+'musica/'+id, options)
        .pipe(map(res => res.json()));

    }

    deleteMusica(token, id){
      let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization' : token
      });
      let options = new RequestOptions({headers});
      return this._http.delete(this.url+'musica/'+id, options)
      .pipe(map(res => res.json()));

  }

    getMusicas(token, album_id=null){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization' : token
          });
          let options = new RequestOptions({headers});
          if(album_id==null){
              return this._http.get(this.url+'musicas/', options)
          .pipe(map(res => res.json()));
  
          }else{
            //albums por artista,
            return this._http.get(this.url+'musicas/'+album_id, options)
            .pipe(map(res => res.json()));
          }

    }

	addMusica(token, musica: Musica){

		let params = JSON.stringify(musica);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
		});

		return this._http.post(this.url+'musica', params, {headers:  headers})
					.pipe(map(res => res.json()));
  }

  updateMusica(token,id, musica: Musica){

    let params = JSON.stringify(musica);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization' : token
    });

    return this._http.put(this.url+'musica/'+id, params, {headers:  headers})
                .pipe(map(res => res.json()));
}
  
  

  
}
