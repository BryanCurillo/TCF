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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    
    //TEMPORAL eliminar ALERTAS
  ],
  providers: [ServisLoginResgisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
