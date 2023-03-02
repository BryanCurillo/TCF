export class usuario {

    usu_id:number;
    usu_contrasena:string;
    usu_nombre_usuario:string;
    usu_id_rol:number;
    usu_per_idFk:number;

    //los simbolos ? || sirve para crear objatos tipo usuario con 0 o varios atributos
    //para que no salga
    constructor(usu_id?: number, usu_contrasena?: string, usu_nombre_usuario?: string, usu_id_rol?: number, usu_per_idfk?: number) {
        this.usu_id = usu_id || 0;
        this.usu_contrasena = usu_contrasena ||'';
        this.usu_nombre_usuario = usu_nombre_usuario ||'';
        this.usu_id_rol = usu_id_rol || 0;
        this.usu_per_idFk = usu_per_idfk ||0;
    }

 
}