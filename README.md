# appdynamics-hybrid-EUM-ionic

Edit 
'''
app.component.ts
'''
and add
'''
window.plugins.ADEUMMobilePlugin.initWithConfiguration(
{
"appKey": "'<KEY>",
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
'''
