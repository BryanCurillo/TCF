import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from '../modelo/fileModel';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { UploadFilesService } from '../service/upload-files.service';
import { VertruequeService } from './vertrueque.service';


@Component({
  selector: 'app-vertrueque',
  templateUrl: './vertrueque.component.html',
  styleUrls: ['./vertrueque.component.css']
})
export class VertruequeComponent implements OnInit {


  fileModels: FileModel[];
  public imageSrc: string = '';

  constructor(private verproductotru: VertruequeService,
    private uploadFileService: UploadFilesService) { }


  publicacion: Publicacion | undefined;

  IdProducto: String = "";

  ngOnInit(): void {
    this.recuperarId()
    this.cargarPublicacion(Number(this.IdProducto));
  }



  cargarPublicacion(id: number) {
    this.verproductotru.getPublicacion(id).subscribe(data => {

      this.publicacion = data;
      this.cargarFotos(this.publicacion.pubIdProducto.fileName)
      
    });
  }

  recuperarId() {
    this.IdProducto = String(localStorage.getItem("productoId"));

  }


  public cargarFotos(filename:string){
    this.uploadFileService.getFiles().subscribe(files => {
      for (let fileModel of files) {
        if(filename===fileModel.name){
          this.imageSrc=fileModel.url
        }
      }
    }
    );
  }

}