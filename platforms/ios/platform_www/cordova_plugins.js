cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "appd-plugin-eum-mobile.ADEUMMobilePlugin",
    "file": "plugins/appd-plugin-eum-mobile/www/ADEUMMobilePlugin.js",
    "pluginId": "appd-plugin-eum-mobile",
    "clobbers": [
      "ADEUMMobilePlugin"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/ios/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "cordova-plugin-ionic-webview.IonicWebView",
    "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
    "pluginId": "cordova-plugin-ionic-webview",
    "clobbers": [
      "Ionic.WebView"
    ]
  },
  {
    "id": "cordova-plugin-ionic-webview.ios-wkwebview-exec",
    "file": "plugins/cordova-plugin-ionic-webview/src/www/ios/ios-wkwebview-exec.js",
    "pluginId": "cordova-plugin-ionic-webview",
    "clobbers": [
      "cordova.exec"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "appd-plugin-eum-mobile": "1.0.0",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-ionic-keyboard": "2.1.2",
  "cordova-plugin-ionic-webview": "2.0.2",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});