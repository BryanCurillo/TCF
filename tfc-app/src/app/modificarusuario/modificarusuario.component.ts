import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { persona } from '../modelo/persona';
import { usuario } from '../modelo/usuario';
import { AdministracionService } from '../service/administracion.service';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent {
  constructor(private router:Router, private service:ServisLoginResgisService,private serviceAdmin:AdministracionService){}

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
  //almacenar datos usuario
  userId :String="";
  userName:String="";
 
  ngOnInit(){
    this.recuperarData();
    this.cargarDatos();
  }

  recuperarData(){
    this.userId= String (localStorage.getItem("userId"));
    this.userName= String (localStorage.getItem("userName"));
 
    //si alguno de los datos esta vacion tiene que regresar ala pagina principal y no puede avanzar 
    if(this.userId=='null' ||this.userName=='null'){
      // this.router.navigate(["login"]);
    }
  }

  cargarDatos(){
    if(this.userId!=""){
      this.modeloUsuario.usuId=Number(this.userId);
      this.service.getUserId(this.modeloUsuario).subscribe(data=>{
        this.modeloUsuario=data;
        this.modeloPersona=data.usuPerId;
      });
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
        
        //actualizar persona
        this.service.updatePersona(this.modeloPersona).subscribe(data=>{
          
          //recupero la contraseña 
          this.modeloUsuario.usuContraUsuario=this.contra;
          //actulizar usuario
          this.service.updateUsuario(this.modeloUsuario).subscribe(data=>{
        
            Swal.fire('LOGIN','USUARIO Modificado','success');
            
          }); 
          
        });

      }else{
        this.boolAlertContraIgual=true;
      }
    }

   
  }

  eliminarUsuario(){
    this.modeloUsuario.usuEstado=false;
    this.serviceAdmin.getUpdateEstado(this.modeloUsuario).subscribe(data=>{

      if(data==1){
        Swal.fire('Administración','USUARIO Eliminado','error'); 
        setTimeout(() =>{
          //limpio la data 
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          // Redirigo a la pagina de login
          this.router.navigate(["login"]);
        }, 1500);

      
      }
     
    });

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
