import {Directive, Input, Output, EventEmitter} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';

declare var google: any;




@Directive({
    selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
    @Input() origin;
    @Input() destination;
    @Input() travelMode;
    @Input() transitOption;
    @Output() private matkaUpdated: EventEmitter<string> = new EventEmitter();
    @Output() private aikaUpdated: EventEmitter<string> = new EventEmitter();

    matka: string;
    aika: string;
    select: string;



    constructor(private gmapsApi: GoogleMapsAPIWrapper) {
    }

    storageLat: any;
    storageLon: any;


    ngOnInit() {
         this.gmapsApi.getNativeMap().then(map => {
            const directionsService = new google.maps.DirectionsService();
            const directionsDisplay = new google.maps.DirectionsRenderer({
    preserveViewport: true

            
});

           let jaana = {};

            directionsDisplay.setMap(map);
            if (this.travelMode == 'TRANSIT') { 
            jaana = {
                origin: this.origin,
                destination: this.destination,
                travelMode: this.travelMode,
                transitOptions: {
                  modes: [this.transitOption]
                } 
              };
            } else {
                 jaana = {
                    origin: this.origin,
                    destination: this.destination,
                    travelMode: this.travelMode,
                  
              };
            }
          //  console.log(options);
         
            directionsService.route(jaana, (response, status) => {
                this.matka = response.routes[0].legs[0].distance.text;
                this.aika = response.routes[0].legs[0].duration.text;
                this.matkaUpdated.emit(this.matka);
                this.aikaUpdated.emit(this.aika);
                console.log(response);

                this.storageLat = ((response.routes[0].bounds.f.b) + (response.routes[0].bounds.f.f)) / 2;
                this.storageLon = ((response.routes[0].bounds.b.b) + (response.routes[0].bounds.b.f)) / 2;

             //   this.asetettu = false;


                  localStorage.setItem('lat', this.storageLat);
                  localStorage.setItem('lon', this.storageLon);

                if (status === 'OK') {

                    directionsDisplay.setDirections(response);
                    console.log('reitti päivitetty');
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        });
    }
}
