import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametersComponent } from './parameters/parameters.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'parameters',
    component: ParametersComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
