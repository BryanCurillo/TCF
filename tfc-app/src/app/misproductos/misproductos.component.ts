import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../modelo/categoria';
import { TruequeService } from '../service/trueque.service';
import { Trueque } from '../modelo/trueque';
import { Oferta } from '../modelo/oferta';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Venta } from '../modelo/venta';
import { usuario } from '../modelo/usuario';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent {

  constructor(private publicacionService: PublicacionService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private TruequeService: TruequeService) { }

  ngOnInit(): void {
    this.cargarPublicaciones()

  }

  public publicacion: Publicacion = new Publicacion();
  public producto: Producto = new Producto();
  publicaciones: Publicacion[] = [];
  categorias: Categoria[] = [];
  idUsu: number = parseInt(String(localStorage.getItem("userId")));
  trueques: Trueque[] = [];
  ventas: Venta[] = [];
  trueque: Trueque;
  Oferta: Oferta;
  Venta: Venta;
 public usuario: usuario = new usuario();


  cargarPublicaciones(): void {
    this.cargarCategorias();
    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => {
        this.publicaciones = publicaciones
      }

    );
  }

  cargarCategorias(): void {

    this.categoriaService.getCate(true).subscribe(
      categorias => { this.categorias = categorias }
    );
  }

  eliminarPublicacion(publicacion: Publicacion): void {

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
    })
  }

  generarReporteVenta() {

    const doc = new jsPDF({
      orientation:'portrait',
      unit: 'px',
      format:'letter'
    });
  
    // Encabezado
    const direccionEmpresa = 'REGISTRO DE PRODUCTOS';
    doc.text(direccionEmpresa, doc.internal.pageSize.width/2,25,{align:'center'} );

    autoTable(doc, {
      head: [['ID DE PUBLICACION', 'PRODUCTO','DESCRIPCION DEL PRODUCTO','PRECIO DEL PRODUCTO','TIPO DE COMERCIO']],
      body: this.publicaciones.map((row) => [row.pubId, row.pubIdProducto.prodNombre, row.pubIdProducto.prodDescripcion, row.pubIdProducto.prodPrecio,row.pubTipo]),
    });
    // Pie 
    const administrador = 'Truekshop || Cuenca, Ecuador';
    const textDimensions = doc.getTextDimensions(administrador);
    doc.text(administrador, doc.internal.pageSize.width - textDimensions.w - 14, doc.internal.pageSize.height - 10);
    
    
    doc.output('dataurlnewwindow');
    doc.save('productos.pdf');
  }

}






