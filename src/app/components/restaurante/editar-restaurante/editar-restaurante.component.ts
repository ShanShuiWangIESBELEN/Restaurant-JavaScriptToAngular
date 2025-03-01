import { Component } from '@angular/core';
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-restaurante',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar-restaurante.component.html',
  styleUrl: './editar-restaurante.component.css'
})
export class EditarRestauranteComponent {

  restaurantes: Restaurante[] = [];
  restauranteId: string = '';
  form: FormGroup;

  constructor(private restauranteService: RestauranteService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.restauranteService.getRestaurantes().subscribe(e => this.restaurantes = e);

    const routeParams = this.route.snapshot.paramMap;
    this.restauranteId = routeParams.get('id')!;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fundacion: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]]
    });

    this.restauranteService.getRestaurante(this.restauranteId!).subscribe(restauranteEditar => {
      this.form.patchValue({
        nombre: restauranteEditar.nombre,
        direccion: restauranteEditar.direccion,
        fundacion: restauranteEditar.fundacion,
        latitud: restauranteEditar.latitud,
        longitud: restauranteEditar.longitud
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const nuevoRestaurante: Restaurante = {
        id: this.restauranteId,
        nombre: this.form.value.nombre,
        direccion: this.form.value.direccion,
        fundacion: this.form.value.fundacion,
        latitud: this.form.value.latitud,
        longitud: this.form.value.longitud
      }

      this.restauranteService.updateRestaurante(nuevoRestaurante).subscribe(() => this.form.reset());
    }
  }
}
