import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Venta } from '../modelo/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url:string= 'http://localhost:8080/api/Venta'
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }
  
  public create(venta: Venta): Observable<Venta> {

    return this.http.post<Venta>(this.url,venta,{headers:this.httpHeaders})
  }

  getVentas(): Observable<Venta[]> {

    return this.http.get(this.url).pipe(
      map(response => response as Venta[]));
  }
  
  getVentaId(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.url}/${id}`);
  }

  deleteVenta(id:number):Observable<Venta>{
    return this.http.delete<Venta>(`${this.url}/${id}`);
  }
}
