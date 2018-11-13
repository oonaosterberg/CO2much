import { Component, OnInit } from '@angular/core';
import { Reveal } from 'foundation-sites/js/foundation.reveal';
import { Foundation } from 'foundation-sites/js/foundation.core';

Foundation.addToJquery($);

Foundation.plugin(Reveal, 'Reveal');

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-pageinfo',
  templateUrl: './pageinfo.component.html',
  styleUrls: ['./pageinfo.component.scss']
})
export class PageinfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  $('#aboutmap-modal').foundation();
  $('#abouthome-modal').foundation();
  $('#pageinfo-modal').foundation();
  }

}
