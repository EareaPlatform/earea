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
exports.navigationService = void 0;
var react_native_navigation_1 = require("react-native-navigation");
var react_native_ui_lib_1 = require("react-native-ui-lib");
var registerComponent = function (componentName, componentProvider) {
    react_native_navigation_1.Navigation.registerComponent(componentName, componentProvider);
};
var registerTabs = function (tabsLayout) {
    react_native_navigation_1.Navigation.events().registerAppLaunchedListener(function () {
        setRoot({
            root: {
                bottomTabs: {
                    children: tabsLayout
                }
            }
        });
    });
};
var setRoot = function (root) {
    react_native_navigation_1.Navigation.setRoot(root);
};
var pushScreen = function (props) {
    return react_native_navigation_1.Navigation.push(props.componentId, {
        component: {
            name: props.screenId,
            passProps: props.passProps,
            options: __assign(__assign({}, withoutTopBar), props.options)
        }
    });
};
var showModal = function (props) {
    return react_native_navigation_1.Navigation.showModal({
        stack: {
            children: [
                {
                    component: {
                        name: props.screenName,
                        passProps: props.passProps
                    }
                },
            ]
        }
    });
};
var withoutBottomTabs = {
    bottomTabs: {
        visible: false,
        drawBehind: true
    }
};
var withTopBar = {
    topBar: {
        visible: true
    }
};
var withoutTopBar = {
    topBar: {
        visible: false
    }
};
var createTab = function (screenId, tabTitle, icon) { return ({
    stack: {
        children: [
            {
                component: {
                    name: screenId,
                    options: __assign({ bottomTab: {
                            text: tabTitle,
                            selectedTextColor: react_native_ui_lib_1.Colors.blue30,
                            icon: icon
                        } }, withoutTopBar)
                }
            },
        ]
    }
}); };
exports.navigationService = {
    withoutBottomTabs: withoutBottomTabs,
    withTopBar: withTopBar,
    withoutTopBar: withoutTopBar,
    registerComponent: registerComponent,
    registerTabs: registerTabs,
    setRoot: setRoot,
    pushScreen: pushScreen,
    showModal: showModal,
    createTab: createTab
};
