import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Categoria } from '../modelo/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8080/api/Categoria';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {

    // return this.http.get<Categoria[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Categoria[]));
  }

  //recuperar categorias activas o inactivas
  getCate(estado: boolean):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPoint+"Act/"+estado);
  }

  //hibilitar categorias o desabilitar
  putHabDesCategorias(cate:Categoria):Observable<number>{
    return this.http.put<number>(this.urlEndPoint+"Est/"+cate.catEstado+"/"+cate.catNombre,cate);
  }

  //actulizar el nombre de la categoria
  updateNameCat(cate:Categoria):Observable<number>{
    return this.http.put<number>(this.urlEndPoint+"UpName/"+cate.catNombre+"/"+cate.catId,cate);
  }


  //crear categoria 
  crearCategoria(cate:Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint,cate,{headers:this.httpHeaders});

  }

  
}
