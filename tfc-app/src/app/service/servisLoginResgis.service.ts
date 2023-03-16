import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { persona } from '../modelo/persona';
import { usuario } from '../modelo/usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServisLoginResgisService {

  constructor(private http:HttpClient) { }

  private url='http://localhost:8080/api';
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  //comprobar el inicio de sesion si la persona existe
  getUsuarioUserPass(usua:usuario){

    return this.http.get<usuario>(this.url+"/Usuario/"+usua.usuNombreUsuario+"/"+usua.usuContraUsuario);

  }

  getExistGmail(per:persona){
    return this.http.get<boolean>(this.url+"/persona/existG/"+per.perCorreo);
  }

  getExistDni(per:persona){
    return this.http.get<boolean>(this.url+"/persona/existD/"+per.perCedula);
  }

  getExistUser(usua:usuario){
    return this.http.get<boolean>(this.url+"/Usuario/exist/"+usua.usuNombreUsuario);
  }

  createPersona(pers:persona):Observable<persona>{

    return this.http.post<persona>(this.url+"/persona",pers);
  }

  createUsuario(usus:usuario):Observable<usuario>{
    return this.http.post<usuario>(this.url+"/Usuario",usus);
  }

    //recuperar usuario por id
    getUserId(usus:usuario):Observable<usuario>{
      return this.http.get<usuario>(this.url+"/Usuario/"+usus.usuId);
    }
  
    //actulizar usuario y persona 
    updatePersona(per:persona):Observable<persona>{
      return this.http.put<persona>(this.url+"/personaUpdate/"+per.perId,per);
    }
  
    updateUsuario(usus:usuario):Observable<usuario>{
      return this.http.put<usuario>(this.url+"/Usuario/"+usus.usuId,usus);
    }

    obtenerUsuario(id: number): Observable<usuario> {
      // alert(`${this.url}/Usuario/${id}`)
      return this.http.get<usuario>(`${this.url}/Usuario/${id}`);
    }
}
