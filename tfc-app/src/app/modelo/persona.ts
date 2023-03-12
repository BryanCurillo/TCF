export class persona {

    perId:number = 0;
    perApellido:string = "";
    perCedula:string = "";
    perCorreo:string = "";
    perDireccion:string = "";
    perNombre:string = "";
    perSexo:string = "";
    perTelefono:string = "";

    
  constructor(per_id?: number, per_apellido?: string, per_cedula?: string, per_correo?: string, per_direccion?: string, per_nombre?: string, per_sexo?: string, per_telefono?: string) {
    this.perId = per_id ||0;
    this.perApellido = per_apellido ||'';
    this.perCedula = per_cedula ||'';
    this.perCorreo = per_correo ||'';
    this.perDireccion = per_direccion ||'';
    this.perNombre = per_nombre ||'';
    this.perSexo = per_sexo ||'';
    this.perTelefono = per_telefono ||'';
  }

}
