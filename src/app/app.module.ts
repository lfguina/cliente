import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
//servicios
import { UsuarioService } from './services/usuario.service';
import { ToasterService } from './services/toaster.service';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { routing,appRoutingProviders } from './app.rountig';
import { ListarArtistaComponent } from './components/artista/listar-artista/listar-artista.component';
import { HomeComponent } from './components/home/home.component';
import { AddArtistaComponent } from './components/artista/add-artista/add-artista.component';
import { ArtistaService } from './services/artista.service';
import { EditarArtistaComponent } from './components/artista/editar-artista/editar-artista.component';
import { UploadService } from './services/upload.service';
import { DataTablesModule } from 'angular-datatables';
import { DetalleArtistaComponent } from './components/artista/detalle-artista/detalle-artista.component';
import { AddAlbumComponent } from './components/album/add-album/add-album.component';
import { AlbumService } from './services/album.service';
import { EditarAlbumComponent } from './components/album/editar-album/editar-album.component';
import { DetalleAlbumComponent } from './components/album/detalle-album/detalle-album.component';
import { AddMusicaComponent } from './components/musica/add-musica/add-musica.component';
import { MusicaService } from './services/musica.service';
import { EditMusicaComponent } from './components/musica/edit-musica/edit-musica.component';
import { PlayerComponent } from './components/player/player.component';


//router
@NgModule({
  declarations: [
    AppComponent,
    UsuarioEditComponent,
    ListarArtistaComponent,
    HomeComponent,
    AddArtistaComponent,
    EditarArtistaComponent,
    DetalleArtistaComponent,
    AddAlbumComponent,
    EditarAlbumComponent,
    DetalleAlbumComponent,
    AddMusicaComponent,
    EditMusicaComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing, 
    DataTablesModule
    

    
  ],
  providers: [UsuarioService, ToasterService, appRoutingProviders, ArtistaService, UploadService, AlbumService, MusicaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
