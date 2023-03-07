import { FileHandle } from "./file-handle.model";

export class Producto{
    prodId:number=0;
    prodNombre:string='';
    prodPrecio:number=0;
    prodDescripcion:string='';
    prodIdCategoria:number=0;
    prodImages: FileHandle[]
}

