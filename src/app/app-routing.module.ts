import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { MapinfoComponent } from './mapinfo/mapinfo.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageinfoComponent } from './pageinfo/pageinfo.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomepageComponent },
    {path: 'map', component: MapinfoComponent },
    {path: 'info', component: PageinfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
