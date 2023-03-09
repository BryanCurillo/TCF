import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { VerproductoComponent } from './verproducto/verproducto.component';



const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginRegisComponent },
{ path: 'principal', component: PrincipalComponent },
{ path: 'registrar', component: RegistrarComponent },
{ path: 'header', component: HeadersComponent },
{ path: 'verproducto', component: VerproductoComponent },
{ path: 'producto', component: ProductosComponent },
{ path: 'inicio', component: InicioComponent }




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
