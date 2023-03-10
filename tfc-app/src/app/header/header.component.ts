import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../app.component";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent { 

    title:String = "APLICACION ANGULAR";
}