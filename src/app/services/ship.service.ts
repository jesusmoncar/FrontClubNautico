import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private baseUrl = 'http://localhost:8085/api/ship'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  // Registro de barco
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  // Obtener todos los barcos
  getShips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getShip`);  // Cambié a un arreglo de barcos
  }

  deleteShip(id:number):Observable<any> {{
    return this.http.delete(`${this.baseUrl}/deleteShip/${id}`);
  }}
}
