import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,

  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  implements OnInit {

  //almaceno el nombre de usuario y el rol que tiene para mostrar las distintas funciones
  role: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
        console.log('Usuario obtenido:', data);
        this.username = data.username;
        this.role = data.role;
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
