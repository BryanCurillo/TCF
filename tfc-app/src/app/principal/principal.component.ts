import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../modelo/publicacion';
import { PublicacionService } from '../service/publicacion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  public publicacion:Publicacion= new Publicacion();
  publicaciones:Publicacion[]=[];

  constructor(private publicacionService:PublicacionService){}
  ngOnInit(): void {
    this.cargarPublicaciones()
    
  }

  cargarPublicaciones(): void {

    this.publicacionService.getPublicaciones().subscribe(
      publicaciones => this.publicaciones = publicaciones);
      alert(this.publicaciones.length)
      
  }

}
