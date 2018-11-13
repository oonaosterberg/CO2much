import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from './directions.directive';
import {MapinfoComponent} from './mapinfo/mapinfo.component';
import {NavigationbarComponent} from './navigationbar/navigationbar.component';
import { HomepageComponent } from './homepage/homepage.component';

import { PageinfoComponent } from './pageinfo/pageinfo.component';
import { GoogleService } from './services/google.service';
import {HttpClientModule} from '@angular/common/http';
import { PiippuPipe } from './pipes/piippu.pipe';
import { TopbarComponent } from './topbar/topbar.component';
import { NativeMapComponent } from './native-map/native-map.component';
import { ChangeDetectionStrategy } from '@angular/core';

@NgModule({
    declarations: [
        AppComponent,
        DirectionsMapDirective,
        MapinfoComponent,
        NavigationbarComponent,
        DirectionsMapDirective,
        HomepageComponent,
        PageinfoComponent,
        PiippuPipe,
        TopbarComponent,
        NativeMapComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBXbailwqmTQL47FL9BsaLDkaViXvwpvL0'
        }),
        AppRoutingModule,
        HttpClientModule

    ],
    providers: [GoogleService, DirectionsMapDirective, GoogleMapsAPIWrapper],
    bootstrap: [AppComponent]
})
export class AppModule { }
