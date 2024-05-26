import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-defectos',
  templateUrl: './defectos.component.html',
  styleUrls: ['./defectos.component.scss']
})
export class DefectosComponent {
  defectos:any[]=[] 
  Defectosfields:any[]=[
    {nombre:'Serie'},
    {nombre:'Fecha_Hora'},
    {nombre:'Comp'},
    {nombre:'Descripcion'}, 
    {nombre:'Codigo'}, 
    {nombre:'Modelo'},
    {nombre:'Parte'}, 
    {nombre:'Impreso'}
  ] 
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.service.getDefectosR().subscribe((resp:any)=>{
      this.defectos=resp; 
    })
  }
}
