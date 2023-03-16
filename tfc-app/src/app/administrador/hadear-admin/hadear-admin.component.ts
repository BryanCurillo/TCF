import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hadear-admin',
  templateUrl: './hadear-admin.component.html',
  styleUrls: ['./hadear-admin.component.css']
})
export class HadearAdminComponent {

  constructor(private router:Router){

  }

  cerrarSesion(){
    //limpio la data 
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    // Redirigo a la pagina de login
    this.router.navigate(["login"]);

  }
}
