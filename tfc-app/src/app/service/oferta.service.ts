import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Oferta } from '../modelo/oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private url :string='http://localhost:8080/api/Oferta';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  public create(oferta: Oferta): Observable<Oferta> {
    console.log("///////////////////////////")
    console.log(oferta.ofeEstado)
    console.log(oferta.ofeId)
    console.log(oferta.ofeIdOfertante)
    console.log(oferta.ofePubId)
    console.log(oferta.poIdOferta)
    console.log("///////////////////////////")
    return this.http.post<Oferta>(this.url,oferta,{headers:this.httpHeaders})
  }

  getOfertas(): Observable<Oferta[]> {

    // return this.http.get<Categoria[]>(this.urlEndPoint);
    return this.http.get(this.url).pipe(
      map(response => response as Oferta[]));
  }

  getProductoOfeId(id:number):Observable<Oferta>{
    return this.http.get<Oferta>(`${this.url}/${id}`);
  }

  deleteProductoOfe(id:number):Observable<Oferta>{
    return this.http.delete<Oferta>(`${this.url}/${id}`);
  }
}
