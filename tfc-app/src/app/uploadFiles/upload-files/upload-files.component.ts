import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { FileUpload } from 'src/app/modelo/fileUpload';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Progress } from 'src/app/modelo/progress';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})

export class UploadFilesComponent implements OnInit {



    //Lista de archivos seleccionados
    selectedFiles: FileList;
    //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
    progressInfo= [];
    //Mensaje que almacena la respuesta de las Apis
    message = '';
    //Nombre del archivo para usarlo posteriormente en la vista html
    fileName = "";
    fileInfos: Observable<any>;

    constructor(private uploadFilesService: UploadFilesService, private progress:Progress = new Progress()) { }

    selectFiles(event:any) {
      this.progressInfo = [];
      //Validación para obtener el nombre del archivo si es uno solo
      //En caso de que sea >1 asigna a fileName length
      event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
      this.selectedFiles = event.target.files;
    }

    // uploadFiles() {
    //   this.message = '';
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     this.upload(i, this.selectedFiles[i]);
    //   }
    // }

    // upload(index:number, file:File) {
    //   // this.progress.value=0;

    //   // this.progress.fileName=file.name;

    //   filename:file.name;
    //   value:0;

    //   this.progressInfo[index] = { __filename};
  
    //   this.uploadFilesService.upload(file).subscribe(
    //     event => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
    //       } else if (event instanceof Response) {
    //         this.fileInfos = this.uploadFilesService.getFiles();
    //       }
    //     },
    //     err => {
    //       this.progressInfo[index].value = 0;
    //       this.message = 'No se puede subir el archivo ' + file.name;
    //     });
    // }

    // deleteFile(filename: string) {
    //   this.uploadFilesService.deleteFile(filename).subscribe(res => {
    //     this.message = res['message'];
    //     this.fileInfos = this.uploadFilesService.getFiles();
    //   });
    // }

    ngOnInit(): void {
      this.fileInfos = this.uploadFilesService.getFiles();
    }
}
