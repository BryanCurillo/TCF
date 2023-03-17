import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trueque } from '../modelo/trueque';
import { Oferta } from '../modelo/oferta';
import { TruequeService } from '../service/trueque.service';
import { usuario } from '../modelo/usuario';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';
import { PublicacionService } from '../service/publicacion.service';
import { Publicacion } from '../modelo/publicacion';
import { ProductoOferta } from '../modelo/productoOferta';
import { UploadFilesService } from '../service/upload-files.service';
import { FileModel } from '../modelo/fileModel';

@Component({
  selector: 'app-facturatrueque',
  templateUrl: './facturatrueque.component.html',
  styleUrls: ['./facturatrueque.component.css']
})
export class FacturatruequeComponent implements OnInit {

  fileModels: FileModel[];


  public trueque: Trueque = new Trueque();

  public imageOfer: string = '';

  public imageProd: string = '';

  public oferta: Oferta = new Oferta();


  public usuario: usuario = new usuario();

  public publicacion: Publicacion = new Publicacion();

  public productoOferta: ProductoOferta = new ProductoOferta();

  ngOnInit(): void {
    this.cargarTreke()
  }

  constructor(private activatedRoute: ActivatedRoute,
    private truequeService:TruequeService,
    private publicaiconService:PublicacionService,
    private usuarioService:ServisLoginResgisService,
    private uploadFileService: UploadFilesService,
    private router: Router

  ) { }

  imprimir() {
    window.print();
    this.router.navigate(['/vertrueque'])

  }


  cargarTreke(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      this.truequeService.getTruekeId(id).subscribe(consulta=>{
        this.trueque=consulta;
        this.oferta=consulta.truIdOferta;
        this.productoOferta=this.oferta.poIdOferta;
        this.usuarioService.obtenerUsuario(this.oferta.ofeIdOfertante).subscribe(ofertante=>{
          this.usuario=ofertante;

          this.publicaiconService.getPublicacionId(this.oferta.ofePubId).subscribe(pub=>{
            this.publicacion=pub

            this.cargarFotos(this.productoOferta.poFoto, this.publicacion.pubIdProducto.fileName)
          })
        })
      })
    })
  }

  public cargarFotos(filename:string, filename2:string){
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files

      for (let fileModel of files) {
        if(filename===fileModel.name){
          this.imageOfer=fileModel.url
        }else{
          if(filename2===fileModel.name){
            this.imageProd=fileModel.url
          }
        }
      }
    }
    );
  }
}