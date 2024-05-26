import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  articulos:any[]=[] 
data: any;
data2: any;
data3: any;
  constructor(private service:ServiceService,private router:Router) { 
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }
  this.data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
  }
  this.data3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
      }
  ]
  }
  
  }
  ngOnInit(): void {
    // this.service.getArticles()?.subscribe((resp:any)=>{
    //   this.articulos=resp;
    //   console.log(this.articulos)
    // })
  }
}
