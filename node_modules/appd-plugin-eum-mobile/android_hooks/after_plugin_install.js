var android = require("./android_base");

module.exports = function (context) {
  android.deleteAgentFromProjectGradle();
  android.injectAgentPlugin(context);
};
