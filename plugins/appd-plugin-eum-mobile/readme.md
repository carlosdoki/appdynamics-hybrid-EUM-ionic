# AppDynamic Cordova Plugin

This AppDynamics plugin installs both EUM mobile and RUM browser monitoring in Cordova based applications. EUM mobile monitoring tracks activities in native Android & iOS layer while the RUM browser monitoring tracks activities in the base Cordova WebView.

The plugin provides an JavaScript API allowing configuration and customizaiton of events to be monitored. This includes APIs to instrument specific methods in your own code, to measure durations of operations in your application (like application start up, for example), or to report an arbitrary metric. The SDK also provides a facility to track any application crashes that occur.

The plugin will automatically detect and instrument HTTP requests originating from both native network activity as well as those internal to embedded WebViews.

### Supported Platforms

* `Cordova` version 7.0 and up

### Installation for Ionic platform

```
ionic cordova plugin add appd-plugin-eum-mobile --save
```

### More Info

[JSDocs](https://docs.appdynamics.com/javadocs/cordova-plugin/4.5/latest/)

Copyright (c) AppDynamics, Inc. 2018 CA. All rights reserved.

