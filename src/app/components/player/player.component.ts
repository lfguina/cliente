import { Component, OnInit } from '@angular/core';
import { Musica } from '../../models/musica';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public url;
  public musica;


  constructor(){
      this.url = GLOBAL.url;
      this.musica = new Musica(1,"","","","");
  }
  ngOnInit(){
    console.log('player cargado');

    var musica = JSON.parse(localStorage.getItem('sound_song'));
    if(musica){
        this.musica = musica;
    }else{
        this.musica = new Musica(1,"","","","");
    }
  }

}
