import { Producto } from "./producto";
import { usuario } from "./usuario";

export class Publicacion {
	pubDescripcion: string = '';
	pubIdVendedor: number;
	pubIdProducto:Producto;
	pubId: number = 0;
	pubTipo:string='';
	pubFecha:Date;




	constructor(pubId?: number, pubIdProducto?: Producto,pubDescripcion?: string,	pubIdVendedor?: number, pubTipo?:string,pubFecha?:Date){
		this.pubId=pubId||0;
		this.pubIdProducto=pubIdProducto||new Producto;
		this.pubDescripcion=pubDescripcion||'';
		this.pubIdVendedor=pubIdVendedor||0;
		this.pubTipo=pubTipo||'';
		this.pubFecha=pubFecha||new Date;
	}
}