import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileModel } from '../modelo/fileModel';
import { Publicacion } from '../modelo/publicacion';
import { usuario } from '../modelo/usuario';
import { Venta } from '../modelo/venta';
import { PublicacionService } from '../service/publicacion.service';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';
import { UploadFilesService } from '../service/upload-files.service';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  fileModels: FileModel[];

  public imageSrc: string = '';

  public comprador: usuario = new usuario();

  public vendedor: usuario = new usuario();

  public publicacion: Publicacion = new Publicacion();

  public venta: Venta = new Venta();

  ngOnInit(): void {
    this.cargarVenta()
  }

  constructor(private activatedRoute: ActivatedRoute,
    private ventaService: VentaService,
    private publicaiconService: PublicacionService,
    private usuarioService: ServisLoginResgisService,
    private uploadFileService: UploadFilesService,
    private router: Router
  ) { }

  imprimir() {
    window.print();
    this.router.navigate(['/verproducto'])

  }


  cargarVenta(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      this.ventaService.getVentaId(id).subscribe(consulta => {
        this.venta = consulta
        this.usuarioService.obtenerUsuario(this.venta.venIdComprador).subscribe(comprador => {
          this.comprador = comprador;

          this.publicaiconService.getPublicacionId(this.venta.venIdPublicacion).subscribe(pub => {
            this.publicacion = pub

            this.usuarioService.obtenerUsuario(this.publicacion.pubIdVendedor).subscribe(venderor => {

              this.vendedor=venderor

              this.cargarFotos(this.publicacion.pubIdProducto.fileName, this.publicacion.pubIdProducto.fileName)
            })
          })
        })
      })
    })
  }

  public cargarFotos(filename: string, filename2: string) {
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files

      for (let fileModel of files) {
        if (filename === fileModel.name) {
          this.imageSrc = fileModel.url
        }
      }
    }
    );
  }
}
