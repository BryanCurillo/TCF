import { Component, OnInit } from '@angular/core';
import { persona } from '../modelo/persona';
import { usuario } from '../modelo/usuario';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{

  modeloUsuario:usuario=new usuario();
  modeloPersona:persona=new persona();
  //activar Alertas
  boolAlertNom: boolean=false;
  boolAlertCon: boolean=false;
  boolAlertRepCon: boolean=false;
  boolAlertDes: boolean=false;
  boolAlertApell: boolean=false;
  boolAlertApe: boolean=false;
  boolAlertTel: boolean=false;

  ngOnInit(){
    this.recuperarData();
  }
  recuperarData(){
    let user= String (localStorage.getItem("user"));
    let gmail= String (localStorage.getItem("gmail"));
    let dni= String (localStorage.getItem("dni"));

    this.modeloPersona.PerCorreo=gmail;
    this.modeloPersona.PerCedula=dni;
    this.modeloUsuario.UsuNombreUsuario=user;
  }

  verificarDatos(){
    
  }


}
