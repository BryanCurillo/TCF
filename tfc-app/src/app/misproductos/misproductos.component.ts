import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../modelo/categoria';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent {

  constructor(private publicacionService: PublicacionService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPublicaciones()

  }

  public publicacion: Publicacion = new Publicacion();
  public producto: Producto = new Producto();
  publicaciones: Publicacion[] = [];
  categorias: Categoria[] = [];
  idUsu: number = parseInt(String(localStorage.getItem("userId")));

  cargarPublicaciones(): void {
    this.cargarCategorias();
    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => { this.publicaciones = publicaciones }

    );
  }

  cargarCategorias(): void {

    this.categoriaService.getCategorias().subscribe(
      categorias => {this.categorias =categorias }
    );
  }

  

  // eliminarPublicacion(id: number): void {
    eliminarPublicacion(publicacion:Publicacion): void {

    this.activatedRoute.params.subscribe(cliente => {

      Swal.fire({
        title: `Seguro que desea eliminar su publicacion?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          alert(publicacion.pubIdProducto.prodId)
          this.productoService.deleteProducto(publicacion.pubIdProducto.prodId).subscribe()
          this.publicacionService.deletePublicacion(publicacion.pubId).subscribe(publicacion => {
            this.publicacionService.getPublicaciones().subscribe(publicaciones => this.publicaciones = publicaciones)
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Cliente eliminado exitosamente`,
              showConfirmButton: true,
              timer: 1500
            })
          })
          Swal.fire('Deleted!', '', 'success')

        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })

      // if (id) {
       
      // }
    })
  }
}




