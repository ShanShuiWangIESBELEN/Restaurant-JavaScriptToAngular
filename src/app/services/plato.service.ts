import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plato } from '../models/plato';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private urlPlato = 'http://localhost:3002/platos';

  constructor(private http: HttpClient) { }

  getPlatos() {
    return this.http.get<Plato[]>(this.urlPlato);
  }

  getPlato(id: string) {
    return this.http.get<Plato>(`${this.urlPlato}/${id}`);
  }

  addPlato(plato: Plato) {
    return this.http.post(this.urlPlato, plato);
  }

  updatePlato(plato: Plato) {
    return this.http.put(`${this.urlPlato}/${plato.id}`, plato);
  }

  deletePlato(id: string) {
    return this.http.delete(`${this.urlPlato}/${id}`);
  }
}