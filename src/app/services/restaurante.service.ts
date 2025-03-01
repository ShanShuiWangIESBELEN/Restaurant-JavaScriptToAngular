import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private urlRestaurante = 'http://localhost:3001/restaurantes';

  constructor(private http: HttpClient) { }

  getRestaurantes() {
    return this.http.get<Restaurante[]>(this.urlRestaurante);
  }

  getRestaurante(id: string) {
    return this.http.get<Restaurante>(`${this.urlRestaurante}/${id}`);
  }

  addRestaurante(restaurante: Restaurante) {
    return this.http.post(this.urlRestaurante, restaurante);
  }

  updateRestaurante(restaurante: Restaurante) {
    return this.http.put(`${this.urlRestaurante}/${restaurante.id}`, restaurante);
  }

  deleteRestaurante(id: string) {
    return this.http.delete(`${this.urlRestaurante}/${id}`);
  }
}