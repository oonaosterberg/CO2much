import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {GoogleService} from '../services/google.service';
import { Reveal } from 'foundation-sites/js/foundation.reveal';
import { Foundation } from 'foundation-sites/js/foundation.core';
import { AgmMap } from '@agm/core';
import {DirectionsMapDirective} from '../directions.directive';
import {HttpClient} from '@angular/common/http';


Foundation.addToJquery($);

Foundation.plugin(Reveal, 'Reveal');

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-mapinfo',
    templateUrl: './mapinfo.component.html',
    styleUrls: ['./mapinfo.component.scss'],
   // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapinfoComponent implements OnInit{
  


    @ViewChild('map') myMap: AgmMap;

    constructor(private googleService: GoogleService, public directionsMapDirective: DirectionsMapDirective, private http: HttpClient) {  // , private changeDetector: ChangeDetectorRef
    }


    latitude = 60.192059;
    longitude = 24.945831;
    locationChosen = false;
    mapzoom = 7;

    car: any;
    caremissions: string;

    bus: any;
    busemissions: string;

    distance = '';
    duration = '';

    rail: any;
    railemissions: any;

    train: any;
    trainemissions: any;

    subway: any;
    subwayemissions: any;

    flight: any;
    flightemissions: any;


    bposoite = 'http://impact.brighterplanet.com';


    origin = 'Matinniitynkuja 4';  // its a example aleatory position
    destination = 'Vanha Maantie 6';  // its a example aleatory position
    travelMode = '';
    vehicle = '';
    result: any;
    TransitMode = '';
    jees: any;

    routes: any;

    kilometerResult = [];

    walking: number = 0;
    busTrip: number = 0;
    trainTrip: number = 0;
    tramTrip: number = 0;
    subwayTrip: number = 0;
    carTrip: number = 0;
    

   // walkingChosen = false;
    busTripChosen = false;
    trainTripChosen = false;
    tramTripChosen = false;
    subwayTripChosen = false;
    carTripChosen = false;
    walkingChosen = false;
    walkingParts = false;
    bicycleChosen = false;


   wholeDistance: number = 0;
   walkingDistance: number = 0;
   bicycleTrip: number = 0;


   matkapituus: any;

   




    hae() {
        this.locationChosen = true;

        setTimeout(() => { 

        this.getFlight();

        }, 1000); 



          this.googleService.getKilometers(this.origin, this.destination, this.travelMode, this.TransitMode).subscribe(response => {

         const wille = response['routes'];
          this.wholeDistance = wille[0].legs[0].distance.value;
          this.matkapituus = (wille[0].legs[0].distance.value).toString();
          localStorage.setItem('matkapituus', this.matkapituus);
         // console.log('KOKO MATKA:' this.wholeDistance);

          /*
          this.storageLat = response.routes[0].bounds.northeast.lat;
          this.storageLon = response.routes[0].bounds.northeast.lng;


          localStorage.setItem('lat', this.storageLat);
          localStorage.setItem('lon', this.storageLon);
          */

          });
        
        if (this.travelMode === 'DRIVING') { 

        this.googleService.getVehicle(this.origin, this.destination, this.travelMode).subscribe(response => {
             //console.log('KATSE TÄNNE: ' response);
             const hahaa = response['rows'];
        this.result = hahaa[0].elements[0].distance.value;
        this.carTrip = this.result;
        this.getCar();
        this.carTripChosen = true;

      //   setTimeout(() => {
      //  this.getCar();
      //    }, 100);
        
           console.log('TULOS:' + this.result);
            


        });

        }

        if (this.travelMode === 'WALKING') {

            this.googleService.getKilometers(this.origin, this.destination, this.travelMode, this.TransitMode).subscribe(response => {
          //  console.log('JEE ELI: ->' response);
          const kavely = response['routes'];
            this.walkingDistance = kavely[0].legs[0].distance.value;
          //  console.log('KOKO MATKA:' this.wholeDistance);
            this.walkingChosen = true;


          });

        }

         if (this.travelMode === 'BICYCLING') {

            this.googleService.getKilometers(this.origin, this.destination, this.travelMode, this.TransitMode).subscribe(response => {
          //  console.log('JEE ELI: ->' response);
          const joujou = response['routes'];
            this.bicycleTrip = joujou[0].legs[0].distance.value;
          //  console.log('KOKO MATKA:' this.wholeDistance);
            this.bicycleChosen = true;


          });

        }
        


        if (this.travelMode == 'TRANSIT') {

       
         this.googleService.getKilometers(this.origin, this.destination, this.travelMode, this.TransitMode).subscribe(response => {
         //   console.log('JEE ELI: ->' response);
            const aurinko = response['routes'];
            this.jees = aurinko[0].legs[0].steps;
            console.log(this.jees);
            this.kilometerResult = this.jees;
          //  this.getCar();

         //    this.kilometerResult.push(this.jees);


           this.jees.forEach((mode) => {
              console.log(mode);
              if(mode.travel_mode === 'WALKING'){
                        
                   this.walking += mode.distance.value;
               //    console.log(mode.distance.value);
               this.walkingParts = true;
              
              }

              if(mode.travel_mode === 'TRANSIT' && mode.transit_details.line.vehicle.type === 'BUS'){
                        
                   this.busTrip += mode.distance.value;
                   console.log('tulos bussi' + mode.distance.value);
                   this.getBus();
                   this.busTripChosen = true;

              
              }

               if(mode.travel_mode === 'TRANSIT' && mode.transit_details.line.vehicle.type === 'COMMUTER_TRAIN'){
                        
                   this.trainTrip += mode.distance.value;
                   console.log('tulos juna' + mode.distance.value);
                   this.getTrain();
                   this.trainTripChosen = true;
              
              }

              if(mode.travel_mode === 'TRANSIT' && mode.transit_details.line.vehicle.type === 'TRAM'){
                        
                   this.tramTrip += mode.distance.value;
                   console.log('tulos raitiovaunu' + mode.distance.value);
                   this.getRail();
                   this.tramTripChosen = true;
              
              }
              
              if(mode.travel_mode === 'TRANSIT' && mode.transit_details.line.vehicle.type === 'SUBWAY'){
                        
                   this.subwayTrip += mode.distance.value;
                   console.log('tulos metro' + mode.distance.value);
                   this.getSubway();
                   this.subwayTripChosen = true;
              
               }
             
           });

            console.log('summa kävely' + this.walking);
            console.log('summa bussi' + this.busTrip);
            console.log('summa juna' + this.trainTrip);
            console.log('summa raitiovanu' + this.tramTrip);
            console.log('summa auto' + this.carTrip);


           });
        }
    }
    
     paivitaMatka(e) {
        console.log(e);

        this.distance = e;
        
     //   console.log('funktio' + this.tramTrip);
     //   console.log(this.duration);
        // e = e.replace(' km', '');
        setTimeout(() => {
            this.getCar();
            this.getBus();
            this.getRail();
            this.getTrain();
            this.getSubway();
            this.getFlight();
        }, 1000);
    }
    
    paivitaAika(evt) {
        console.log(evt);
        this.duration = evt;
    }

    //gets the emissions of automobile trip from api
 /*   getCar() {
        this.http.get(this.bposoite + '/automobile_trips.json?distance=' + this.distance).subscribe(data => {
            console.log(data);
            this.car = data;
            this.caremissions = this.car.decisions.carbon.description + ' co2';

        });
    }
    */
    // gets the emissions of bus trip from api

    resetDestination() {
      this.destination = '';
      this.locationChosen = false;

      this.walkingChosen = false;
         this.busTripChosen = false;
         this.trainTripChosen = false;
         this.tramTripChosen = false;
         this.subwayTripChosen = false;
         this.carTripChosen = false;
         this.walkingParts = false;
         this.bicycleChosen = false;

          this.walking = 0;
          this.busTrip = 0;
          this.trainTrip = 0;
          this.tramTrip = 0;
          this.subwayTrip = 0;
          this.carTrip = 0;
    }


    getCar() {
        this.http.get(this.bposoite + '/automobile_trips.json?distance=' + this.carTrip/1000).subscribe(data => {
            console.log(data);
            this.car = data;
            this.caremissions = this.car.decisions.carbon.description + ' co2';

        });
    }

    getRail() {
        this.http.get(this.bposoite + '/rail_trips.json?distance=' + this.tramTrip/1000).subscribe(data => {
            this.rail = data;
            this.railemissions = this.rail.decisions.carbon.description + ' co2';
            console.log(this.rail);
        });
    }

     getBus() {
        this.http.get(this.bposoite + '/bus_trips.json?distance=' + this.busTrip/1000).subscribe(data => {
            console.log(data);
            this.bus = data;
            this.busemissions = this.bus.decisions.carbon.description + ' co2';
        });
    }

    getTrain() {
        this.http.get(this.bposoite + '/rail_trips.json?distance=' + this.trainTrip/1000).subscribe(data => {
            this.train = data;
            this.trainemissions = this.train.decisions.carbon.description + ' co2';
          //  console.log(this.rail);
        });
    }

    getSubway() {
        this.http.get(this.bposoite + '/rail_trips.json?distance=' + this.subwayTrip/1000).subscribe(data => {
            this.subway = data;
            this.subwayemissions = this.subway.decisions.carbon.description + ' co2';
          //  console.log(this.rail);
        });
    }

     getFlight() {
        this.http.get(this.bposoite + '/flights.json?distance_estimate=' + this.wholeDistance/1000 + '&seats=200&trips=1&load_factor=1 ').subscribe(data => {
            this.flight = data;
         //   console.log('DATA' + data);
            this.flightemissions = this.flight.decisions.carbon.description + ' co2';
            console.log('LENTOPÄÄSTÖT:' + this.wholeDistance/1000)
          //  console.log(this.rail);
        });
    }

    reset() {
        this.locationChosen = false;
        this.origin = '';  // its a example aleatory position
     //   this.destination = '';  // its a example aleatory position
        this.result = '';
        this.jees = '';
      //  $('#tulokset').trigger("reset");
         this.walkingChosen = false;
         this.busTripChosen = false;
         this.trainTripChosen = false;
         this.tramTripChosen = false;
         this.subwayTripChosen = false;
         this.carTripChosen = false;
         this.walkingParts = false;
         this.bicycleChosen = false;

          this.walking = 0;
          this.busTrip = 0;
          this.trainTrip = 0;
          this.tramTrip = 0;
          this.subwayTrip = 0;
          this.carTrip = 0;
    }


    onChoseLocation(event) {
        this.latitude = event.coords.lat;
        this.longitude = event.coords.lng;
        console.log(event);
    }

    selectMode(event) {
        this.travelMode = event.target.selectedOptions[0].value;
        console.log(event.target.selectedOptions[0].value);
        // this.travelMode =

        if (this.locationChosen === true) {
           this.resetModes(event);
         }
    }

    resetModes(event) {

      this.TransitMode = event.target.selectedOptions[0].value;

          this.locationChosen = false;

          this.walking = 0;
          this.busTrip = 0;
          this.trainTrip = 0;
          this.tramTrip = 0;
          this.subwayTrip = 0;
          this.carTrip = 0;

         this.walkingChosen = false;
         this.busTripChosen = false;
         this.trainTripChosen = false;
         this.tramTripChosen = false;
         this.subwayTripChosen = false;
         this.carTripChosen = false;
         this.walkingParts = false;
         this.bicycleChosen = false;

          /*
          if(this.busTrip = 0) {
             this.busTripChosen = false;
          }
          */

    }

    selectTransitOption(event) {
        this.TransitMode = event.target.selectedOptions[0].value;
         console.log(event.target.selectedOptions[0].value);

         if (this.locationChosen === true) {
           this.resetModes(event);
         }
    }


    resetMap(){

    /*
     const mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(this.origin, this.destination);
       };
    const myMap = new google.maps.Map($("#map")[0], mapOptions);
 
  */

      
      this.myMap.triggerResize();
    }

    ngOnInit() {
       
       $('input').focus( function() {
       $('app-navigationbar').hide();
     });

    $('input').blur( function() {
        $('app-navigationbar').show();
    });

      //     this.reset();
        
     // this.changeDetector.markForCheck();
    // console.log(Foundation);
      
        $('#map-modal').foundation();

    }
 }


