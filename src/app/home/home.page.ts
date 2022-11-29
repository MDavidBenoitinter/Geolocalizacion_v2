import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitude:any;
  longitude:any;
  error :any;
  count : number = 0;
  global:any;
  data:any=[];
  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.locate();
  }

  locate(){
    this.latitude= 0;
    this.longitude = 0;
    this.error = ''
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log("resp: ",resp);
      // this.latitude= resp.coords.latitude
      // this.longitude= resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
       this.error = error
     });

     this.tracker();
  }

  tracker(){
    let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      console.log(data)
      this.latitude= 0;
      this.longitude = 0;
      this.error = ''
      // data can be a set of coordinates, or an error (if an error occurred).
      this.latitude=data.coords.latitude
      this.longitude= data.coords.longitude
      });
  }

}
