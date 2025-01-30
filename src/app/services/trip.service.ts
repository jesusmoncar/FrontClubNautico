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

  createTrip(data: any) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

}
