import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Producto } from '../modelo/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadFilesService } from './upload-files.service';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint: String = 'http://localhost:8080/api/Producto';

  private URLPOST: string = 'http://localhost:8080/api/ProductoNew';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http: HttpClient) {

  }


  public create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.URLPOST, producto, {headers: this.httpHeaders})
  }

  // getProductos(): Observable<Producto[]> {
  //   return this.http.get(this.urlEndPoint).pipe(
  //     map(response => response as Producto[]));
  // }

  getProductoId(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }

  deleteProducto(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`);
  }
  
}
