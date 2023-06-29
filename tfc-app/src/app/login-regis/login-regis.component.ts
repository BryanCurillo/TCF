import { Component, ElementRef, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import { persona } from '../modelo/persona';
import { usuario } from '../modelo/usuario';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';
//TEMPORAL ELIMINAR ALERTAS
import Swal from 'sweetalert2';

import { ThisReceiver } from '@angular/compiler';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['./login-regis.component.css']
})
export class LoginRegisComponent {

  //constructor donde paso los servicios y el ruta para regidigir
  //ELIMINAR TEMPORAL TOASTR
  constructor(private router:Router, private service:ServisLoginResgisService){}

  /* sirve para poner las animaciones  */
  /* en el html hay que agregar un #idname */
  /* posdata en el tsconfig.json se desactiva el requerimiento para obligar a definir las variables  */
  @ViewChild('signUpBtn') signUpBtn: ElementRef;
  @ViewChild('signInBtn') signInBtn: ElementRef;
  @ViewChild('container') container: ElementRef;

  bolCedu: boolean = false;
  bolGmail: boolean = false;
  bolUser: boolean = false;

  //sirve en para las animaciones y cambiar de estado remplaza a javascript
  ngAfterViewInit() {
  
    this.signUpBtn.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add('sign-up-mode');
    });

    
    this.signInBtn.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove('sign-up-mode');
    });

  }

  //creo el modelo usuario donde se almacenaran los datos
  modeloUsuario:usuario=new usuario();
  modeloPersona:persona=new persona();
  //acciones que se realizara con los botones 
  registrar(modelUsu:usuario,modelPer:persona){
    if(modelUsu.usuNombreUsuario!="" && modelPer.perCorreo!="" && modelPer.perCedula!=""){

      let obs1$ = this.service.getExistUser(this.modeloUsuario);
      let obs2$ = this.service.getExistGmail(this.modeloPersona);
      let obs3$ = this.service.getExistDni(this.modeloPersona);

      forkJoin([obs1$, obs2$, obs3$]).subscribe(
        ([bolUser, bolGmail, bolCedu]) => {
          this.bolUser = bolUser;
          this.bolGmail = bolGmail;
          this.bolCedu = bolCedu;


          if(this.bolUser){
            //el usuario existe
            Swal.fire('Registro','USUARIO EXISTENTE','error');
          }else if(this.bolGmail){
            //el gmail exite
            Swal.fire('Registro','GMAIL REGISTRADO','error');
          }else if(this.bolCedu){
            //la cedula existe
            Swal.fire('Registro','CEDULA REGISTRADA','error');
          }else{
            Swal.fire('Registro','USUARIO DISPONIBLE','success');
            localStorage.setItem("user",modelUsu.usuNombreUsuario.toString());
            localStorage.setItem("gmail",modelPer.perCorreo.toString());
            localStorage.setItem("dni",modelPer.perCedula.toString());
            this.router.navigate(["registrar"]);
          }
        },
        error => {
          console.log(error);
        }
      );

    }else{
      Swal.fire('Registro','RELLENE LOS DATOS','warning');
      
    }
  }


  principal(modelUsu:usuario){

    if (modelUsu.usuNombreUsuario!="" && modelUsu.usuContraUsuario!="") {
      
      this.service.getUsuarioUserPass(this.modeloUsuario).subscribe(data=>{
        //comparar si se encontro un usuario o no
        if (data!= null) {
          this.modeloUsuario=data;

          // localStorage.setItem("userId",this.modeloUsuario.usuId.toString());
          localStorage.setItem("userName",this.modeloUsuario.usuNombreUsuario.toString());
          // var usuarioJSON = JSON.stringify(this.modeloUsuario);
          // localStorage.setItem("usuarioObj", usuarioJSON);
          
          Swal.fire('LOGIN','USUARIO ENCONTRADO','success');
            //mandar a la siguiente pagina
            if(data.usuRol==true){
              this.router.navigate(["adHeader/adAdministrar"]);
            }else{
              this.router.navigate(["principal"]);
            }
        }else{
      
          Swal.fire('LOGIN','USUARIO O CONTRASEÑA INCORRECTOS','error');
        }
      });
    }else{
      Swal.fire('LOGIN','RELLENE LOS DATOS POR FAVOR','warning');
    }

   
  }
}

