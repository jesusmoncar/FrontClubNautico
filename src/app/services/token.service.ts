import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = 'http://localhost:8085/api/auth/register'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient) {}

  // Verifica si el token ha expirado
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken) {
        return true;
      }
      const expirationTime = decodedToken.exp * 1000; // Convertimos a milisegundos
      return new Date().getTime() > expirationTime;
    } catch (e) {
      return true; // Si hay algún error, consideramos que el token ha expirado
    }
  }



  // Verifica si el token ha expirado llamando al backend
  validateTokenBackend(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, { token });
  }

  // Guarda el token en localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtiene el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Elimina el token del localStorage
  removeToken(): void {
    localStorage.removeItem('token');
  }

  checkTokenValidity(): Observable<boolean> {
    let token = this.getToken();
    if (token){
      return this.validateTokenBackend(token).pipe(
        tap((isValid)=>{
          if(!isValid){
            this.removeToken();
          }
        }),
        catchError((err)=>{
          this.removeToken();
          return of(false);
        }
      ));
    }else{
      return of(false);
    }
  }
}
