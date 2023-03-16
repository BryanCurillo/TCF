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
import * as FileSaver from 'file-saver';
import { FileModel } from '../modelo/fileModel';
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
  public files: File[]
  public fileUpload: FileUpload = new FileUpload();


  seleccionados: Categoria = new Categoria;
  seleComercio: string;
  seleCate: string = 'Hogar';
  public imageSrc: string = '';
  filesRecuperado: File[];

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  userId: string;
  userName: string;
  urlImg: string;
  imgRec: Blob;

  fileModels: FileModel[];
  categorias: Categoria[] = [];
  comercios: String[] = ['Seleccione una opcion','Trueke', 'Venta'];
  categoriaSELEC: Categoria = new Categoria()
  
  constructor(private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private publicacionService: PublicacionService,
    private uploadFileService: UploadFilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.recuperarUSU();
    this.cargarPublicacion();
  }

  recuperarUSU() {
    this.userId = String(localStorage.getItem("userId"))
    this.userName = String(localStorage.getItem("userName"))

    this.usuarioFK.usuId = parseInt(String(localStorage.getItem("userId")));
    this.usuarioFK.usuNombreUsuario = String(localStorage.getItem("userName"));

  }

  selectCate: string = 'Seleccione una categoria';

  public cargarCategorias(): void {

    let categoriaSELEC: Categoria = new Categoria()
    categoriaSELEC.catId = 0;
    categoriaSELEC.catNombre = 'Seleccione una categoria';
    this.categorias.push(categoriaSELEC);

    this.categoriaService.getCate(true).subscribe(
      categorias => {
        for (let categoria of categorias) {

          this.categorias.push(categoria)
        }
      }
    );
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
          // alert(this.imageSrc)

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
        this.categoriaFK.catId = i;
        alert
      } 
      //  {
      //   if (this.categoriaSELEC.catNombre === this.categorias[i].catNombre) {
      //     this.categoriaFK.catId = i;
      //   }

      // }
    }

    this.producto.prodIdCategoria = this.categoriaFK.catId;

    this.productoService.create(this.producto).subscribe(productoNew => {

      this.publicacionNew.pubIdProducto = productoNew;
      this.publicacionNew.pubIdVendedor = parseInt(this.userId);
      // alert("id ven"+this.publicacionNew.pubIdVendedor)
      this.publicacionNew.pubTipo = this.seleComercio;

      this.publicacionService.create(this.publicacionNew).subscribe(publicacionN => {
        this.router.navigate(['/principal'])
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

  cargarPublicacion(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']



      if (id) {
        this.publicacionService.getPublicacionId(id).subscribe((publicacion) => {
          this.publicacionNew = publicacion,
            this.producto = this.publicacionNew.pubIdProducto
            this.cargarFotos(this.producto.fileName);
        })
      }
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
  // imagenUrl: string;
  // nombreImagen:string;
  // obtenerImagen(name:string){

  //   this.uploadFileService.getImagen(name)
  //   .subscribe(data => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(data);
  //     reader.onloadend = () => {
  //       this.imagenUrl = reader.result as string;
  //     };
  //   });
  // }

  
  // cargarFoto(filename: string): string {

  //   let url: string = '';

  //   this.uploadFileService.getFileName(filename).subscribe((file) => {
  //     this.filesRecuperado = file



  //     const reader = new FileReader();

  //     if (this.filesRecuperado && this.filesRecuperado.length) {
  //       const [file] = this.filesRecuperado;
  //       reader.readAsDataURL(file);

  //       reader.onload = () => {

  //         this.imageSrc = reader.result as string;
  //         alert(this.imageSrc)

  //       };

  //     }

  //   })
  //   return url;
  // }

  

  // cargarImg(filename: string) {

  //   this.uploadFileService.getFileUrl(filename).subscribe(url => {
  //     this.imageUrl = url;
  //     alert("1" + url)
  //   });

  // }

  
  // downloadFile(filename: string) {
  //   this.uploadFileService.getFile(filename).subscribe((res: any) => {
  //     const url = window.URL.createObjectURL(res);
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     a.setAttribute('style', 'display: none');
  //     a.href = url;
  //     // a.download = filename;
  //     // a.click();
  //     window.URL.revokeObjectURL(url);
  //     a.remove();
  //     alert(url)
  //   });
  // }
