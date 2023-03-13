import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarComponent } from './administrador/administrar/administrar.component';
import { AdproductosComponent } from './administrador/adproductos/adproductos.component';
import { HadearAdminComponent } from './administrador/hadear-admin/hadear-admin.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { HeadersComponent } from './headers/headers.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormComponent } from './lista-clientes/form.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { MisproductosComponent } from './misproductos/misproductos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PrincipalComponent } from './principal/principal.component';
import { PrincipaltruequeComponent } from './principaltrueque/principaltrueque.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { TruequeComponent } from './trueque/trueque.component';
import { VerproductoComponent } from './verproducto/verproducto.component';



const routes: Routes = [/*{ path: '', redirectTo: '/adHeader', pathMatch: 'full' }*/{ path: '', redirectTo: '/login', pathMatch: 'full' },
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
{ path: 'misproductos', component: MisproductosComponent },
{ path: 'principalt', component: PrincipaltruequeComponent },

//rutas para el administrador

  { path: 'adHeader', component:  HadearAdminComponent , children: [
    { path: 'adAdministrar', component:  AdministrarComponent  },
    { path: 'adUsuarios', component:  UsuariosComponent  },
    { path: 'adProductos', component:  AdproductosComponent  }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
