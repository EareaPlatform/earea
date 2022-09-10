"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var environment_1 = require("../constants/environment");
var LogColors;
(function (LogColors) {
    LogColors["Reset"] = "\u001B[0m";
    LogColors["Bright"] = "\u001B[1m";
    LogColors["Dim"] = "\u001B[2m";
    LogColors["Underscore"] = "\u001B[4m";
    LogColors["Blink"] = "\u001B[5m";
    LogColors["Reverse"] = "\u001B[7m";
    LogColors["Hidden"] = "\u001B[8m";
    LogColors["FgBlack"] = "\u001B[30m";
    LogColors["FgRed"] = "\u001B[31m";
    LogColors["FgGreen"] = "\u001B[32m";
    LogColors["FgYellow"] = "\u001B[33m";
    LogColors["FgBlue"] = "\u001B[34m";
    LogColors["FgMagenta"] = "\u001B[35m";
    LogColors["FgCyan"] = "\u001B[36m";
    LogColors["FgWhite"] = "\u001B[37m";
    LogColors["BgBlack"] = "\u001B[40m";
    LogColors["BgRed"] = "\u001B[41m";
    LogColors["BgGreen"] = "\u001B[42m";
    LogColors["BgYellow"] = "\u001B[43m";
    LogColors["BgBlue"] = "\u001B[44m";
    LogColors["BgMagenta"] = "\u001B[45m";
    LogColors["BgCyan"] = "\u001B[46m";
    LogColors["BgWhite"] = "\u001B[47m";
})(LogColors || (LogColors = {}));
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, args);
};
log.complex = function (title) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.Bright, LogColors.BgYellow, "\r " + title, LogColors.Reset], args, false));
};
log.info = function (title) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.Bright, LogColors.BgGreen, "\r " + title, LogColors.Reset], args, false));
};
log.warn = function (title) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.Bright, LogColors.BgRed, "\r " + title, LogColors.Reset], args, false));
};
log.debug = function (title) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return environment_1.isDevMode && log.apply(void 0, __spreadArray([LogColors.Bright, LogColors.BgMagenta, "\r DEBUG:", title, LogColors.Reset], args, false));
};
log.red = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgRed], args, false));
};
log.blue = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgBlue], args, false));
};
log.cyan = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgCyan], args, false));
};
log.green = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgGreen], args, false));
};
log.yellow = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgYellow], args, false));
};
log.magenta = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgMagenta], args, false));
};
log.white = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return log.apply(void 0, __spreadArray([LogColors.FgWhite], args, false));
};
exports["default"] = log;
