import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Trueque } from '../modelo/trueque';

@Injectable({
  providedIn: 'root'
})
export class TruequeService {

  private url:string='http://localhost:8080/api/Trueque'
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


  create(trueque: Trueque): Observable<Trueque> {

    return this.http.post<Trueque>(this.url,trueque,{headers:this.httpHeaders})
  }

  getTruekes(): Observable<Trueque[]> {

    return this.http.get(this.url).pipe(
      map(response => response as Trueque[]));
  }

  getTruekeId(id:number):Observable<Trueque>{
    return this.http.get<Trueque>(`${this.url}/${id}`);
  }

  deleteTrueke(id:number):Observable<Trueque>{
    return this.http.delete<Trueque>(`${this.url}/${id}`);
  }
}
