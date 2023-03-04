export class persona {

    PerId:number;
    PerApellido:string;
    PerCedula:string;
    PerCorreo:string;
    PerDireccion:string;
    PerNombre:string;
    PerSexo:string;
    PerTelefono:string;

    
  constructor(per_id?: number, per_apellido?: string, per_cedula?: string, per_correo?: string, per_direccion?: string, per_nombre?: string, per_sexo?: string, per_telefono?: string) {
    this.PerId = per_id ||0;
    this.PerApellido = per_apellido ||'';
    this.PerCedula = per_cedula ||'';
    this.PerCorreo = per_correo ||'';
    this.PerDireccion = per_direccion ||'';
    this.PerNombre = per_nombre ||'';
    this.PerSexo = per_sexo ||'';
    this.PerTelefono = per_telefono ||'';
  }

}
