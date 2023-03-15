import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public publicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[] = [];
  producto: Producto= new Producto;

  idProducto:number=0;

  constructor(private publicacionService: PublicacionService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.cargarPublicaciones()

  }

  cargarPublicaciones(): void {

    this.publicacionService.getPublicaciones().subscribe(
      publicaciones =>{this.publicaciones = publicaciones} 
      );
      

    // alert(this.publicaciones.length)

  }

  cargarProductos(id:number): Producto {

    this.activatedRoute.params.subscribe(params => {

      if (id) {
        this.productoService.getProductoId(id).subscribe((producto) => this.producto = producto)
      }
    })

    return this.producto;
  }

  verProducto(id:number){
    localStorage.setItem("productoId",id.toString());
      this.router.navigate(["verproducto/form"]);
  }
}
