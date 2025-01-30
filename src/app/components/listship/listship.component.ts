import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ShipService} from '../../services/ship.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-listship',
  standalone: false,

  templateUrl: './listship.component.html',
  styleUrl: './listship.component.css'
})
export class ListshipComponent implements OnInit {

  ship: any[] = [];  // Arreglo para almacenar los barcos
  constructor(private shipService:ShipService, private router:Router, private alertService:AlertService) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener todos los barcos
    this.shipService.getShips().subscribe(
      (data) => {
        console.log('Barcos Traídos:', data);
        this.ship = data;  // Almacena la lista de barcos en el arreglo
      },
      (error) => {
        console.error('Error al obtener los barcos', error);
      }
    );
  }

  //funcion para eliminar barcos
  deleteShip(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este barco?')) {
      this.shipService.deleteShip(id).subscribe({
        next: () => {
          this.alertService.showAlert('Barco eliminado correctamente.');
          window.location.reload();  // Recarga la página completa
          this.ship = this.ship.filter((ship) => ship.id !== id); // Actualizar la lista localmente
        },
        error: (err) => {
          console.error('Error eliminando el barco:', err);
          this.alertService.showAlert('Error al eliminar el barco.');
        },
      });
    }
  }
}
