import { Component, ElementRef, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import { usuario } from '../modelo/usuario';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';



@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['./login-regis.component.css']
})
export class LoginRegisComponent {

  //constructor donde paso los servicios y el ruta para regidigir
  constructor(private router:Router, private service:ServisLoginResgisService){}

  /* sirve para poner las animaciones  */
  /* en el html hay que agregar un #idname */
  /* posdata en el tsconfig.json se desactiva el requerimiento para obligar a definir las variables  */
  @ViewChild('signUpBtn') signUpBtn: ElementRef;
  @ViewChild('signInBtn') signInBtn: ElementRef;
  @ViewChild('container') container: ElementRef;

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

  //acciones que se realizara con los botones 
  registrar(){
    this.router.navigate(["registrar"]);
  }

  principal(modelUsu:usuario){

    if (modelUsu.usu_nombre_usuario!="" && modelUsu.usu_contrasena!="") {
      alert(modelUsu.usu_nombre_usuario+" "+modelUsu.usu_contrasena);
      this.service.getUsuarioUserPass(this.modeloUsuario).subscribe(data=>{
        //comparar si se encontro un usuario o no
        if (data!= null) {
          this.modeloUsuario=data;
          alert("usuario encontrado")

            //mandar a la siguiente pagina
           this.router.navigate(["registrar"]);
        }else{
          alert("Constraseña o usuario incorrecto")
        }
      });
    }else{
      alert("por favor llene los datos ");
    }

   
  }
}
