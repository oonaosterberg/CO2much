import { Component, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import {GoogleService} from '../services/google.service';
declare var google: any;
//import { mapinfo.component } from "./mapinfo.component.";

//import {latjee} from "./mapinfo.component";
//import {lonjee} from "./mapinfo.component";



@Component({
  selector: 'app-native-map',
  templateUrl: './native-map.component.html',
  styleUrls: ['./native-map.component.scss']
})
export class NativeMapComponent implements OnInit {

  constructor(private googleService: GoogleService, public gMaps: GoogleMapsAPIWrapper) { }
  /*
    origin = '';  
    destination = '';  
    travelMode = '';
    TransitMode = '';
    */

    /*
    lat: number = 60.192059;
    lon: number = 24.945831;
    */


      ngOnInit() {


          console.log('native map');


   /*
      this.googleService.getMapKilometers(this.origin, this.destination).subscribe(response => {
          console.log('MITÄHÄN IHMETTÄ??: ->' response);
          this.origin= response.routes[0].bounds.b;
         console.log('TOIMI PERKELEEEE' this.origin);
          this.destination = response.routes[0].bounds.f;
          console.log('KOKO MATKA:' + this.wholeDistance);


          });
          */

      this.gMaps.getNativeMap().then(map => {
        console.log(map);
        setTimeout(function() {
          console.log('jottain');
          var latti = parseFloat(localStorage.getItem('lat'));
          var lonni = parseFloat(localStorage.getItem('lon'));
          var matkapituus = parseInt(localStorage.getItem('matkapituus'));
          let zoom = 10;
          console.log(latti);
         console.log(lonni);
         console.log(matkapituus);
             map.setCenter({
              lat: 	latti,
              lng: 	lonni
             });
             if (matkapituus < 15000 && matkapituus > 1500) {
               zoom = 12;
             }
             else if (matkapituus > 820000) {
               zoom = 5;
             }
             else if (matkapituus > 110000 && matkapituus < 400000) {
               zoom = 8;
             }   
              else if (matkapituus >  15000 && matkapituus < 30000) {
               zoom = 10;
             }
              else if (matkapituus < 440000 && matkapituus > 400000) {
               zoom = 6;
                }
                else if (matkapituus < 1500) {
               zoom = 15;
             }
              else if (matkapituus < 100000 && matkapituus > 30000) {
               zoom = 9;
             }
             else if (matkapituus < 15000 && matkapituus > 10000) {
               zoom = 11;
             }
            map.setZoom(zoom);
        }, 1000);

      });
  }

     

}
