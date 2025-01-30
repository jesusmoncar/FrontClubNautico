import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent {
  form = {
    name: '',
    lastname: '',
    username: '',
    password: '',
    passwordConfirm:'',
    role: '0'
  };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  register() {

    //verifica que las contraseñas sean correctas
    if(this.form.password !== this.form.passwordConfirm){
      this.alertService.showAlert('Las contraseñas introducidas no coinciden.');

      // Restablecer los campos de contraseña para que el usuario los rellene de nuevo
      this.form.password = '';
      this.form.passwordConfirm = '';

      return;
    }

    this.authService.register(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']); // Redirige al login
      },
      error: (err) => {
        console.error('Error:', err);
        this.alertService.showAlert('Error al registrar el usuario.');
      },
    });
  }
}
