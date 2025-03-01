import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Plato } from '../../../models/plato';
import { Restaurante } from '../../../models/restaurante';
import { PlatoService } from '../../../services/plato.service';
import { RestauranteService } from '../../../services/restaurante.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-editar-plato',
imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './editar-plato.component.html',
  styleUrl: './editar-plato.component.css'
})
export class EditarPlatoComponent {
  platos: Plato[] = [];
  restaurantes: Restaurante[] = [];
  platoId: string = '';
  form: FormGroup;

  constructor(private restauranteService: RestauranteService, private fb: FormBuilder, private platoService: PlatoService, private route: ActivatedRoute) {

    const routeParams = this.route.snapshot.paramMap;
    this.platoId = routeParams.get('id')!;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      restaurante: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });

    this.restauranteService.getRestaurantes().subscribe(e => this.restaurantes = e);
    this.platoService.getPlatos().subscribe(p => this.platos = p);

    this.platoService.getPlato(this.platoId!).subscribe(platoEditar => {
      this.form.patchValue({
        nombre: platoEditar.nombre,
        tipo: platoEditar.tipo,
        restaurante: platoEditar.restauranteId,
        fecha: platoEditar.fechaCreacion
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const nuevoPlato: Plato = {
        id: this.platoId,
        nombre: this.form.value.nombre,
        tipo: this.form.value.tipo,
        restauranteId: this.form.value.restaurante,
        fechaCreacion: this.form.value.fecha
      }

      this.platoService.updatePlato(nuevoPlato).subscribe(() => this.form.reset());
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
