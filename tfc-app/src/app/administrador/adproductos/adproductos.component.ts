import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/modelo/fileModel';
import { Publicacion } from 'src/app/modelo/publicacion';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { UploadFilesService } from 'src/app/service/upload-files.service';

@Component({
  selector: 'app-adproductos',
  templateUrl: './adproductos.component.html',
  styleUrls: ['./adproductos.component.css']
})
export class AdproductosComponent implements OnInit{
  constructor(private publicacionService: PublicacionService,private uploadFileService: UploadFilesService) { }
  public publicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[]| undefined;
  fileModels: FileModel[];

  ngOnInit(): void {
        this.cargarPublicaciones();
        this.cargarFotos();
  }
  public cargarFotos() {
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files
    }
    );
  }
  cargarPublicaciones(): void {
    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => {
        this.publicaciones = publicaciones
      }
    );

  }

}
