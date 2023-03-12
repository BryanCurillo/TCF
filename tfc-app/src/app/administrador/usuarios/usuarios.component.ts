import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/modelo/usuario';
import { AdministracionService } from 'src/app/service/administracion.service';

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

  desactivarUsuario(){

  }
  

}
