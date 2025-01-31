import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import {LogoutComponent} from "./components/logout/logout.component";
import {CreateShipComponent} from './components/create-ship/create-ship.component';
import {CreateTripComponent} from './components/trip/create-trip/create-trip.component';
import {UserGuard} from './guards/user.guard';
import {ListTripComponent} from './components/trip/list-trip/list-trip.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,  canActivate: [AuthGuard] }, // Ruta protegida
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:"logout",component:LogoutComponent , canActivate: [AuthGuard]},
  {path:"createShip",component:CreateShipComponent , canActivate: [AuthGuard,UserGuard]},
  {path:"createTrip", component:CreateTripComponent , canActivate: [AuthGuard,]},
  {path:"listTrip", component:ListTripComponent , canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
