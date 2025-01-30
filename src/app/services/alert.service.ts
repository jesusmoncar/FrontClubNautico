// src/app/services/alert.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  showAlert(message: string): void {
    alert(message); // Usa alert() por simplicidad. Puedes integrarlo con librerías como Toastr más adelante.
  }
}
