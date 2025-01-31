import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  role: string = '';  // Variable para almacenar el rol
  username: string = ''; // Para mostrar el nombre de usuario



  constructor(private authService: AuthService) {}
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

    protected readonly UserActivation = UserActivation;
}
