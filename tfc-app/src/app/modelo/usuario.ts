import { persona } from "./persona";

export class usuario {
    usuId:number;
    usuContraUsuario:string;
    usuNombreUsuario:string;
    usuCalificacion:number;
    //mando a la persona con su el mismo nombre de la base
    usuEstado:boolean;
    usuPerId:persona;
    usuPerCedula:number;

    //los simbolos ? || sirve para crear objatos tipo usuario con 0 o varios atributos
    //para que no salga
    constructor(usu_id?: number, usu_contrasena?: string,usuEstado?: boolean, usu_nombre_usuario?: string, usu_per_idfk?: number, usu_calificacion?: number,usuPerId?:persona) {
        this.usuId = usu_id || 0;
        this.usuContraUsuario = usu_contrasena ||'';
        this.usuEstado=usuEstado || false;
        this.usuNombreUsuario = usu_nombre_usuario ||'';
        this.usuPerCedula = usu_per_idfk ||0;
        this.usuCalificacion= usu_calificacion || 0;
        this.usuPerId=usuPerId||new persona;
    }

}