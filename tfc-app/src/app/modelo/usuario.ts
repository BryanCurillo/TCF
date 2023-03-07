export class usuario {

    usuId:number;
    usuContraUsuario:string;
    usuNombreUsuario:string;
    usuCalificacion:number;
    usuIdRol:number;
    usuPerCedula:number;

    //los simbolos ? || sirve para crear objatos tipo usuario con 0 o varios atributos
    //para que no salga
    constructor(usu_id?: number, usu_contrasena?: string, usu_nombre_usuario?: string, usu_id_rol?: number, usu_per_idfk?: number, usu_calificacion?: number) {
        this.usuId = usu_id || 0;
        this.usuContraUsuario = usu_contrasena ||'';
        this.usuNombreUsuario = usu_nombre_usuario ||'';
        this.usuIdRol = usu_id_rol || 0;
        this.usuPerCedula = usu_per_idfk ||0;
        this.usuCalificacion= usu_calificacion || 0;
    }

 
}