import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      window.plugins.ADEUMMobilePlugin.initWithConfiguration(
        {
           "appKey": "AD-AAB-AAK-WES",
          //  "collectorUrl": "https://eum-col.appdynamics.com",
          //  "screenshotUrl": "https://eum-image.appdynamics.com",
           "collectorUrl": "https://col.eum-appdynamics.com",
           "screenshotUrl": "https://image.eum-appdynamics.com",
           "screenshots": true,
           "loggingLevel": 4 
         },
         (success) => {
          console.log("initWithConfiguration return: success");
         },
         (error) => {
          console.log("initWithConfiguration error:" + error);
         }
    );
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
