import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { EnvioModel } from '../models/envio.model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  url = 'https://qaservices.ligamayor.com.mx/';
  constructor(private http:HttpClient) { }
  getDefectosR():any{
    try {
      return this.http.get(this.url+`nhk/muestra.php`).
      pipe(map((data:any)=>{
        return data
      }))
    } catch (error) {
      console.log(error)
    }
  }
 getdefectos():any{
  try {
    return this.http.get(this.url+`nhk/defectos.php`).
    pipe(map((data:any)=>{
      return data
    }))
  } catch (error) {
    console.log(error)
  }
}
getarticlebyserie(id:any):any{
  try {
   return this.http.get(this.url + `nhk/serie.php?serie=${id}`)
   .pipe(map((data:any)=>{
     return data
   }))
  } catch (error) {
    alert('no se encontro ningun registro')
  }
}
guardarDefecto (em:EnvioModel):any{
  try {
   return this.http.post(this.url + `nhk/alta_defecto2.php?Codigo=${em.Codigo}&Serie=${em.Serie}&Usuario=${em.Usuario}53628&Foto=${em.Foto}`,null)
    
  } catch (error) {
    alert('no se encontro ningun registro')
    return null
  }
} 
  
}
