import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';


import { GLOBAL} from './global';
import {Album} from '../models/album';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  public url: string;
	
	constructor(public _http: Http){
		this.url = GLOBAL.url;
    }
    

    getAlbum(token, id){
        let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
        });
        let options = new RequestOptions({headers});
        return this._http.get(this.url+'album/'+id, options)
        .pipe(map(res => res.json()));

    }

    getAlbums(token, artista_id=null){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization' : token
          });
          let options = new RequestOptions({headers});
          if(artista_id==null){
              //todos los albums de todos los artistas
              return this._http.get(this.url+'albumes/', options)
          .pipe(map(res => res.json()));
  
          }else{
            //albums por artista,
            return this._http.get(this.url+'albumes/'+artista_id, options)
            .pipe(map(res => res.json()));
          }

    }

	addAlbum(token, album: Album){

		let params = JSON.stringify(album);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : token
		});

		return this._http.post(this.url+'album', params, {headers:  headers})
					.pipe(map(res => res.json()));
  }
  editAlbum(token, id,album: Album){

    let params = JSON.stringify(album);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization' : token
    });

    return this._http.put(this.url+'album/'+id, params, {headers:  headers})
                .pipe(map(res => res.json()));
}


deleteAlbum(token, id){
  let headers = new Headers({
'Content-Type': 'application/json',
'Authorization' : token
  });
  let options = new RequestOptions({headers});
  return this._http.delete(this.url+'album/'+id, options)
  .pipe(map(res => res.json()));

}
  

  
}
