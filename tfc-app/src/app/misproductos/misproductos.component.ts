import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent {

  constructor(private publicacionService: PublicacionService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPublicaciones()

  }






  public publicacion: Publicacion = new Publicacion();
  public producto: Producto = new Producto();
  publicaciones: Publicacion[] = [];
  idUsu: number = parseInt(String(localStorage.getItem("userId")));

  cargarPublicaciones(): void {

    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => { this.publicaciones = publicaciones }

    );


    // alert(this.publicaciones.length)

  }
}




