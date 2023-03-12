import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormComponent } from './lista-clientes/form.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { TruequeComponent } from './trueque/trueque.component';
import { VerproductoComponent } from './verproducto/verproducto.component';



const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginRegisComponent },
{ path: 'principal', component: PrincipalComponent },
{ path: 'registrar', component: RegistrarComponent },
{ path: 'header', component: HeadersComponent },
{ path: 'verproducto', component: VerproductoComponent },
{ path: 'producto', component: ProductosComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'nosotros', component: NosotrosComponent },
{ path: 'admclientes', component: ListaClientesComponent },
{ path: 'trueque', component: TruequeComponent },
{ path: 'admclientes/form', component: FormComponent },
{ path: 'admclientes/form/:id', component: FormComponent }






];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
