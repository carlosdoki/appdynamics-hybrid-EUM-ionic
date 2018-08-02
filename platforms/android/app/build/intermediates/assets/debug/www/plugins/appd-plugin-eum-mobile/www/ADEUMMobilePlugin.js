cordova.define("appd-plugin-eum-mobile.ADEUMMobilePlugin", function(require, exports, module) {
//
//  Copyright (c) 2018 AppDynamics Technologies. All rights reserved.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = 'ADEUMMobilePlugin';

/**
 * ADEUMMobilePlugin class.
 * @class
 */
function ADEUMMobilePlugin(){

}

 /**
  * Returns plugin version.
  * @param {function} success user defined success callback
  * @param {function} error user defined error callback
  * @returns {string}
  */
  ADEUMMobilePlugin.prototype.getVersion = function(success, error) {
    console.log("inside js getVersion");
    exec(success, error, PLUGIN_NAME, 'getVersion', []);
  };

  ADEUMMobilePlugin.prototype.initWithAppKey = function(appKey, success, error) {
    exec(success, error, PLUGIN_NAME, 'initWithKey', [appKey]);
  };

  /**
   * Initializes the agent and starts instrumentation.
   * @param {string} configuration settings in json format
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.initWithConfiguration = function(config, success, error) {
    exec(success, error, PLUGIN_NAME, 'initWithConfiguration', [config]);
  };

  /**
   * Change the App Key associated with the agent.
   * @param {string} appKey
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.changeAppKey = function(appKey, success, error) {
    exec(success, error, PLUGIN_NAME, 'changeAppKey', [appKey]);
  };

  /**
   * Starts named timer.
   * Allowed characters are [A-Za-z\s0-9].
   * Illegal characters shall be replaced by their ASCII hex value.
   *
   * @param {string} name
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.startTimerWithName = function(name, success, error) {
    exec(success, error, PLUGIN_NAME, 'startTimerWithName', [name]);
  };

  /**
   * Stops named timer.
   * @param {string} name
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.stopTimerWithName = function(name, success, error) {
    exec(success, error, PLUGIN_NAME, 'stopTimerWithName', [name]);
  };

  /**
   * Report a metric with name and value.
   * Allowed characters are [A-Za-z\s0-9].
   * Illegal characters shall be replaced by their ASCII hex value.
   *
   * @param {string} name
   * @param {number} value  if value is not a whole number an error will be returned.
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.reportMetricWithName = function(name, value, success, error) {
    exec(success, error, PLUGIN_NAME, 'reportMetricWithName', [name, value]);
  };

  /**
   * Leaves a breadcrumb that will appear in a crash report.
   * Each crash report displays the most recent 99 breadcrumbs.
   * @param {string} breadcrumb The string to include in the crash report and sessions.
   * Truncated at 2048 characters and empty values are ignored.
   * @param {number} mode 0 - for crashes only or 1 - for crashes and sessions. Defaults to
   * crashes if mode is not parseable.
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.leaveBreadcrumb = function(breadcrumb, mode, success, error) {
    exec(success, error, PLUGIN_NAME, 'leaveBreadcrumb', [breadcrumb, mode]);
  };

  /**
   * Send custom name, value pair.
   * @param {string} key
   * @param {string} value
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.setUserData = function(key, value, success, error) {
    exec(success, error, PLUGIN_NAME, 'setUserData', [key, value]);
  };

  /**
   * Removes user data set using {@link setUserData}.
   * @param {string} key
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.removeUserData = function(key, success, error) {
    exec(success, error, PLUGIN_NAME, 'removeUserData', [key]);
  };

  /**
   * Asynchronously takes a screenshot of the current Activity's window.
   *
   * If screenshots are disabled through configuration
   * or through the controller UI, this method does nothing.
   *
   * This will capture everything, including personal information, so you must be cautious of
   * when to take the screenshot.
   *
   * These screenshots will show up in the Sessions screen for this user.
   *
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   */
  ADEUMMobilePlugin.prototype.takeScreenshot = function(success, error) {
    exec(success, error, PLUGIN_NAME, 'takeScreenshot', []);
  };

  /**
   * Reports that an info point has started
   * @param {string} name module or file name
   * @param {string} functionName
   * @param {string} args a string representation of the arguments
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   * @returns {object} tracker object that can be used to report end of info point
   */
  ADEUMMobilePlugin.prototype.beginCall = function(name, functionName, args, success, error) {
    exec(function( key) { success(new CallTracker(key)); }, error, PLUGIN_NAME,
         'beginCall', [name, functionName, args]);
  };

  /**
   * Begins tracking an HTTP request
   * @param {string} url The URL being requested
   * @param {function} success user defined success callback
   * @param {function} error user defined error callback
   * @returns {object} tracker object that can be used to report request and response
   *    information as it becomes available.
   */
  ADEUMMobilePlugin.prototype.beginHttpRequest = function(url, success, error) {
    exec(function( key) { success(new HttpRequestTracker(key)); }, error, PLUGIN_NAME,
         'beginHttpRequest', [url]);
  };

  function CallTracker (key) {
      this.key = key;

      this.reportCallEnded = function (sr, er) {
          exec(sr, er, PLUGIN_NAME, 'endCall', [this.key]);
      };

      this.reportCallEndedWithReturnValue = function (returnValue, sr, er) {
          exec(sr, er, PLUGIN_NAME, 'endCall', [this.key, returnValue]);
      };
  };

  function HttpRequestTracker (key) {
    this.key = key;

    this.withURL = function (url, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withURL', [this.key, url]);
    };

    this.withResponseCode = function (status, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withResponseCode', [this.key, status]);
    };

    this.withResponseContentLength = function (contetLength, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withResponseContentLength', [this.key, contetLength]);
    };

    this.withRequestContentLength = function (contentLength, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withRequestContentLength', [this.key, contentLength]);
    };

    this.withErrorMessage = function (error, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withErrorMessage', [this.key, error]);
    };

    this.withRequestHeaderFields = function (headerJson, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withRequestHeaderFields', [this.key, headerJson]);
    };

    this.withResponseHeaderFields = function (headerJson, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withResponseHeaderFields', [this.key, headerJson]);
    };

    this.withInstrumentationSource = function (source, sr, er) {
        exec(sr, er, PLUGIN_NAME, 'withInstrumentationSource', [this.key, source]);
    };

    this.reportDone = function (sr, er) {
        exec(sr, er, PLUGIN_NAME, 'reportDone', [this.key]);
    };
  };
  /**
   * For internal testing only.
   */
  ADEUMMobilePlugin.prototype.crash = function(success, error) {
    exec(success, error, PLUGIN_NAME, 'crash', []);
  };

  ADEUMMobilePlugin.prototype.flush = function(success, error) {
    exec(success, error, PLUGIN_NAME, 'flush', []);
  };

ADEUMMobilePlugin.install = function()
{
  if(!window.plugins) {
     window.plugins = {};
  }

  window.plugins.ADEUMMobilePlugin = new ADEUMMobilePlugin();
  return window.plugins.ADEUMMobilePlugin;
}

cordova.addConstructor(ADEUMMobilePlugin.install);

});
