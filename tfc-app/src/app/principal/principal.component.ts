import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../modelo/categoria';
import { FileModel } from '../modelo/fileModel';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { CategoriaService } from '../service/categoria.service';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { UploadFilesService } from '../service/upload-files.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  categoriaSELEC: Categoria = new Categoria()
  seleccionados: Categoria = new Categoria;
  public publicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[] = [];
  producto: Producto = new Producto;
  public imageSrc: string = '';
  fileModels: FileModel[];
  idProducto: number = 0;
  categorias: Categoria[] = [];

  public categoriaFK: Categoria = new Categoria()
  userId: number;
  userName: number;


  constructor(private publicacionService: PublicacionService,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private uploadFileService: UploadFilesService,
    private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.cargarPublicaciones()
    this.cargarFotos()
    this.cargarCategorias()
    this.recuperarUSU()

  }

  recuperarUSU() {
    this.userId = parseInt(String(localStorage.getItem("userId")))
    this.userName = parseInt(String(localStorage.getItem("userName")))
    // alert("user= "+this.userId)
  }

  public cargarFotos() {
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files
    }
    );
  }

  cargarPublicaciones(): void {
    this.categoriaFK.catNombre = this.seleccionados.catNombre;

    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categoriaFK.catNombre === this.categorias[i].catNombre) {
        this.categoriaFK.catId = this.categorias[i].catId;
        // alert(this.categoriaFK.catId)
      }
      {
        if (this.categoriaSELEC.catNombre === this.categorias[i].catNombre) {
          this.categoriaFK.catId = this.categorias[i].catId;
          // alert(this.categoriaFK.catId)
        }
      }
    }
    //FILTRO
    if (this.categoriaFK.catId > 0) {
      
      this.publicacionService.getPublicaciones().subscribe(
        publicaciones => {
          this.publicaciones.length=0;;
          // alert("2= "+this.publicaciones.length)
          for (let publicacion of publicaciones) {
            if (publicacion.pubIdProducto.prodIdCategoria === this.categoriaFK.catId) {
              this.publicaciones.push(publicacion)
            }
          }
          // this.publicaciones = publicaciones
        }
      );
    } else {
      this.publicacionService.getPublicaciones().subscribe(
        publicaciones => {
          this.publicaciones = publicaciones
        }
      );
    }


  }


  verProducto(id: number) {
    localStorage.setItem("productoId", id.toString());
    this.router.navigate(["verproducto"]);
  }

  // verProducto(publicacion: Publicacion) {
  //   var productoJSON = JSON.stringify(publicacion);
  //   localStorage.setItem("producto", productoJSON);
  //   // localStorage.setItem("productoId", id.toString());
  //   this.router.navigate(["verproducto"]);
  // }

  public cargarCategorias(): void {

    let categoriaSELEC: Categoria = new Categoria()
    categoriaSELEC.catId = 0;
    categoriaSELEC.catNombre = 'TODOS';

    this.categorias.push(categoriaSELEC);

    this.categoriaService.getCate(true).subscribe(
      categorias => {
        for (let categoria of categorias) {
          this.categorias.push(categoria)
        }
      }
    );
  }




}
