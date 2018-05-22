import {ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { ListarArtistaComponent } from './components/artista/listar-artista/listar-artista.component';
import { HomeComponent } from './components/home/home.component';
import { AddArtistaComponent } from './components/artista/add-artista/add-artista.component';
import { EditarArtistaComponent } from './components/artista/editar-artista/editar-artista.component';
import { DetalleArtistaComponent } from './components/artista/detalle-artista/detalle-artista.component';
import { AddAlbumComponent } from './components/album/add-album/add-album.component';
import { EditarAlbumComponent } from './components/album/editar-album/editar-album.component';
import { DetalleAlbumComponent } from './components/album/detalle-album/detalle-album.component';
import { AddMusicaComponent } from './components/musica/add-musica/add-musica.component';
import { EditMusicaComponent } from './components/musica/edit-musica/edit-musica.component';



const appRoutes: Routes = [
	//{path:'', redirectTo:'artistas/1',pathMatch:'full'},
	{path: 'home', component: HomeComponent },
	{path:'artistas/:desde',component:ListarArtistaComponent},
	{path:'crear-artista',component:AddArtistaComponent},
	{path:'editar-artista/:id',component:EditarArtistaComponent},
	{path:'artista/:id',component:DetalleArtistaComponent},
	{path:'crear-album/:artista_id',component:AddAlbumComponent},
	{path:'editar-album/:id/:artista_id',component:EditarAlbumComponent},
	{path:'album/:id',component:DetalleAlbumComponent},
	{path:'crear-musica/:album_id',component:AddMusicaComponent},
	{path:'editar-musica/:id',component:EditMusicaComponent},
	{path: 'mis-datos', component: UsuarioEditComponent },
	{path: '**', component: HomeComponent }
	
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);