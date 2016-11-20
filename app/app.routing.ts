import { RadarComponent } from './radar/radar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { AuthGuard } from "./app-guard.service";
import { Routes } from "@angular/router";

export const authProviders = [
  AuthGuard
];

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: "start",
    component: SidemenuComponent, canActivate: [AuthGuard],
    children: [
      { path: "", component: HomeComponent , canActivate: [AuthGuard], },
      { path: "radar", component: RadarComponent, canActivate: [AuthGuard], },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  }
];