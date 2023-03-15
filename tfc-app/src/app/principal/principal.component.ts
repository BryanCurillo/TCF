import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from '../modelo/fileModel';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { UploadFilesService } from '../service/upload-files.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public publicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[] = [];
  producto: Producto = new Producto;
  public imageSrc: string = '';
  fileModels: FileModel[];

  constructor(private publicacionService: PublicacionService,
    private productoService: ProductoService,
    private uploadFileService: UploadFilesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPublicaciones()
    this.cargarFotos()

  }

  public cargarFotos() {
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files
    }
    );
  }

  cargarPublicaciones(): void {

    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => { this.publicaciones = publicaciones
     }
    );


    // alert(this.publicaciones.length)

  }



  // cargarProductos(id: number): Producto {

  //   this.activatedRoute.params.subscribe(params => {

  //     if (id) {
  //       this.productoService.getProductoId(id).subscribe((producto) => this.producto = producto)
  //     }
  //   })

  //   return this.producto;
  // }

}
