import { Component } from '@angular/core';
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-restaurante',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crear-restaurante.component.html',
  styleUrl: './crear-restaurante.component.css'
})
export class CrearRestauranteComponent {

  restaurantes: Restaurante[] = [];
  form: FormGroup;

  constructor(private restauranteService: RestauranteService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fundacion: ['', [Validators.required]]
    });

    this.restauranteService.getRestaurantes().subscribe(e => this.restaurantes = e);
  }

  submit() {
    if (this.form.valid) {
      const nuevoRestaurante: Restaurante = {
        id: (this.restaurantes.length > 0 ? (Number(this.restaurantes[this.restaurantes.length - 1].id) + 1).toString() : '1'),
        nombre: this.form.value.nombre,
        direccion: this.form.value.direccion,
        fundacion: this.form.value.fundacion,
        latitud: 0,
        longitud: 0
      }

      this.restauranteService.addRestaurante(nuevoRestaurante).subscribe(() => this.form.reset());
    }
  }
}