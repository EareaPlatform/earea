"use strict";
exports.__esModule = true;
exports.registerScreens = void 0;
var screenIds_1 = require("./constants/screenIds");
var navigation_1 = require("./services/navigation");
var homeScreen_1 = require("./app/screens/homeScreen/");
var settingsScreen_1 = require("./app/screens/settingsScreen/");
var demoScreen_1 = require("./app/screens/demoScreen/");
var viewAllScreen_1 = require("./app/screens/viewAllScreen");
var registerScreens = function () {
    navigation_1.navigationService.registerComponent(screenIds_1.screenIds.demoScreen, function () { return demoScreen_1["default"]; });
    navigation_1.navigationService.registerComponent(screenIds_1.screenIds.homeScreen, function () { return homeScreen_1["default"]; });
    navigation_1.navigationService.registerComponent(screenIds_1.screenIds.settingsScreen, function () { return settingsScreen_1["default"]; });
    navigation_1.navigationService.registerComponent(screenIds_1.screenIds.viewAllScreen, function () { return viewAllScreen_1["default"]; });
};
exports.registerScreens = registerScreens;
