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
<<<<<<< HEAD
import { CategoriaComponent } from './categoria/categoria/categoria.component';
import { FormsModule } from '@angular/forms';
=======
import { VerproductoComponent } from './verproducto/verproducto.component';
//temporal eliminar ALERTAS

>>>>>>> a0785de1be08386ee04915f4ede03668a9215105

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisComponent,
    RegistrarComponent,
    PrincipalComponent,
    FooterComponent,
    HeadersComponent,
    ProductosComponent,
<<<<<<< HEAD
    CategoriaComponent
=======
    VerproductoComponent
>>>>>>> a0785de1be08386ee04915f4ede03668a9215105
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //TEMPORAL eliminar ALERTAS
  ],
  providers: [ServisLoginResgisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
