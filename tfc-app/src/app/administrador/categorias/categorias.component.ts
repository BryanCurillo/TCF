import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelo/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { }
  //crear variables para el uso y su modificación
  modeloCategoriaHab: Categoria = new Categoria;
  modeloCategoriaDes: Categoria = new Categoria;
  modeloCategoriaEdit: Categoria = new Categoria;
  modeloCategoriaNew: Categoria = new Categoria;
  categoriasAct: Categoria[] | undefined;
  categoriasDes: Categoria[] | undefined;
  //guargar nombre a modificar de la categoria 
  nombreCatNew: String = "";
  //guardar el nombre a la categoria a crear 
  nombreCatCrear: String = "";

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    //categorias activas 
    this.categoriaService.getCate(true).subscribe(
      categorias => this.categoriasAct = categorias);
    //categorias desactivas
    this.categoriaService.getCate(false).subscribe(
      categorias => this.categoriasDes = categorias);

  }

  actualizarCat() {
    if (this.nombreCatNew != "" && this.modeloCategoriaEdit.catNombre != "") {
      this.modeloCategoriaEdit.catNombre = this.nombreCatNew;
      this.categoriaService.updateNameCat(this.modeloCategoriaEdit).subscribe(data => {

        if (data == 1) {
          Swal.fire('Administración', 'Nombre cambiado', 'success');
          setTimeout(function () {
            // Recargar la página
            location.reload();
          }, 1500);
        }
      });
    }

  }

  desabilitarCat() {
    this.modeloCategoriaHab.catEstado = false;
    if (this.modeloCategoriaHab.catNombre != "") {
      this.categoriaService.putHabDesCategorias(this.modeloCategoriaHab).subscribe(data => {

        if (data == 1) {
          Swal.fire('Administración', 'Categoria Desabilitada', 'success');
          setTimeout(function () {
            // Recargar la página
            location.reload();
          }, 1500);
        }
      });
    }

  }

  habilitarCat() {

    this.modeloCategoriaDes.catEstado = true;
    if (this.modeloCategoriaDes.catNombre != "") {
      this.categoriaService.putHabDesCategorias(this.modeloCategoriaDes).subscribe(data => {

        if (data == 1) {
          Swal.fire('Administración', 'Categoria Habilitado', 'success');
          setTimeout(function () {
            // Recargar la página
            location.reload();
          }, 1500);
        }
      });
    }
  }

  crearCat() {
    if (this.nombreCatCrear != "") {

      this.modeloCategoriaNew.catNombre = this.nombreCatCrear;
      this.modeloCategoriaNew.catEstado = true;
      this.categoriaService.crearCategoria(this.modeloCategoriaNew).subscribe(data => {

        if (data != null) {
          Swal.fire('Administración', 'Categoria Creada', 'success');
          setTimeout(function () {
            // Recargar la página
            location.reload();
          }, 1500);
        }
      });
    }
  }
}



