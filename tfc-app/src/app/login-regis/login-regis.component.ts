import { Component, ElementRef, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['css/login-regis.component.css']
})
export class LoginRegisComponent {

  constructor(private router:Router){}

  /* sirve para poner las animaciones  */
  /* en el html hay que agregar un #idname */
  /* posdata en el tsconfig.json se desactiva el requerimiento para obligar a definir las variables  */
  @ViewChild('signUpBtn') signUpBtn: ElementRef;
  @ViewChild('signInBtn') signInBtn: ElementRef;
  @ViewChild('container') container: ElementRef;

  ngAfterViewInit() {
  
    this.signUpBtn.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add('sign-up-mode');
    });

    
    this.signInBtn.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove('sign-up-mode');
    });

  }

  registrar(){
    this.router.navigate(["registrar"]);
  }

  principal(){
    this.router.navigate(["principal"]);
  }
}
