import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileModel } from '../modelo/fileModel';
import { Oferta } from '../modelo/oferta';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { Trueque } from '../modelo/trueque';
import { OfertaService } from '../service/oferta.service';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { TruequeService } from '../service/trueque.service';
import { UploadFilesService } from '../service/upload-files.service';
import { VertruequeService } from './vertrueque.service';


@Component({
  selector: 'app-vertrueque',
  templateUrl: './vertrueque.component.html',
  styleUrls: ['./vertrueque.component.css']
})
export class VertruequeComponent implements OnInit {

  public truequeNew: Trueque = new Trueque();

  fileModels: FileModel[];
  ofertas: Oferta[];
  public imageSrc: string = '';
  userId: number;
  truekeId: number;
  
  userName: string;

  constructor(private verproductotru: VertruequeService,
    private ofertaService:OfertaService,
    private router: Router,
    private truequeService:TruequeService,
    private uploadFileService: UploadFilesService) { }


  publicacion: Publicacion | undefined;

  IdProducto: number = 0;

  ngOnInit(): void {
    this.recuperarId();
    this.recuperarUSU();
    this.cargarPublicacion(Number(this.IdProducto));
    this.cargarOfertas();
  }



  cargarPublicacion(id: number) {
    this.verproductotru.getPublicacion(id).subscribe(data => {

      this.publicacion = data;
      this.cargarFotos(this.publicacion.pubIdProducto.fileName)
      // var publicacionJSON = JSON.stringify(this.publicacion);
      // localStorage.setItem("publicacion", publicacionJSON);
    });
  }

  recuperarId() {
    this.IdProducto =parseInt( String(localStorage.getItem("publicacionId")));

  }
  recuperarUSU() {
    this.userId = parseInt(String(localStorage.getItem("userId")))
    this.userName = String(localStorage.getItem("userName"))
  }

  public cargarFotos(filename:string){
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files

      for (let fileModel of files) {
        if(filename===fileModel.name){
          this.imageSrc=fileModel.url
        }
      }
    }
    );
  }

  cargarOfertas(){
    this.ofertaService.getOfertas().subscribe(ofertas=>{
      this.ofertas=ofertas;    
    }); 
  }

  agregarOferta():void{
    if(this.publicacion?.pubIdVendedor!=this.userId){

      this.router.navigate([`/productOferta`])
    }

  }
  generatTrueke(oferta:Oferta):void{

    if(oferta.ofeIdOfertante!=this.userId){
      this.truequeNew.truIdOferta=oferta;

      this.truequeService.create(this.truequeNew).subscribe(trueque=>{
        this.truekeId=trueque.truNumero;
        oferta.ofeEstado=true;
        this.ofertaService.create(oferta).subscribe((ofertaUp)=>{
  
          this.router.navigate([`/facTueque/${trueque.truNumero}`])
        })
      })
    }

  }

}