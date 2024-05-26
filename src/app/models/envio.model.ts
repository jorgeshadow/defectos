import { Timestamp, timestamp } from "rxjs";

export class EnvioModel { 
    constructor(){ 
        this.Planta='';
        this.Serie='';
        this.Codigo='';
        this.Foto=0;
        this.Modelo='';
        this.Parte='';
        this.Descripcion='';
        this.Comp='';  
        this.Bl='';
        this.Usuario='';
        this.ORIGEN='';
        this.path=''
    } 
    Fecha_Hora!: Date; 
    Planta: string;
    Serie: string;
    Codigo:string;
    Foto:number;
    Modelo:string;
    Parte:string;
    Descripcion:string;
    Comp:string;
    Impreso!: Date; 
    Inspeccion!: Date; 
    Empacado!: Date;
    Embarcado!: Date;
    Bl:string;
    Usuario:string;
    ORIGEN:string;
    path:string;
}