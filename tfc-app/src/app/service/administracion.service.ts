import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  constructor(private http:HttpClient) { }
  private url='http://localhost:8080/api';

  getUsuariosAct():Observable<usuario[]>{

    return this.http.get<usuario[]>(this.url+"/UsuariosAct");
  }

  getUsuarioInc():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.url+"/UsuariosInc");
  }
}
