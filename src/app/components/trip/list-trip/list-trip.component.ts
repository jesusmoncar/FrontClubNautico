import { Component } from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import {ShipService} from '../../../services/ship.service';

@Component({
  selector: 'app-list-trip',
  standalone: false,

  templateUrl: './list-trip.component.html',
  styleUrl: './list-trip.component.css'
})
export class ListTripComponent {


  trips: any[] = [];  // Arreglo para almacenar los viajes

  constructor(
    private tripService: TripService,
    private shipService:ShipService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener todos los viajes
    this.loadTrips();
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(
      (data) => {
        console.log('Viajes Traídos:', data);
        this.trips = data;  // Almacena la lista de viajes en el arreglo
        this.addShipNames();  // Llamamos a la función para agregar los nombres de los barcos
      },
      (error) => {
        console.error('Error al obtener los viajes', error);
        this.alertService.showAlert('No se pudieron obtener los viajes.');
      }
    );
  }

  addShipNames() {
    // Para cada viaje, buscamos el nombre del barco usando el shipId
    this.trips.forEach((trip) => {
      if (trip.shipId) {
        console.log('Buscando barco con shipId:', trip.shipId);  // Verifica que shipId está presente
        this.shipService.getShipById(trip.shipId).subscribe(
          (shipData) => {
            console.log('Barco encontrado:', shipData);  // Verifica que recibimos la respuesta correcta
            trip.shipname = shipData.name;  // Asumiendo que el objeto "ship" tiene el campo "name"
          },
          (error) => {
            console.error('Error al obtener el barco', error);
            this.alertService.showAlert('No se pudo obtener el nombre del barco.');
          }
        );
      }
    });
  }

  // Función para eliminar un viaje
  deleteTrip(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este viaje?')) {
      this.tripService.deleteTrip(id).subscribe({
        next: () => {
          this.alertService.showAlert('Viaje eliminado correctamente.');
          this.trips = this.trips.filter((trip) => trip.idTrip !== id);  // Actualiza la lista localmente
        },
        error: (err) => {
          console.error('Error eliminando el viaje:', err);
          this.alertService.showAlert('Error al eliminar el viaje.');
        },
      });
    }
  }

  getStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'badge-warning';  // Naranja
      case 'ACCEPTED':
        return 'badge-info';  // Azul
      case 'FINISHED':
        return 'badge-success';  // Verde
      default:
        return 'badge-secondary';  // Gris
    }
  }


}
