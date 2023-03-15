import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from '../modelo/fileModel';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { UploadFilesService } from '../service/upload-files.service';
import { VerproductoService } from './verproducto.service';




@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {


  fileModels: FileModel[];
  public imageSrc: string = '';

  constructor(private verproductoserv: VerproductoService,
    private uploadFileService: UploadFilesService) { }


  publicacion: Publicacion | undefined;

  IdProducto: String = "";

  ngOnInit(): void {
    this.recuperarId()
    this.cargarPublicacion(Number(this.IdProducto));
  }



  cargarPublicacion(id: number) {
    this.verproductoserv.getPublicacion(id).subscribe(data => {

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



