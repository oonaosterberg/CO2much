import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class GoogleService {

  proxyosoite = 'http://users.metropolia.fi/~jyriher/co2much_testi/proxy.php?url=';

   kilsaOsoite = 'https://maps.googleapis.com/maps/api/directions/json?';

    apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
    key = 'AIzaSyBXbailwqmTQL47FL9BsaLDkaViXvwpvL0';

    constructor(private http: HttpClient) {
    }

    getVehicle(lahto, loppu, transit) {
        lahto = lahto.replace(/ /g, '+');
        loppu = loppu.replace(/ /g, '+');
        return this.http.get(this.proxyosoite + encodeURIComponent(this.apiUrl+'origins='+lahto+'&destinations='+loppu+'&mode='+transit+'&key='+this.key));
   }

   getKilometers(alku, loppu, mode, tm) {
        alku = alku.replace(/ /g, '+');
        loppu = loppu.replace(/ /g, '+');
     mode = mode.toLowerCase();
     tm  = tm.toLowerCase();
     return  this.http.get(this.proxyosoite + encodeURIComponent(this.kilsaOsoite+'origin='+alku+'&destination='+loppu+'&mode=' + mode + '&transit_mode='+tm+'&key='+this.key));
   }

    getMapKilometers(alkupiste, loppupiste) {
        alkupiste = alkupiste.replace(/ /g, '+');
        loppupiste = loppupiste.replace(/ /g, '+');
     return  this.http.get(this.proxyosoite + encodeURIComponent(this.kilsaOsoite+'origin='+alkupiste+'&destination='+loppupiste+'&key='+this.key));
   }
}
