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
  selector: 'app-principaltrueque',
  templateUrl: './principaltrueque.component.html',
  styleUrls: ['./principaltrueque.component.css']
})
export class PrincipaltruequeComponent implements OnInit {

  seleccionados: Categoria = new Categoria;
  public publicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[] = [];
  producto: Producto = new Producto;
  public imageSrc: string = '';
  fileModels: FileModel[];
  idProducto: number = 0;
  categorias: Categoria[] = [];

  constructor(private publicacionService: PublicacionService,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private uploadFileService: UploadFilesService,
    private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.cargarPublicaciones()
    this.cargarFotos()
    this.cargarCategorias()

  }

  public cargarFotos() {
    this.uploadFileService.getFiles().subscribe(files => {
      this.fileModels = files
    }
    );
  }

  cargarPublicaciones(): void {
    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => {
        this.publicaciones = publicaciones
      }
    );

  }
  verProducto(id: number) {
    localStorage.setItem("publicacionId", id.toString());
    this.router.navigate(["vertrueque"]);
  }

  public cargarCategorias(): void {

    let categoriaSELEC: Categoria = new Categoria()
    categoriaSELEC.catId = 0;
    categoriaSELEC.catNombre = 'Seleccione una categoria';
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

