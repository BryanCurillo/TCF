import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { persona } from '../modelo/persona';
import { usuario } from '../modelo/usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServisLoginResgisService {

  constructor(private http:HttpClient) { }

  private url='http://localhost:8080/api';

  //comprobar el inicio de sesion si la persona existe
  getUsuarioUserPass(usua:usuario){

    return this.http.get<usuario>(this.url+"/Usuario/"+usua.UsuNombreUsuario+"/"+usua.UsuContraUsuario);

  }

  getExistGmail(per:persona){
    return this.http.get<boolean>(this.url+"/persona/existG/"+per.PerCorreo);
  }

  getExistDni(per:persona){
    return this.http.get<boolean>(this.url+"/persona/existD/"+per.PerCedula);
  }

  getExistUser(usua:usuario){
    return this.http.get<boolean>(this.url+"/Usuario/exist/"+usua.UsuNombreUsuario);
  }

}
