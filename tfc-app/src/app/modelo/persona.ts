export class persona {

    per_id:number;
    per_apellido:string;
    per_cedula:string;
    per_correo:string;
    per_direccion:string;
    per_nombre:string;
    per_sexo:string;
    per_telefono:string;

    
  constructor(per_id: number, per_apellido: string, per_cedula: string, per_correo: string, per_direccion: string, per_nombre: string, per_sexo: string, per_telefono: string) {
    this.per_id = per_id;
    this.per_apellido = per_apellido;
    this.per_cedula = per_cedula;
    this.per_correo = per_correo;
    this.per_direccion = per_direccion;
    this.per_nombre = per_nombre;
    this.per_sexo = per_sexo;
    this.per_telefono = per_telefono;
  }

}
