//
//  Copyright (c) 2018 AppDynamics Technologies. All rights reserved.
//

#import <Cordova/CDVPlugin.h>

@interface ADEUMMobilePlugin : CDVPlugin {
}

@property (nonatomic, strong) CDVInvokedUrlCommand *incomingCommand;

- (void)getVersion:(CDVInvokedUrlCommand *)command;
- (void)initWithAppKey:(CDVInvokedUrlCommand *)command;
- (void)initWithConfiguration:(CDVInvokedUrlCommand *)command;
- (void)changeAppKey:(CDVInvokedUrlCommand *)command;
- (void)startTimerWithName:(CDVInvokedUrlCommand *)command;
- (void)stopTimerWithName:(CDVInvokedUrlCommand *)command;
- (void)reportMetricWithName:(CDVInvokedUrlCommand *)command;
- (void)leaveBreadcrumb:(CDVInvokedUrlCommand *)command;
- (void)setUserData:(CDVInvokedUrlCommand *)command;
- (void)removeUserData:(CDVInvokedUrlCommand *)command;
- (void)takeScreenshot:(CDVInvokedUrlCommand *)command;
- (void)beginCall:(CDVInvokedUrlCommand*)command;
- (void)endCall:(CDVInvokedUrlCommand*)command;
- (void)beginHttpRequest:(CDVInvokedUrlCommand*)command;
- (void)reportDone:(CDVInvokedUrlCommand*)command;
- (void)getCorrelationHeaders:(CDVInvokedUrlCommand *)command;
- (void)withResponseCode:(CDVInvokedUrlCommand*)command;
- (void)withResponseContentLength:(CDVInvokedUrlCommand*)command;
- (void)withRequestContentLength:(CDVInvokedUrlCommand*)command;
- (void)withInstrumentationSource:(CDVInvokedUrlCommand*)command;
- (void)withResponseHeaderFields:(CDVInvokedUrlCommand*)command;
- (void)withRequestHeaderFields:(CDVInvokedUrlCommand*)command;
- (void)withErrorMessage:(CDVInvokedUrlCommand*)command;

//for internal testing only
- (void)crash:(CDVInvokedUrlCommand *)command;
- (void)flushBeaconsNow;

@end
