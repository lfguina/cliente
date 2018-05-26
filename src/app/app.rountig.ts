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
import { ListarCategoriaComponent } from './components/categoria/listar-categoria/listar-categoria.component';
import { AddCategoriaComponent } from './components/categoria/add-categoria/add-categoria.component';
import { DetalleCategoriaComponent } from './components/categoria/detalle-categoria/detalle-categoria.component';
import { EditarCategoriaComponent } from './components/categoria/editar-categoria/editar-categoria.component';
import { HcListarAlbumesComponent } from './components/categoria/detalle-categoria/hijas/hc-listar-albumes/hc-listar-albumes.component';
import { HcListarCancionesComponent } from './components/categoria/detalle-categoria/hijas/hc-listar-canciones/hc-listar-canciones.component';
import { HcListarArtistasComponent } from './components/categoria/detalle-categoria/hijas/hc-listar-artistas/hc-listar-artistas.component';
import { HaListarAlbumesComponent } from './components/artista/detalle-artista/hijas/ha-listar-albumes/ha-listar-albumes.component';
import { HaListarCancionesComponent } from './components/artista/detalle-artista/hijas/ha-listar-canciones/ha-listar-canciones.component';
import { HaListarCancionesFavoritasComponent } from './components/artista/detalle-artista/hijas/ha-listar-canciones-favoritas/ha-listar-canciones-favoritas.component';



const appRoutes: Routes = [
	//{path:'', redirectTo:'artistas/1',pathMatch:'full'},
	{path: 'home', component: HomeComponent },
	{path:'artistas/:desde',component:ListarArtistaComponent},
	{path:'crear-artista',component:AddArtistaComponent},
	{path:'editar-artista/:id',component:EditarArtistaComponent},
	{
		path:'artista/:id',component:DetalleArtistaComponent,
		children: [
			{path: 'albumes', component: HaListarAlbumesComponent},
			{path: 'canciones', component: HaListarCancionesComponent},
			{path: 'canciones-favoritas', component: HaListarCancionesFavoritasComponent},
			{path: '**',  pathMatch:'full', redirectTo: 'albumes' }
		]
	},
	{path:'crear-album/:artista_id',component:AddAlbumComponent},
	{path:'editar-album/:id/:artista_id',component:EditarAlbumComponent},
	{path:'album/:id',component:DetalleAlbumComponent},
	{path:'crear-musica/:album_id',component:AddMusicaComponent},
	{path:'editar-musica/:id',component:EditMusicaComponent},
	{path:'generos',component:ListarCategoriaComponent},
	{path:'crear-genero',component:AddCategoriaComponent},
	{
		path:'genero/:id',component:DetalleCategoriaComponent,
		children: [
			{path: 'albumes', component: HcListarAlbumesComponent},
			{path: 'canciones', component: HcListarCancionesComponent},
			{path: 'artistas', component: HcListarArtistasComponent},
			{path: '**',  pathMatch:'full', redirectTo: 'albumes' }
		]
	},
	{path:'editar-categoria/:id',component:EditarCategoriaComponent},

	{path: 'mis-datos', component: UsuarioEditComponent },
	{path: '**', component: HomeComponent }
	
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);