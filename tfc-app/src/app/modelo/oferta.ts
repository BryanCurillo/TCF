import { ProductoOferta } from "./productoOferta";
import { Publicacion } from "./publicacion";
import { usuario } from "./usuario";

export class Oferta{
    poIdOferta: ProductoOferta;
	ofeEstado: boolean;
	ofeId: number=0;
	ofeIdOfertante: usuario;
	poIdPublicacion: number=0; 
}