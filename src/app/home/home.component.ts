import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {HttpClient, HttpClientModule} from'@angular/common/http'
import { Observable } from 'rxjs';
import { CelicePipe } from '../celice.pipe';
import { FormArray, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule,CelicePipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featureWeather:any[]=[]
  temp:any[]=[]
  dayTemp:any[]=[]
  iconDay:string=''
  iconTomorrow:string=''
  iconAfterTomorrow:string=''
  location:any=''
  city:any
  lat:any
  lon:any

apiKey:string='3870051225bce03cfe901c4743a06cc9'
dateDay:any
constructor(private _HttpClient:HttpClient){}
ngOnInit(): void {
  this.dateDay=new Date()
  this.city=document.querySelector('#search')
  this.searchLocation("شبين الكوم").subscribe({
    next:(response)=>{
      console.log(response[0].lat);
          this.lat=response[0].lat
          this.lon=response[0].lon
          this.allWeather()
        },error:()=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "make sure to connect to the internet or write the country name correctly",
          });
        }
  })
  this.allWeather

}

getLocation(){
  this.searchLocation(this.city.value)
  this.searchLocation(this.city.value).subscribe({
    next:(response)=>{
      console.log(response[0].lat);
          this.lat=response[0].lat
          this.lon=response[0].lon
          this.allWeather()
        },error:()=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "make sure to connect to the internet or write the country name correctly",
          });
        }
      })

}
allWeather(){
  this.searchWeather().subscribe({
    next:(response)=>{
      this.featureWeather=response.list
      this.Temp()


    },error:()=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "make sure to connect to the internet or write the country name correctly",
      });
    }
  })
  this.currentTemp().subscribe({
    next:(response)=>{
      console.log(response);


      this.dayTemp=new Array(response)
      this.iconDay=`../../assets/${response.weather[0].icon}@2x.png`

    },error:()=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "make sure to connect to the internet or write the country name correctly",
      });
    }
  })

}
searchLocation(qCity:string):Observable<any>{
  return this._HttpClient.get(`https://api.openweathermap.org/geo/1.0/direct?q=${qCity}&limit=1&appid=${this.apiKey}`)
}
searchWeather():Observable<any>{
  return this._HttpClient.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`)
}
currentTemp():Observable<any>{
  return this._HttpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`)
}
Temp(){
  for( let i=8;i<17;i+=8){
    this.temp.unshift(this.featureWeather[i])
}
this.iconTomorrow=`../../assets/${this.temp[0].weather[0].icon}@2x.png`
this.iconAfterTomorrow=`../../assets/${this.temp[1].weather[0].icon}@2x.png`
}


}
