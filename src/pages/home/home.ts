import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  takeScreenshot(event) {
    // Call the Cordova plugin SDK methods

  }
  
}
