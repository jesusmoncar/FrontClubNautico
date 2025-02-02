import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ShipService} from '../../services/ship.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-create-ship',
  standalone: false,

  templateUrl: './create-ship.component.html',
  styleUrl: './create-ship.component.css'
})
export class CreateShipComponent {

  form={

    nameShip: '',
    type: '',
    description: '',
    registrationNumber: '',
    fee: 0,
    morring: 0,
}

  constructor(private shipService:ShipService, private router:Router, private alertService:AlertService) {}

// Lista de amarres disponibles (simulación)
  amarresDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  amarresOcupados: number[] = []; // cargar los amarres ya usados desde la BD o backend.

  //arreglar la comprobacion de amarres, puede crear mas barcos que amarre

  //depende de el tipo de barco que vaya a registrar el usuario se le asigna su tarifa especifica
  updateFeeAndMorring() {
    const tarifas: { [key: string]: number } = {
      velero: 200,
      catamaran: 300,
      yate: 500,
      lancha: 150,
      pesquero: 250,
      crucero: 1000,
      bote: 100
    };

    if (this.form.type in tarifas) {
      this.form.fee = tarifas[this.form.type];
    }

    this.form.morring = this.asignarAmarre();
  }

  //se le asigna tambien un numero de amarre
  asignarAmarre(): number {
    // Filtra amarres disponibles
    const amarresLibres = this.amarresDisponibles.filter(a => !this.amarresOcupados.includes(a));

    //caso de que ya no queden mas amarres disponibles
    if (amarresLibres.length === 0) {
      alert("No hay amarres disponibles.");
      return 0;
    }

    // Selecciona un amarre aleatorio
    const index = Math.floor(Math.random() * amarresLibres.length);
    const amarreAsignado = amarresLibres[index];

    // Simula que el amarre ahora está ocupado (en una app real, esto se guardaría en una BD)
    this.amarresOcupados.push(amarreAsignado);

    return amarreAsignado;
  }

  createNewShip(){
    this.shipService.register(this.form).subscribe({
      next: (response) => {
        this.alertService.showAlert('Barco registrado exitosamente.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('error:' + err);
        this.alertService.showAlert('Error al registrar el barco')
      }
    });
  }

}
