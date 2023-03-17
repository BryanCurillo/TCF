import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { PrincipalComponent } from './principal/principal.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ServisLoginResgisService } from './service/servisLoginResgis.service';
import { HeadersComponent } from './headers/headers.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriaComponent } from './categoria/categoria/categoria.component';
import { FormsModule } from '@angular/forms';
import { VerproductoComponent } from './verproducto/verproducto.component';
import { UploadFilesComponent } from './uploadFiles/upload-files/upload-files.component';
import { InicioComponent } from './inicio/inicio.component';
import { TruequeComponent } from './trueque/trueque.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormComponent } from './lista-clientes/form.component';
import { AdministracionService } from './service/administracion.service';
import { AdministrarComponent } from './administrador/administrar/administrar.component';
import { HadearAdminComponent } from './administrador/hadear-admin/hadear-admin.component';
import { CategoriasComponent } from './administrador/categorias/categorias.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { AdproductosComponent } from './administrador/adproductos/adproductos.component';
import { MisproductosComponent } from './misproductos/misproductos.component';
import { PrincipaltruequeComponent } from './principaltrueque/principaltrueque.component';
import { FacturaComponent } from './factura/factura.component';
import { ProductoOfertaComponent } from './producto-oferta/producto-oferta.component';
import { VertruequeComponent } from './vertrueque/vertrueque.component';
import { ModificarusuarioComponent } from './modificarusuario/modificarusuario.component';
import { FacturatruequeComponent } from './facturatrueque/facturatrueque.component';
// import { UploadFilesComponent } from './uploadFiles/upload-files/upload-files.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatButtonModule} from '@angular/material/button';
// import {MatCardModule} from '@angular/material/card';
// import {MatIconModule} from '@angular/material/icon';
//temporal eliminar ALERTAS

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisComponent,
    RegistrarComponent,
    PrincipalComponent,
    FooterComponent,
    HeadersComponent,
    ProductosComponent,
    CategoriaComponent,
    VerproductoComponent,
    UploadFilesComponent,
    InicioComponent,
    TruequeComponent,
    NosotrosComponent,
    ListaClientesComponent,
    FormComponent,
    AdministrarComponent,
    HadearAdminComponent,
    CategoriasComponent,
    UsuariosComponent,
    AdproductosComponent,
    MisproductosComponent,
    PrincipaltruequeComponent,
    FacturaComponent,
    ProductoOfertaComponent,
    VertruequeComponent,
  ModificarusuarioComponent,
  FacturatruequeComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    // MatProgressBarModule,
    // MatButtonModule,
    // MatCardModule,
    // MatIconModule,
    
    //TEMPORAL eliminar ALERTAS
  ],
  providers: [ServisLoginResgisService, ListaClientesComponent,AdministracionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
