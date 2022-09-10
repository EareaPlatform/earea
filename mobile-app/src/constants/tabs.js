"use strict";
exports.__esModule = true;
exports.tabsInfo = exports.demoTab = exports.settingsTab = exports.homeTab = void 0;
var screenIds_1 = require("./screenIds");
var strings_1 = require("./strings");
exports.homeTab = {
    screenId: screenIds_1.screenIds.homeScreen,
    title: strings_1.strings.TAB_HOME_SCREEN_LABEL
};
exports.settingsTab = {
    screenId: screenIds_1.screenIds.settingsScreen,
    title: strings_1.strings.TAB_SETTINGS_SCREEN_LABEL
};
exports.demoTab = {
    screenId: screenIds_1.screenIds.demoScreen,
    title: strings_1.strings.TAB_DEMO_LABEL
};
exports.tabsInfo = [
    exports.homeTab,
    exports.settingsTab,
    exports.demoTab,
];
