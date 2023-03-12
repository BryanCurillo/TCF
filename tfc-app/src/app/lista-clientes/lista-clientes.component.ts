import { Component, OnInit } from '@angular/core';
import { usuario } from '../modelo/usuario';
import { persona } from '../modelo/persona';
import { personas } from './lista-clientes.json';
import { ListaService } from './lista.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})


export class ListaClientesComponent implements OnInit {


  personas: persona[] = [];

  constructor( private listaservice: ListaService){}

    ngOnInit(): void {

      this.listaservice.getPersonas().subscribe(
        personas => this.personas = personas

      )
      
    }
  
}
