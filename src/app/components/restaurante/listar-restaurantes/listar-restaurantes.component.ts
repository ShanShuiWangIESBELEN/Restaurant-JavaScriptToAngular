import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';
import { PlatoService } from '../../../services/plato.service';
import { Plato } from '../../../models/plato';

@Component({
  selector: 'app-listar-restaurantes',
  standalone: true, 
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-restaurantes.component.html',
  styleUrl: './listar-restaurantes.component.css'
})
export class ListarRestaurantesComponent {

  restaurantes: Restaurante[] = [];
  platos: Plato[] = [];

  constructor(private restauranteService: RestauranteService, private platoService: PlatoService) {
    this.restauranteService.getRestaurantes().subscribe(e => {
      console.log(e);
      this.restaurantes = e;
    });
    this.platoService.getPlatos().subscribe(p => {
      console.log(p);
      this.platos = p;
    });
  }

  trackById(index: number, item: Restaurante) {
    return item.id;
  }

  eliminarRestaurante(id: string) {
    if (this.platos.find(p => p.restauranteId === id)) {
      alert("No se puede eliminar porque tiene un plato asociado");
    } else {
      this.restauranteService.deleteRestaurante(id).subscribe(() => this.restauranteService.getRestaurantes().subscribe(e => this.restaurantes = e));
    }
  }
}