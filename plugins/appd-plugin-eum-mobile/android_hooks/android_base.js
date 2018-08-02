/** @module Android Hooks for AppD Cordova Plugin */
var path = require("path");
var fs = require("fs");

/**
 * @desc Hooks to manage Gradle build script changes
 * when AppD plugin is added or removed
 */
module.exports = {
  /**
   * AppD Agent build extension
   */
  gradleScriptChanges: "\n      classpath 'com.appdynamics:appdynamics-gradle-plugin:4.5.+'",

  /**
   * Path for android gradle file - from Android 7.0
   */
  androidGradleScriptPath: path.join("platforms", "android", "app", "build.gradle"),

  /**
   * Path for android gradle file - before Android 7.0
   */
  androidGradleScriptPathBefore70: path.join("platforms", "android", "build.gradle"),

  /**
   * Get gradle script as string
   * @param path
   * @returns {String} - Gradle script path as a string
   */
  readFile: function (path) {
    return fs.readFileSync(path, "utf-8");
  },

  /**
   * Write contents to a path
   * @param path {String}
   * @param contents {String}
   */
  writeFile: function (path, contents) {
    fs.writeFileSync(path, contents);
  },

  /**
   * Helper method to read the Android gradle file.
   * @returns {String} Android Gradle File
   */
  readAndroidGradle: function () {
     if (fs.existsSync(this.androidGradleScriptPath)) {
        return this.readFile(this.androidGradleScriptPath);
     } else {
        return this.readFile(this.androidGradleScriptPathBefore70);
     }
  },

  /**
   * Write contents to the Android gradle build path
   * @param {String} contents - The contents to be written to the gradle file.
   */
  writeAndroidGradle: function (contents) {
    if (fs.existsSync(this.androidGradleScriptPath)) {
       this.writeFile(this.androidGradleScriptPath, contents);
    } else {
       this.writeFile(this.androidGradleScriptPathBefore70, contents);
    }
  },

  /**
   * Delete all references to AppD agent from build script.
   */
  deleteAgentFromProjectGradle: function () {
    var buildScript = this.readAndroidGradle();
    var regex = new RegExp(this.gradleScriptChanges);
    this.writeAndroidGradle(buildScript.replace(regex, ""));
  },
  /**
   *  Inject the agent in Android gradle build script
   */
  injectAgentPlugin: function (context) {

    var buildGradle = this.readAndroidGradle();
    buildGradle = buildGradle.replace(/(.*com.android.tools.build:gradle.*)/, '$1' + this.gradleScriptChanges);
    this.writeAndroidGradle(buildGradle);
  }
};
