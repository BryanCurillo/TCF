import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor(private activatedRoute: ActivatedRoute,
  ) { }

  imprimir() {
    window.print();
  }


  cargarTreke(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']



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
