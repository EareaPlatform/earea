"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.loadSkin = void 0;
var react_native_ui_lib_1 = require("react-native-ui-lib");
var loadSkin = function () {
    react_native_ui_lib_1.Typography.loadTypographies({
        'screenTitle': __assign(__assign({}, react_native_ui_lib_1.Typography.text20BO), { fontStyle: 'italic' }),
        'header': __assign({}, react_native_ui_lib_1.Typography.text60M),
        'subHeader': __assign({}, react_native_ui_lib_1.Typography.text80M),
        'body': __assign({}, react_native_ui_lib_1.Typography.text80),
        'bodyMedium': __assign({}, react_native_ui_lib_1.Typography.text80M),
        'bodyBold': __assign({}, react_native_ui_lib_1.Typography.text80BO)
    });
    react_native_ui_lib_1.ThemeManager.setComponentTheme('Button', {
        linkColor: react_native_ui_lib_1.Colors.blue30,
        backgroundColor: react_native_ui_lib_1.Colors.blue30
    });
    react_native_ui_lib_1.ThemeManager.setComponentTheme('Checkbox', {
        color: react_native_ui_lib_1.Colors.blue30
    });
};
exports.loadSkin = loadSkin;
