//
//  Copyright (c) 2018 AppDynamics Technologies. All rights reserved.
//

package com.appdynamics.cordova.plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import com.appdynamics.eumagent.runtime.Instrumentation;
import com.appdynamics.eumagent.runtime.AgentConfiguration;
import com.appdynamics.eumagent.runtime.CallTracker;
import com.appdynamics.eumagent.runtime.HttpRequestTracker;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.UUID;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Iterator;
import java.net.URL;
import java.net.MalformedURLException;

/**
 * Android implementation of the Cordova Plugin.
 * This class is the bridge between Javascript and native agent.
 */
public class ADEUMMobilePlugin extends CordovaPlugin {
    private final static String VERSION = "1.0";
    private HashMap<String, CallTracker> callTrackers;
    private HashMap<String, HttpRequestTracker> httpRequestTrackers;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        callTrackers = new HashMap<String, CallTracker>();
        httpRequestTrackers = new HashMap<String, HttpRequestTracker>();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("getVersion".equals(action)) {
            this.getVersion( callbackContext);
            return true;
        } else if ("initWithConfiguration".equals(action)) {
            JSONObject map = args.getJSONObject(0);
            this.initWithConfiguration( args, callbackContext);
            return true;
        } else if ("changeAppKey".equals(action)) {
            this.changeAppKey( args, callbackContext);
            return true;
        } else if ("startTimerWithName".equals(action)) {
            this.startTimerWithName( args, callbackContext);
            return true;
        } else if ("stopTimerWithName".equals(action)) {
            this.stopTimerWithName( args, callbackContext);
            return true;
        } else if ("reportMetricWithName".equals(action)) {
            this.reportMetricWithName( args, callbackContext);
            return true;
        } else if ("leaveBreadcrumb".equals(action)) {
            this.leaveBreadcrumb( args, callbackContext);
            return true;
        } else if ("setUserData".equals(action)) {
            this.setUserData( args, callbackContext);
            return true;
        } else if ("removeUserData".equals(action)) {
            this.removeUserData( args, callbackContext);
            return true;
        } else if ("takeScreenshot".equals(action)) {
            this.takeScreenshot( args, callbackContext);
            return true;
        } else if ("beginCall".equals(action)) {
            this.beginCall( args, callbackContext);
            return true;
        } else if ("endCall".equals(action)) {
            this.endCall( args, callbackContext);
            return true;
        } else if ("beginHttpRequest".equals(action)) {
            this.beginHttpRequest( args, callbackContext);
            return true;
        } else if ("withURL".equals(action)) {
            this.withURL( args, callbackContext);
            return true;
        } else if ("withResponseCode".equals(action)) {
            this.withResponseCode( args, callbackContext);
            return true;
        } else if ("withResponseContentLength".equals(action)) {
            this.withResponseContentLength( args, callbackContext);
            return true;
        } else if ("withRequestContentLength".equals(action)) {
            this.withRequestContentLength( args, callbackContext);
            return true;
        } else if ("withErrorMessage".equals(action)) {
            this.withErrorMessage( args, callbackContext);
            return true;
        } else if ("withRequestHeaderFields".equals(action)) {
            this.withRequestHeaderFields( args, callbackContext);
            return true;
        } else if ("withResponseHeaderFields".equals(action)) {
            this.withResponseHeaderFields( args, callbackContext);
            return true;
        } else if ("withInstrumentationSource".equals(action)) {
            this.withInstrumentationSource( args, callbackContext);
            return true;
        } else if ("reportDone".equals(action)) {
            this.reportDone( args, callbackContext);
            return true;
        } else if ("crash".equals(action)) {
            this.crash( args, callbackContext);
            return true;
        }
        return false;
    }

    public void onReset() {
      if(callTrackers != null)
         callTrackers.clear();
      if(httpRequestTrackers != null)
         httpRequestTrackers.clear();
    }

    private void getVersion(CallbackContext callbackContext) {
      callbackContext.success(VERSION);
    }

    private void initWithAppKey(JSONArray args, CallbackContext callbackContext) throws JSONException{
        Instrumentation.start(args.getString(0), cordova.getActivity());
        callbackContext.success(VERSION);
    }

    private void initWithConfiguration(JSONArray args, CallbackContext callbackContext) throws JSONException{
        JSONObject map = args.getJSONObject(0);
        int loggingLevel = map.getInt("loggingLevel");
        //map from shared values to android agent specific ones
        int loggingLevelAndroid = 3;
        switch(loggingLevel)
        {
            case 6: //verbose
            case 5:
            case 4:
                loggingLevelAndroid = 1;
                break;
            case 3: //info
            case 2:
            case 1:
                loggingLevelAndroid = 2;
                break;
        }

        AgentConfiguration config = AgentConfiguration.builder().
                                    withAppKey(map.getString("appKey")).
                                    withContext(cordova.getActivity()).
                                    withCollectorURL(map.getString("collectorUrl")).
                                    withScreenshotURL(map.getString("screenshotUrl")).
                                    withLoggingLevel(loggingLevelAndroid).
                                    withScreenshotsEnabled(map.getBoolean("screenshots")).
                                    build();

        Instrumentation.start(config);
        callbackContext.success(VERSION);
    }

    private void changeAppKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Instrumentation.changeAppKey(args.getString(0));
        callbackContext.success(VERSION);
    }

    private void startTimerWithName(JSONArray args, CallbackContext callbackContext)  throws JSONException {
        Instrumentation.startTimer(args.getString(0));
        callbackContext.success(VERSION);
    }

    private void stopTimerWithName(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Instrumentation.stopTimer(args.getString(0));
        callbackContext.success(VERSION);
    }

    private void reportMetricWithName(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            Instrumentation.reportMetric(args.getString(0), Long.parseLong(args.getString(1)));
            callbackContext.success(VERSION);
        } catch(NumberFormatException ex) {
            callbackContext.error("Metric value must be an integer.");
        }
        callbackContext.success(VERSION);
    }

    private void leaveBreadcrumb(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Instrumentation.leaveBreadcrumb(args.getString(0));
        callbackContext.success(VERSION);
    }

    private void setUserData(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Instrumentation.setUserData(args.getString(0), args.getString(1));
        callbackContext.success(VERSION);
    }

    private void removeUserData(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Instrumentation.setUserData(args.getString(0), null);
        callbackContext.success();
    }

    private void takeScreenshot(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Instrumentation.takeScreenshot();
        callbackContext.success();
    }

    private void beginCall(JSONArray args, CallbackContext callbackContext) throws JSONException {
        CallTracker tracker = Instrumentation.beginCall(args.getString(0), args.getString(1), args.getString(2));
        String uuid = UUID.randomUUID().toString();
        callTrackers.put(uuid, tracker);
        callbackContext.success(uuid);
    }

    private void endCall(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(args.length() > 1) {
            CallTracker tracker = callTrackers.get(args.getString(0));
            if(tracker != null) {
              tracker.reportCallEndedWithReturnValue(args.getString(1));
              callTrackers.remove(args.getString(0));
              callbackContext.success();
            } else
               callbackContext.error("CallTracker object has already been destroyed.");
        }
        else if(args.length() > 0) {
            CallTracker tracker = callTrackers.get(args.getString(0));
            if(tracker != null) {
               tracker.reportCallEnded();
               callTrackers.remove(args.getString(0));
               callbackContext.success();
            } else
               callbackContext.error("CallTracker object has already been destroyed.");
        }
     }

     private void beginHttpRequest(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
           HttpRequestTracker tracker = Instrumentation.beginHttpRequest(new URL(args.getString(0)));
           String uuid = UUID.randomUUID().toString();
           httpRequestTrackers.put(uuid, tracker);
           callbackContext.success(uuid);
        } catch (MalformedURLException me) { callbackContext.error("URL argument is not valid."); }
     }

     private void withURL(JSONArray args, CallbackContext callbackContext) throws JSONException {
         if(args.length() > 1) {
             HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
             if(tracker != null) {
                try {
                    tracker.withURL(new URL(args.getString(1)));
                } catch (MalformedURLException me) { callbackContext.error("URL argument is not valid."); }
             } else
                callbackContext.error("Invalid tracker object.");
         } else
            callbackContext.error("URL argument missing.");
    }

    private void withErrorMessage(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            tracker.withError(args.getString(1));
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void withResponseCode(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            tracker.withResponseCode(args.getInt(1));
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void withRequestContentLength(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            tracker.withRequestContentLength(args.getLong(1));
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void withResponseContentLength(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            tracker.withResponseContentLength(args.getLong(1));
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void withRequestHeaderFields(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            JSONObject headersObj = args.getJSONObject(1);
            HashMap headersMap = new HashMap();
			      Iterator itor = headersObj.keys();
			      while(itor.hasNext()) {
				       String key = (String)itor.next();
				       String val = headersObj.getString(key);
				       ArrayList list = new ArrayList();
				       list.add(val);
				       // AppD magic headers must be uppercase CORE-39486
				      if(key.startsWith("adrum")) {
					       key = key.toUpperCase();
				      }
				     headersMap.put(key, list);
			      }
            tracker.withRequestHeaderFields(headersMap);
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void withResponseHeaderFields(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            JSONObject headersObj = args.getJSONObject(1);
            HashMap headersMap = new HashMap();
            Iterator itor = headersObj.keys();
            while(itor.hasNext()) {
               String key = (String)itor.next();
               String val = headersObj.getString(key);
               ArrayList list = new ArrayList();
               list.add(val);
               // AppD magic headers must be uppercase CORE-39486
               if(key.startsWith("adrum")) {
                 key = key.toUpperCase();
               }
               headersMap.put(key, list);
             }
            tracker.withResponseHeaderFields(headersMap);
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void withInstrumentationSource(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 1) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            tracker.withInstrumentationSource(args.getString(1));
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void reportDone(JSONArray args, CallbackContext callbackContext) throws JSONException {
      if(args.length() > 0) {
          HttpRequestTracker tracker = httpRequestTrackers.get(args.getString(0));
          if(tracker != null) {
            tracker.reportDone();
          } else
             callbackContext.error("Invalid tracker object.");
      } else
         callbackContext.error("URL argument missing.");
    }

    private void crash(JSONArray args, CallbackContext callbackContext) throws JSONException {
        throw new RuntimeException("Crash Attempt");
    }
}
