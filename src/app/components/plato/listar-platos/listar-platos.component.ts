import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Plato } from '../../../models/plato';
import { Restaurante } from '../../../models/restaurante';
import { PlatoService } from '../../../services/plato.service';
import { RestauranteService } from '../../../services/restaurante.service';

@Component({
  selector: 'app-listar-platos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-platos.component.html',
  styleUrl: './listar-platos.component.css'
})
export class ListarPlatosComponent {

  platos: Plato[] = [];
  restaurantes: Restaurante[] = [];

  constructor(private platoService: PlatoService, private restauranteService: RestauranteService) {
    this.platoService.getPlatos().subscribe(p => {
      console.log(p);
      this.platos = p;
    });
    this.restauranteService.getRestaurantes().subscribe(r => {
      console.log(r);
      this.restaurantes = r;
    });
  }
  trackById(index: number, item: any): string {
    return item.id;
  }


  eliminarPlato(id: string) {
    this.platoService.deletePlato(id).subscribe(() => this.platoService.getPlatos().subscribe(p => this.platos = p));
  }
}
