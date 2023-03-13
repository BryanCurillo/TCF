import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/modelo/publicacion';
import { PublicacionService } from 'src/app/service/publicacion.service';

@Component({
  selector: 'app-adproductos',
  templateUrl: './adproductos.component.html',
  styleUrls: ['./adproductos.component.css']
})
export class AdproductosComponent implements OnInit{
  constructor(private publicacionService: PublicacionService) { }

  publicaciones: Publicacion[]| undefined;

  ngOnInit(): void {
        this.cargarPublicaciones();
  }

  cargarPublicaciones():void{
    this.publicacionService.getPublicaciones().subscribe(
      publicaciones =>{this.publicaciones = publicaciones} 
      );
  }

}
