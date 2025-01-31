// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api/auth'; // URL del backend
  private userUrl = 'http://localhost:8085/api/user';


  constructor(private http: HttpClient, private router: Router) {}

  // Registro de usuario
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Autenticación (Login)
  authenticate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, data);

  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/give`);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  updateUser(updatedUser: any) {
    return this.http.put(`${this.userUrl}/update`, updatedUser);
  }

}
