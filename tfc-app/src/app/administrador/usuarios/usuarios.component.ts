import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/modelo/usuario';
import { AdministracionService } from 'src/app/service/administracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  usuariosAct:usuario[]| undefined;
  usuariosInc:usuario[]| undefined;
  constructor(private service:AdministracionService){}
  ngOnInit() {
    this.service.getUsuariosAct().subscribe(data=>{

      this.usuariosAct=data;

    });

    this.service.getUsuarioInc().subscribe(data=>{
      this.usuariosInc=data;
    });
    
  }

  desactivarUsuario(usu:usuario){
    usu.usuEstado=false;
    this.service.getUpdateEstado(usu).subscribe(data=>{

      if(data==1){
        Swal.fire('Administración','USUARIO DESABILITADO','info'); 
        setTimeout(function() {
          // Recargar la página
          location.reload();
        }, 2500);
      }
     
    });
  }

  //activar y desactivar permisos de adminstrado al cualquier usuario
  HabiDesUsuario(usu:usuario){
    usu.usuRol=!usu.usuRol;
    this.service.putUpdateRol(usu).subscribe(data=>{
      Swal.fire('Administración','PERMISOS CAMBIADOS','success'); 
      
    });
  }

  activarUsuario(usu:usuario){
    usu.usuEstado=true;
    this.service.getUpdateEstado(usu).subscribe(data=>{

      if(data==1){
        Swal.fire('Administración','USUARIO Habilitado','success'); 
        setTimeout(function() {
          // Recargar la página
          location.reload();
        }, 2500);
      }
     
    });
  }
  

}
