import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';


import { GLOBAL} from './global';

@Injectable()
export class UsuarioService {
    public url:string;
    public identificado:string;
    public token:string;

    public constructor(private http:Http ) {
        this.url= GLOBAL.url;

    }
	//login
    signup(usuarioToLogin){
        

        let json = JSON.stringify(usuarioToLogin);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});
        return this.http.post(this.url + 'login', params, { headers: headers })
        .pipe(map(res => res.json()))
	}
	
	register(usuarioToRegister){
		let json = JSON.stringify(usuarioToRegister);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});
        return this.http.post(this.url + 'usuario', params, { headers: headers })
        .pipe(map(res => res.json()))

	}

	updateUsuario(usuarioToUpdate){
		let json = JSON.stringify(usuarioToUpdate);
        let params = json;
        let headers = new Headers(
			{'Content-Type':'application/json',
		    'Authorization':this.getToken()}
		);
        return this.http.put(this.url + 'usuario/'+usuarioToUpdate._id, params, { headers: headers })
        .pipe(map(res => res.json()))
	}



    getIdentificado()
	{		
		let identity = JSON.parse(localStorage.getItem('identificado'));
		if(identity!=null){
			this.identificado = identity;
		}else{
			this.identificado = null;
		}
		return this.identificado;
	}

	getToken()
	{
		let token = localStorage.getItem('token');

		if(token !=null)
		{
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}

}