import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trueque } from '../modelo/trueque';
import { Oferta } from '../modelo/oferta';
import { TruequeService } from '../service/trueque.service';
import { usuario } from '../modelo/usuario';
import { ServisLoginResgisService } from '../service/servisLoginResgis.service';
import { PublicacionService } from '../service/publicacion.service';
import { Publicacion } from '../modelo/publicacion';

@Component({
  selector: 'app-facturatrueque',
  templateUrl: './facturatrueque.component.html',
  styleUrls: ['./facturatrueque.component.css']
})
export class FacturatruequeComponent implements OnInit {


  public trueque: Trueque = new Trueque();

  public oferta: Oferta = new Oferta();


  public usuario: usuario = new usuario();

  public publicacion: Publicacion = new Publicacion();

  ngOnInit(): void {
    this.cargarTreke()
  }

  constructor(private activatedRoute: ActivatedRoute,
    private truequeService:TruequeService,
    private publicaiconService:PublicacionService,
    private usuarioService:ServisLoginResgisService
  ) { }

  imprimir() {
    window.print();
  }


  cargarTreke(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      this.truequeService.getTruekeId(id).subscribe(consulta=>{
        this.trueque=consulta;
        this.oferta=consulta.truIdOferta;
        this.usuarioService.obtenerUsuario(this.oferta.ofeIdOfertante).subscribe(ofertante=>{
          this.usuario=ofertante;

          this.publicaiconService.getPublicacionId(this.oferta.ofePubId).subscribe(pub=>{
            this.publicacion=pub
          })
        })
        // this.usuario=;
      })



      // if (id) {
      //   this.publicacionService.getPublicacionId(id).subscribe((publicacion) => {
      //     this.publicacionNew = publicacion,
      //       this.producto = this.publicacionNew.pubIdProducto
      //     this.cargarFotos(this.producto.fileName);
      //   })
      // }
    })
  }
}