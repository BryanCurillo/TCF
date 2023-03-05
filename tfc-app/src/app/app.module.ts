import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { PrincipalComponent } from './principal/principal.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServisLoginResgisService } from './service/servisLoginResgis.service';
import { HeadersComponent } from './headers/headers.component';
//temporal eliminar ALERTAS


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisComponent,
    RegistrarComponent,
    PrincipalComponent,
    FooterComponent,
    HeadersComponent
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
