import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelo/producto';
import { Categoria } from 'src/app/modelo/categoria';
import { Publicacion } from 'src/app/modelo/publicacion';
import { CategoriaService } from 'src/app/service/categoria.service';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import Swal from 'sweetalert2';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { FileUpload } from 'src/app/modelo/fileUpload';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { usuario } from '../modelo/usuario';
// import { FileService } from './file.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  public usuarioFK: usuario = new usuario();
  public producto: Producto = new Producto();
  public categoriaFK: Categoria = new Categoria()
  public publicacionNew: Publicacion = new Publicacion();


  seleccionados: Categoria = new Categoria;
  imageSrc: string = '';

  public fileUpload: FileUpload = new FileUpload();
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  userId: string;
  userName: string;

  constructor(private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private publicacionService: PublicacionService,
    private uploadFileService: UploadFilesService,
    private router: Router) { }

  ngOnInit(): void {

    this.cargarCategorias();
    this.recuperarUSU();
  }

  recuperarUSU() {
    this.userId = String(localStorage.getItem("userId"))
    this.userName = String(localStorage.getItem("userName"))

    this.usuarioFK.usuId=parseInt(String(localStorage.getItem("userId")));
    this.usuarioFK.usuNombreUsuario=String(localStorage.getItem("userName"));

  }




  categorias: Categoria[] = [];

  public cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias);
  }


  public files: File[]



  createFile(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);

      this.producto.fileName = file.name;

      console.log(this.producto.fileName);

      ////////////////////////////////////////////////////////
      const reader = new FileReader();

      if (files && files.length) {
        const [file] = files;
        reader.readAsDataURL(file);

        reader.onload = () => {

          this.imageSrc = reader.result as string;

        };

      }

    }
    this.uploadFileService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public create(): void {
    this.categoriaFK.catNombre = this.seleccionados.catNombre;

    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categoriaFK.catNombre === this.categorias[i].catNombre) {
        this.categoriaFK.catId = i + 1;
      }
    }

    this.producto.prodIdCategoria = this.categoriaFK.catId;

    this.productoService.create(this.producto).subscribe(productoNew => {
      
      this.publicacionNew.pubIdProducto = productoNew;
      this.publicacionNew.pubIdVendedor = parseInt(this.userId);

      this.publicacionService.create(this.publicacionNew).subscribe(publicacionN => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Producto ${this.producto.prodNombre} guardado con exito`,
          showConfirmButton: false,
          timer: 1500
        })
      })
    })
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      // case HttpEventType.DownloadProgress:
      //   this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
      //   break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }


}
