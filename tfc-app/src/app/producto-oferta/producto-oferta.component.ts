import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import Swal from 'sweetalert2';
import { Oferta } from '../modelo/oferta';
import { ProductoOferta } from '../modelo/productoOferta';
import { Publicacion } from '../modelo/publicacion';
import { usuario } from '../modelo/usuario';
import { OfertaService } from '../service/oferta.service';
import { ProductoOfertaService } from '../service/producto-oferta.service';
import { PublicacionService } from '../service/publicacion.service';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';
import { UploadFilesService } from '../service/upload-files.service';

@Component({
  selector: 'app-producto-oferta',
  templateUrl: './producto-oferta.component.html',
  styleUrls: ['./producto-oferta.component.css']
})
export class ProductoOfertaComponent implements OnInit {

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };


  userId: number;
  IdPublicacion: number = 0;
  userName: string;
  publicacionJSON: string = '';
  public imageSrc: string = '';

  public usuarioFK: usuario = new usuario();
  public oferta: Oferta = new Oferta();
  public publicacion: Publicacion = new Publicacion();
  public productoOferta: ProductoOferta = new ProductoOferta();


  ngOnInit(): void {
    this.recuperarUSU();
    this.recuperarPublicacion()
  }

  constructor(private productoOfertaService: ProductoOfertaService,
    private publicacionService: PublicacionService,
    private activatedRoute: ActivatedRoute,
    private ofertaService: OfertaService,
    private uploadFileService: UploadFilesService,
    private usuarioService: ServisLoginResgisService,
    private router: Router
  ) { }



  recuperarUSU() {
    this.userId = parseInt(String(localStorage.getItem("userId")))
    this.userName = String(localStorage.getItem("userName"))
    // alert("userID= " + this.userId)
    // this.usuarioFK.usuId = parseInt(String(localStorage.getItem("userId")));
    // this.usuarioFK.usuNombreUsuario = String(localStorage.getItem("userName"));


    this.usuarioService.obtenerUsuario(this.userId).subscribe((usuario: usuario) => {
      this.usuarioFK = usuario;
    });


  }

  recuperarPublicacion() {
    this.IdPublicacion = parseInt(String(localStorage.getItem("publicacionId")));
    this.publicacionService.getPublicacionId(this.IdPublicacion).subscribe(data => {

      this.publicacion = data;
    });
  }


  // // Convertir la cadena de texto a un objeto
  // var usuario = JSON.parse(usuarioJSON);
  public create(): void {

    this.productoOfertaService.create(this.productoOferta).subscribe(productoOfertaNew => {
      // alert("PRODUCTO OFER= " + productoOfertaNew.poNombre)
      this.oferta.poIdOferta = productoOfertaNew;
      this.oferta.ofeEstado = false;
      alert("publicacion= "+this.IdPublicacion)
      this.oferta.ofeIdOfertante = this.userId;
      this.oferta.ofePubId = this.IdPublicacion;


      this.ofertaService.create(this.oferta).subscribe(ofertaNew => {
        this.router.navigate(['/vertrueque'])
        // alert("OFERTA= " + ofertaNew.ofeEstado)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Oferta enviada con exito`,
          showConfirmButton: false,
          timer: 1500
        })
        
      })
    })
  }





















  createFile(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);

      this.productoOferta.poFoto = file.name;

      console.log(this.productoOferta.poFoto);

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
