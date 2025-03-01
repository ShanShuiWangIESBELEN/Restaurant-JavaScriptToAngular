import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Plato } from '../../../models/plato';
import { Restaurante } from '../../../models/restaurante';
import { PlatoService } from '../../../services/plato.service';
import { RestauranteService } from '../../../services/restaurante.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-plato',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './crear-plato.component.html',
  styleUrl: './crear-plato.component.css'
})
export class CrearPlatoComponent {
  platos: Plato[] = [];
  restaurantes: Restaurante[] = [];
  form: FormGroup;

  constructor(private restauranteService: RestauranteService, private fb: FormBuilder, private platoService: PlatoService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      restaurante: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });

    this.restauranteService.getRestaurantes().subscribe(e => this.restaurantes = e);
    this.platoService.getPlatos().subscribe(p => this.platos = p);
  }

  submit() {
    if (this.form.valid) {
      const nuevoPlato: Plato = {
        id: (this.platos.length > 0 ? (Number(this.platos[this.platos.length - 1].id) + 1).toString() : '1'),
        nombre: this.form.value.nombre,
        tipo: this.form.value.tipo,
        restauranteId: this.form.value.restaurante,
        fechaCreacion: this.form.value.fecha
      }

      this.platoService.addPlato(nuevoPlato).subscribe(() => this.form.reset());
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
