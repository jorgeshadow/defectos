import { Data } from "@angular/router";

export class DatosArticulo { 
    constructor(){ 
        this.serie='';
        this.planta='';
        this.parte='';
        this.model='';
        this.desc=''; 
        this.comp='';
        this.bl='';
        this.contenedor=''; 

    } 
    serie:string; 
    planta: string;
    model: string
    parte:string 
    desc: string
    comp: string
    contenedor:string 
    bl: string
    fh_impresion!: Date; 
    fh_inspecion!: Date; 
    fh_empacado!: Date;
    fh_embarcado!: Date;
}