import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HttpClientModule y HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Importa tu interceptor
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CreateShipComponent } from './components/create-ship/create-ship.component';
import { ListshipComponent } from './components/listship/listship.component';
import { CreateTripComponent } from './components/trip/create-trip/create-trip.component';
import { ListTripComponent } from './components/trip/list-trip/list-trip.component';
import {from} from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavComponent,
    LogoutComponent,
    CreateShipComponent,
    ListshipComponent,
    CreateTripComponent,
    ListTripComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
