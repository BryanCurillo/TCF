import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelo/producto';
import { Publicacion } from '../modelo/publicacion';
import { ProductoService } from '../service/producto.service';
import { PublicacionService } from '../service/publicacion.service';
import { VerproductoService } from './verproducto.service';


@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {
  constructor(private verproductoserv: VerproductoService) { }


  publicacion: Publicacion| undefined;
  
  
  
  
  IdProducto: String="";

  ngOnInit(): void {
    this.recuperarId();

    this.cargarPublicacion(Number(this.IdProducto));
  }



  cargarPublicacion(id:number){
    this.verproductoserv.getPublicacion(id).subscribe(data=>{

      this.publicacion=data


    });
  }

  recuperarId(){
    this.IdProducto =String (localStorage.getItem("productoId"));

  }
  
}



