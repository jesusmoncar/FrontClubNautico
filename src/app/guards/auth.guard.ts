import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el usuario está autenticado (por ejemplo, si el token existe en localStorage)
    if (this.authService.isAuthenticated()) {
      return true;  // Permite el acceso
    } else {
      // Redirige al usuario a la página de login si no está autenticado
      this.router.navigate(['/login']);
      return false;  // Bloquea el acceso
    }
  }
}
