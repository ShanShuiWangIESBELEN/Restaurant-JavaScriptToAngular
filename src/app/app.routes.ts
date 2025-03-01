import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarRestaurantesComponent } from './components/restaurante/listar-restaurantes/listar-restaurantes.component';
import { CrearRestauranteComponent } from './components/restaurante/crear-restaurante/crear-restaurante.component';
import { EditarRestauranteComponent } from './components/restaurante/editar-restaurante/editar-restaurante.component';
import { ListarPlatosComponent } from './components/plato/listar-platos/listar-platos.component';
import { CrearPlatoComponent } from './components/plato/crear-plato/crear-plato.component';
import { EditarPlatoComponent } from './components/plato/editar-plato/editar-plato.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listarestaurantes', component: ListarRestaurantesComponent },
    { path: 'crearestaurante', component: CrearRestauranteComponent },
    { path: 'editarestaurante/:id', component: EditarRestauranteComponent },
    { path: 'listarplatos', component: ListarPlatosComponent },
    { path: 'crearplato', component: CrearPlatoComponent },
    { path: 'editarplato/:id', component: EditarPlatoComponent }
];