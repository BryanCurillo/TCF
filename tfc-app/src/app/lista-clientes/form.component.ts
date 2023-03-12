import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from '../modelo/persona';
import { ListaClientesComponent } from './lista-clientes.component';
import { personas } from './lista-clientes.json';
import { ListaService } from './lista.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public personas: persona = new persona()
  public titulo: string = "CREAR CLIENTE"

  constructor(private clienteService: ListaService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void {

    this.activatedRoute.params.subscribe(params => {

      let id = params['id']
      if (id) {

        this.clienteService.getPersona(id).subscribe((personas) => this.personas = personas)
      }
    })
  }




  public create(): void {

this.clienteService.create(this.personas).subscribe( Response => this.router.navigate(['/persona']))


  
  }
}
