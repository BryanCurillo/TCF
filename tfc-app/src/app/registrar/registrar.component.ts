import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginRegisComponent } from '../login-regis/login-regis.component';
import { persona } from '../modelo/persona';
import { usuario } from '../modelo/usuario';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{

constructor(private router:Router, private service:ServisLoginResgisService){}

  modeloUsuario:usuario=new usuario();
  modeloPersona:persona=new persona();
  //iniciarlizar el radio button para no tener que validar despues 
  
  //activar Alertas
  boolAlertNom: boolean=false;
  boolAlertDirc: boolean=false;
  boolAlertApell: boolean=false;
  boolAlertTel: boolean=false;
  boolAlertCon: boolean=false;
  boolAlertRepCon: boolean=false;
  boolAlertContraIgual: boolean=false;

  contra:string="";
  contra2:String="";
  // sirve si es 0 se manda a  guardar todos los datos 
  bandera:number=0;

  ngOnInit(){
    this.recuperarData();

  }
  recuperarData(){
    let user= String (localStorage.getItem("user"));
    let gmail= String (localStorage.getItem("gmail"));
    let dni= String (localStorage.getItem("dni"));

    this.modeloPersona.perCorreo=gmail;
    this.modeloPersona.perCedula=dni;
    this.modeloUsuario.usuNombreUsuario=user;
    this.modeloPersona.perSexo="Hombre";

    //controlar la FUGA DE MEMORIA!!!!!!!!!!!!!!!!!!!!!!!!
    localStorage.removeItem("user");
    localStorage.removeItem("gmail");
    localStorage.removeItem("dni");

    //si alguno de los datos esta vacion tiene que regresar ala pagina principal y no puede avanzar 
    if(user=='null' || gmail=='null' || dni=='null'){
      // this.router.navigate(["login"]);
    }
  }

  verificarDatos(){
    //reinicializar la bandera a 0
    this.bandera=0;
    this.desactivarAlertas();
    //verifica los datos para que usuario sea guardado

    if(this.modeloPersona.perNombre==""){
      this.bandera=this.bandera+1;
      this.boolAlertNom=true;
    }
    if(this.modeloPersona.perApellido==""){
      this.bandera=this.bandera+1;
      this.boolAlertApell=true;
    }
    if(this.modeloPersona.perDireccion==""){
      this.bandera=this.bandera+1;
      this.boolAlertDirc=true;
    }
    if(this.modeloPersona.perTelefono==""){
      this.bandera=this.bandera+1;
      this.boolAlertTel=true
    }
    if(this.contra==""){
      this.bandera=this.bandera+1;
      this.boolAlertCon=true;
    }
    if(this.contra2==""){
      this.bandera=this.bandera+1;
      this.boolAlertRepCon=true;
    }
    
    //comporbar contraseñas



    if (this.bandera==0) {
      if(this.contra==this.contra2){
        
        //registar usuario
        this.service.createPersona(this.modeloPersona).subscribe(data=>{
          this.modeloUsuario.usuPerCedula= data.perId;
          this.service.createUsuario(this.modeloUsuario).subscribe(data=>{
            
            Swal.fire('REGISTRO','USUARIO CREADO EXITOSAMENTE','success');
            
          })

        })

      }else{
        this.boolAlertContraIgual=true;
      }
    }

   
  }

  desactivarAlertas(){
    this.boolAlertNom=false;
    this.boolAlertDirc=false;
    this.boolAlertApell=false;
    this.boolAlertTel=false;
    this.boolAlertCon=false;
    this.boolAlertRepCon=false;
    this.boolAlertContraIgual=false;
  }
}
