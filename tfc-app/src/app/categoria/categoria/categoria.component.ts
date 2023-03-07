import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelo/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoriaC: Categoria[] = [];

  constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void {
    
  }


  // cargarCategorias():void{
  //   this.categoriaService.getCategorias().subscribe(categoria=> this.categoria=categoria);
  // }

}
