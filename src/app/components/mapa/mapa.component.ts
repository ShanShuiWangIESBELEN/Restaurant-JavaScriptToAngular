import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  restaurante: Restaurante | undefined;

  constructor(
    private restauranteService: RestauranteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.restauranteService.getRestaurante(id).subscribe(restaurante => {
        this.restaurante = restaurante;
        if (this.restaurante) {
          map.setView([this.restaurante.latitud, this.restaurante.longitud], 15);
          L.marker([this.restaurante.latitud, this.restaurante.longitud]).addTo(map)
            .bindPopup(`<b>${this.restaurante.nombre}</b><br>${this.restaurante.direccion}`)
            .openPopup();
        }
       
      });
    }
  }
}