import { Injectable } from '@angular/core';
import { persona } from '../modelo/persona';
import { personas } from './lista-clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ListaService {

  private urlEndPoint: string = 'http://localhost:8080/api/personas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<persona[]> {

    // return this.http.get<persona[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(map(response => response as persona[]))

  }

  create(persona: persona): Observable<persona> {
    return this.http.post<persona>(this.urlEndPoint, persona, { headers: this.httpHeaders })

  }

  getPersona(id: number): Observable<persona>{

    return this.http.get<persona>(`${this.urlEndPoint}/${id}`)
  }

}
