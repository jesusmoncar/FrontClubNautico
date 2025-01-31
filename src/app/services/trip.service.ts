import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TripService{
  private baseUrl = 'http://localhost:8085/api/trip'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  // Registro de barco
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  // Obtener todos los barcos
  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obtener`);
  }

  deleteTrip(id:number):Observable<any> {{
    return this.http.delete(`${this.baseUrl}/deleteTrip/${id}`);
  }}


}
