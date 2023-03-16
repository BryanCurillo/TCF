export class Categoria{
    catId:number;
	catNombre:String;
    catEstado:boolean;

    constructor( id?:string, nombre?:string, estado?:boolean) {

        this.catNombre=id||"";
        this.catNombre=nombre||"";
        this.catEstado=estado||false;

    }

}