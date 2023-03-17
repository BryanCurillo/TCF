import { Publicacion } from "./publicacion";
import { usuario } from "./usuario";

export class Venta{
	venIdPublicacion: Publicacion;
	venId: number=0;
	venIdComprador: usuario;
}