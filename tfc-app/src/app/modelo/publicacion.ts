import { usuario } from "./usuario";

export class Publicacion {
	pubIdProducto: number = 0;
	pubDescripcion: string = '';
	pubIdVendedor: usuario;
	pubId: number = 0;


	

	constructor(pubId?: number, pubIdProducto?: number,pubDescripcion?: string,	pubIdVendedor?: usuario){
		this.pubId=pubId||0;
		this.pubIdProducto=pubIdProducto||0;
		this.pubDescripcion=pubDescripcion||'';
		this.pubIdVendedor=pubIdVendedor||new usuario;
	}
}