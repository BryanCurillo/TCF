import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileModel } from '../modelo/fileModel';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { usuario } from '../modelo/usuario';
import { Venta } from '../modelo/venta';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';
import { UploadFilesService } from '../service/upload-files.service';
import { VentaService } from '../service/venta.service';
import { VerproductoService } from './verproducto.service';




@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {

  userId: number;
  userName: string;
  fileModels: FileModel[];
  ventaId: number;
  usuarioFK:usuario;
  public imageSrc: string = '';
  public ventaNew: Venta = new Venta();


  constructor(private verproductoserv: VerproductoService,
    private ventaService: VentaService,
    private router: Router,
    private usuarioService: ServisLoginResgisService,
    private uploadFileService: UploadFilesService) { }


  publicacion: Publicacion | undefined;

  IdProducto: String = "";

  ngOnInit(): void {
    this.recuperarId();
    this.recuperarUSU();
    this.cargarPublicacion(Number(this.IdProducto));
  }

  recuperarUSU() {
    this.userId = parseInt(String(localStorage.getItem("userId")))
    this.userName = String(localStorage.getItem("userName"))
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
  

  generarVenta(publicacion:Publicacion):void{
    if(publicacion.pubIdVendedor!=this.userId){
      this.ventaNew.venIdPublicacion=publicacion.pubId;
      // this.usuarioService.obtenerUsuario(this.userId).subscribe((usuario: usuario) => {
        // this.usuarioFK = usuario;
        this.ventaNew.venIdComprador=this.userId;
        this.ventaService.create(this.ventaNew).subscribe(venta=>{
          this.ventaId=venta.venId;
          alert("VENTA EXITOSA  ")
            // this.router.navigate([`/facTueque/${venta.venId}`])
       
        })
      // });
     
      
    }
  }

  obtenerUsuario(){

  }

}



