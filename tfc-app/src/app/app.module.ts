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


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisComponent,
    RegistrarComponent,
    PrincipalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServisLoginResgisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
