'use strict'
import { Component, Input, OnInit, ViewChild } from '@angular/core'; 
import { ServiceService } from "../../services/service.service";
import { Observable } from "rxjs";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Result } from "@zxing/library";
import { ZXingScannerComponent } from '@zxing/ngx-scanner'; 
import { DatosArticulo } from './../../models/articulo.model';  
import { DatosDefectos } from "../../models/defectos.model"; 
import { EnvioModel } from './../../models/envio.model'; 
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T; 
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit{
  def:DatosDefectos[]=[]
  @ViewChild('scanner')
  scanner:ZXingScannerComponent | undefined
  hasDevices: boolean = true
  hasPermision: boolean = false
  activeform: boolean = true
  activecamaradefecto:boolean=false;
  enviarform: boolean = true
  qrResultS:string =''
  qrResult:Result | undefined 
  resultserie:any
  no=new DatosArticulo
  datospost=new EnvioModel
  foto!: File;
  availableDevices: MediaDeviceInfo[] = []; 
  currentDevice:MediaDeviceInfo | undefined  
  deviceSelected: string=''; 
  articulo=new DatosArticulo
  public scannerEnabled: boolean = true;
  public information: string = "No se  detectado información de ningún código. Acerque un código QR para escanear.";

  constructor(private sanitizer: DomSanitizer,private service:ServiceService,private router:Router) { 
    
}
async subform(){
  this.activecamaradefecto=false;
 await this.service.guardarDefecto(this.datospost).subscribe((resp:any)=>{
    if (resp.status='200') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Defecto Registrado",
        showConfirmButton: false,
        timer: 1000
      }); 
      this.hasPermision=false;
      window.location.reload()
    }
  }) 
 }


extraerBase64 = async ($event: any) => new Promise((resolve, reject):any => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader(); 
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        base: null
      });
    };

  } catch (e) {
    return null;
  }
})

recibiRespuesta(evento:any){
  this.enviarform=evento
  
}
recibipic(evento:any){
  this.foto=evento 
  this.extraerBase64(this.foto).then((imagen: any) => {
    this.datospost.Foto= imagen !=''?1:0
  })
  this.datospost.Bl=this.no.bl
  this.datospost.Comp=this.no.comp
  this.datospost.Descripcion=this.no.desc
  this.datospost.Impreso=this.no.fh_impresion
  this.datospost.Inspeccion=this.no.fh_inspecion
  this.datospost.Empacado=this.no.fh_empacado
  this.datospost.Embarcado=this.no.fh_embarcado
  this.datospost.Embarcado=this.no.fh_embarcado
  this.datospost.Modelo=this.no.model
  this.datospost.Parte=this.no.parte
  this.datospost.Planta=this.no.planta
  this.datospost.Serie=this.no.serie
 
 
}
   search(DatosArticulo:any){
    
    this.service.getarticlebyserie(this.no.serie)?.subsbcribe((resp:any)=>{
    })
   }
   enablecamera(){
   this.hasPermision=!this.hasPermision;
    
   }
   camerasFoundHandler(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }
   ngOnInit(): void { 
    
    this.service.getdefectos()?.subscribe((datosdefe:any)=>{
      this.def=datosdefe; 
    }) 
    this.scanner?.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner?.scanComplete.subscribe((result: Result) => {
      this.qrResult = result
     
    });
    this.scanner?.permissionResponse.subscribe((perm: boolean) => this.hasPermision = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.log('Devices: ', cameras);
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) { 
    this.qrResultS = resultString;
    const IndexCharacterToChange = resultString.lastIndexOf(",")
    const newStr = resultString.substring(IndexCharacterToChange+2,resultString.length) 
    this.no.serie=newStr
    this.hasPermision=!this.hasPermision;
    this.searcha()
  }
  selectdefecto(defecto:string){
    this.hasPermision=false;
    this.activecamaradefecto=true;
    this.datospost.Codigo=defecto
  }
  onDeviceSelectChange(selected: string) {
    this.displayCameras(this.availableDevices);
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || undefined;
  }
   public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... "; 

    this.information = $event;
  }
  searcha(){
    this.service.getarticlebyserie(this.no.serie)?.subscribe((resp:any)=>{ 
      if (resp.length!=0) {
        this.resultserie=resp
        this.activeform=false
        Swal.fire({
          position: "center",
          icon: "success",
          title: "serial encontrado",
          showConfirmButton: false,
          timer: 1000
        });
        this.no.planta=resp.planta 
        this.no.model=resp.model  
        this.no.parte=resp.parte  
        this.no.desc=resp.desc 
        this.no.comp=resp.comp  
        this.no.contenedor=String(resp.contenedor) 
        this.no.bl=resp.BL
        this.no.fh_impresion=resp.fh_impresion
        this.no.fh_inspecion=resp.fh_inspecion
        this.no.fh_empacado=resp.fh_empacado
        this.no.fh_embarcado=resp.fh_embarcado
        this.hasPermision=false;
      }
      else{ 
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Serial no encontrado",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })   
  }
}
