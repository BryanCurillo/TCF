import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html',
  styleUrls: ['./trueque.component.css']
})
export class TruequeComponent implements OnInit{

  ngOnInit(): void {
    
  }

  mostrarnumero(){


    Swal.fire('Contacto del Vendedor','0981101464','success');

  }

}
