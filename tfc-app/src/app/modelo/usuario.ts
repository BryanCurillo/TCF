export class usuario {

    UsuId:number;
    UsuContraUsuario:string;
    UsuNombreUsuario:string;
    UsuCalificacion:string;
    UsuIdRol:number;
    UsuPerCedula:number;

    //los simbolos ? || sirve para crear objatos tipo usuario con 0 o varios atributos
    //para que no salga
    constructor(usu_id?: number, usu_contrasena?: string, usu_nombre_usuario?: string, usu_id_rol?: number, usu_per_idfk?: number) {
        this.UsuId = usu_id || 0;
        this.UsuContraUsuario = usu_contrasena ||'';
        this.UsuNombreUsuario = usu_nombre_usuario ||'';
        this.UsuIdRol = usu_id_rol || 0;
        this.UsuPerCedula = usu_per_idfk ||0;
    }

 
}