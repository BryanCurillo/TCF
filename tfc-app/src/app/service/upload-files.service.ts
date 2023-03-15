import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../modelo/enviroment';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { FileModel } from '../modelo/fileModel';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  // private url = 'http://localhost:8080/api';

  //Url obtenida de la variable de enviroments
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.baseUrl}/upload2`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getFiles(): Observable<FileModel[]> {

    return this.http.get<FileModel[]>(`${this.baseUrl}/files`);
  }

  downloadFile(filename: string) {
    return this.http.get(`${this.baseUrl}/files/${filename}`, { responseType: 'blob' });
  }

  getImagen(filename: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/*' }); // o la extensión que corresponda
    return this.http.get(`${this.baseUrl}/files/${filename}`, { headers: headers, responseType: 'blob' });
  }

  getFileRes(filename: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/files/${filename}`, { headers: headers, responseType: 'blob' })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getFileName(filename: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/files/${filename}`, {
      headers: headers,
      responseType: 'blob'
    });
  }

  getFileUrl(filename: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/files/${filename}`, {
      headers: headers,
      responseType: 'blob'
    }).pipe(map(response => URL.createObjectURL(response)));
  }
  

  //Metodo para borrar los archivos
  deleteFile(filename: string) {
    return this.http.get(`${this.baseUrl}/delete/${filename}`);
  }


}

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

  
  //Metodo para Obtener los archivos
  // getFiles() {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }

  
  // getFile(filename: string): Observable<Blob> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     responseType: 'blob' as 'json' // Indica que la respuesta es un archivo
  //   };

  //   return this.http.get<Blob>(`${this.baseUrl}/files/${filename}`, httpOptions);
  // }

