import { Producto } from "./producto";
import { usuario } from "./usuario";

export class Publicacion {
	pubDescripcion: string = '';
	pubIdVendedor: number;
	pubIdProducto:Producto;
	pubId: number = 0;




	constructor(pubId?: number, pubIdProducto?: Producto,pubDescripcion?: string,	pubIdVendedor?: number){
		this.pubId=pubId||0;
		this.pubIdProducto=pubIdProducto||new Producto;
		this.pubDescripcion=pubDescripcion||'';
		this.pubIdVendedor=pubIdVendedor||0;
	}
}