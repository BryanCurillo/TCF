import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelo/producto';
import { Categoria } from 'src/app/modelo/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import Swal from 'sweetalert2';
import { FileHandle } from '../modelo/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  public producto: Producto = new Producto();

  // producto: Producto={
  //   prodNombre: '',
  //   prodPrecio: 0,
  //   prodDescripcion: '',
  //   prodIdCategoria: 0,
  //   prodId: 0,
  //   prodImages: []
  // } 

  constructor(private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarCategorias()
  }

  public categoria: Categoria = new Categoria()

  categorias: Categoria[] = [];

  public cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias);
  }


  // public create(): void {

  //   console.log("click")
    
  //   this.productoService.create(this.producto).subscribe(producto => {

  //     this.router.navigate(['/Productos'])

  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: `Producto ${producto.prodNombre} guardado con exito`,
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   })
  // }


  public create(): void {

    const productFormData=  this.prepareFormData(this.producto);
    
    this.productoService.createPH(productFormData).subscribe(producto => {

      this.router.navigate(['/Productos'])
    },
    (error: HttpErrorResponse)=>{
        console.log(error)
    }
    );
  }

  prepareFormData(producto: Producto): FormData{
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(producto)],{type:'application/json'})
    );

    for(var i=0; i<producto.prodImages.length; i ++){
      formData.append(
        'imageFile',
        producto.prodImages[i].file,
        producto.prodImages[i].file.name
      );
    }
    return formData;
  }


  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.file[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.producto.prodImages.push(fileHandle);


    }
  }

}
