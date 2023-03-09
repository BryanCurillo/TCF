import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../modelo/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  // private url = 'http://localhost:8080/api';

  //Url obtenida de la variable de enviroments
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  //Metodo que envia los archivos al endpoint /upload 
  // upload(file: File): Observable<HttpEvent<any>>{
  //   const formData: FormData = new FormData();
  //   formData.append('files', file);

  //   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //   return this.http.request(req);
  // }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.baseUrl}/upload2`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  //Metodo para Obtener los archivos
  getFiles() {
    return this.http.get(`${this.baseUrl}/files`);
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string) {
    return this.http.get(`${this.baseUrl}/delete/${filename}`);
  }


}
