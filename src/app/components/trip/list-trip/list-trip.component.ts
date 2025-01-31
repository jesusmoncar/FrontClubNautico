import {Component, OnInit} from '@angular/core';
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
export class ListTripComponent implements OnInit {

  ships: any[] =[];
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
    this.getShips();  // Obtener la lista de barcos al iniciar el componente
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(
      (data) => {
        console.log('Viajes Traídos:', data);
        this.trips = data;  // Almacena la lista de viajes en el arreglo
        this.getShips();  // Llamamos a la función para agregar los nombres de los barcos
      },
      (error) => {
        console.error('Error al obtener los viajes', error);
        this.alertService.showAlert('No se pudieron obtener los viajes.');
      }
    );
  }

  // Obtener los barcos
  getShips() {
    this.shipService.getShips().subscribe(
      (data) => {
        console.log('Barcos obtenidos:', data);
        this.ships = data;  // Asignar los barcos a la variable ships
      },
      (error) => {
        console.error('Error al obtener los barcos', error);
        this.alertService.showAlert('No se pudieron obtener los barcos.');
      }
    );
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
