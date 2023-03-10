import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Publicacion } from '../modelo/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
  private url: string = 'http://localhost:8080/api/Publicacion';

  constructor(private http: HttpClient) { }


  public create(publicacion: Publicacion): Observable<Publicacion> {
    // alert("si pase service");
    return this.http.post<Publicacion>(this.url, publicacion, {headers: this.httpHeaders})
  }
  getPublicaciones(): Observable<Publicacion[]> {
    // alert("LISTA PUBLI")
    return this.http.get(this.url).pipe(
      map(response => response as Publicacion[]));
  }
  
}
