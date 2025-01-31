import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../services/trip.service';
import { Router } from '@angular/router';
import { ShipService } from '../../../services/ship.service';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-trip',
  standalone: false,
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  ships: any[] = [];  // Lista de barcos de usuario
  description: string = '';  // Variable para almacenar la descripción
  shipId: string = '';  // Variable para almacenar el ID del barco
  fechayHora: string = '';  // Variable para almacenar la fecha y hora
  userId: string = '';  // Variable para almacenar el ID del usuario

  constructor(
    private tripService: TripService,
    private shipService: ShipService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getShips();  // Obtener la lista de barcos al iniciar el componente
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

  // Registrar el viaje
  register() {
    const tripData = {
      description: this.description,
      shipId: this.shipId,
      fechayHora: this.fechayHora,
      userId: this.userId
    };

    // Registrar el viaje
    this.tripService.register(tripData).subscribe({
      next: () => {
        this.alertService.showAlert('Viaje creado con éxito. A espera de asignación.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.alertService.showAlert('Error al crear el viaje.');
      }
    });
  }

}
