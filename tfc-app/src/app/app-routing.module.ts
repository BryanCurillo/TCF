import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegistrarComponent } from './registrar/registrar.component';



const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginRegisComponent },
{ path: 'principal', component: PrincipalComponent },
{ path: 'registrar', component: RegistrarComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
