import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoOferta } from '../modelo/productoOferta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoOfertaService {

  private url: string='http://localhost:8080/api/ProductoOferta';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) {

  }

  // public create(productoOferta: ProductoOferta): Observable<ProductoOferta> {
  //   return this.http.post<ProductoOferta>(this.url, productoOferta, {headers: this.httpHeaders})
  // }

  public create(producto: ProductoOferta): Observable<ProductoOferta> {
    return this.http.post<ProductoOferta>(this.url,producto,{headers:this.httpHeaders})
  }

  getProductoOfeId(id:number):Observable<ProductoOferta>{
    return this.http.get<ProductoOferta>(`${this.url}/${id}`);
  }

  deleteProductoOfe(id:number):Observable<ProductoOferta>{
    return this.http.delete<ProductoOferta>(`${this.url}/${id}`);
  }


}
