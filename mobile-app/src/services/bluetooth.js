"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.notify = exports.disconnect = exports.connect = exports.scan = exports.isEnabled = void 0;
var react_native_ble_plx_1 = require("react-native-ble-plx");
var bluetooth_1 = require("../constants/bluetooth");
var log_1 = require("./log");
var base64 = require("base-64");
var bluetooth = new react_native_ble_plx_1.BleManager();
var isEnabled = function () {
    return bluetooth.state();
};
exports.isEnabled = isEnabled;
var scan = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        bluetooth.startDeviceScan(null, null, function (_error, _scannedDevice) {
            if (_error) {
                console.warn(JSON.stringify(_error, null, 2));
            }
            else {
                if ((_scannedDevice === null || _scannedDevice === void 0 ? void 0 : _scannedDevice.id) === bluetooth_1.bluetoothDeviceAddress) {
                    log_1["default"].complex('BLUETOOTH', "device: " + JSON.stringify(_scannedDevice, null, 2));
                }
            }
        });
        return [2 /*return*/];
    });
}); };
exports.scan = scan;
var connect = function () { return __awaiter(void 0, void 0, void 0, function () {
    var device;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log_1["default"].complex('BLUETOOTH', "creating connection with " + bluetooth_1.bluetoothDeviceAddress + "...");
                return [4 /*yield*/, bluetooth.connectToDevice(bluetooth_1.bluetoothDeviceAddress)];
            case 1:
                device = _a.sent();
                device.onDisconnected(function () { return log_1["default"].complex('BLUETOOTH', 'disconnected'); });
                return [4 /*yield*/, device.isConnected()];
            case 2:
                if (_a.sent()) {
                    log_1["default"].complex('BLUETOOTH', "connected to " + bluetooth_1.bluetoothDeviceAddress + ".");
                }
                else {
                    log_1["default"].complex('BLUETOOTH DEVICE', 'can`t write message when device is not connected');
                }
                return [2 /*return*/, device];
        }
    });
}); };
exports.connect = connect;
var disconnect = function (device) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, device.isConnected()];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 3];
                log_1["default"].complex('BLUETOOTH', "canceling connection with " + bluetooth_1.bluetoothDeviceAddress + "...");
                return [4 /*yield*/, device.cancelConnection()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                log_1["default"].complex('BLUETOOTH', "connection with " + bluetooth_1.bluetoothDeviceAddress + " already canceled.");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.disconnect = disconnect;
var _notify = function (device, data) {
    if (data === void 0) { data = 'vibrate'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var allServicesAndCharacteristics, discoveredServices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, device.discoverAllServicesAndCharacteristics()];
                case 1:
                    allServicesAndCharacteristics = _a.sent();
                    return [4 /*yield*/, allServicesAndCharacteristics.services()];
                case 2:
                    discoveredServices = _a.sent();
                    discoveredServices.forEach(function (_service) { return __awaiter(void 0, void 0, void 0, function () {
                        var newCharacteristics;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, _service.characteristics()];
                                case 1:
                                    newCharacteristics = _a.sent();
                                    newCharacteristics.forEach(function (characteristic) { return __awaiter(void 0, void 0, void 0, function () {
                                        var err_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!characteristic.isWritableWithResponse) return [3 /*break*/, 4];
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    log_1["default"].complex('BLUETOOTH', "notyfing bluetooth device.");
                                                    return [4 /*yield*/, characteristic.writeWithResponse(base64.encode(data))];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    err_1 = _a.sent();
                                                    log_1["default"].complex('BLUETOOTH', "Error: " + JSON.stringify(err_1, null, 2));
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
};
var notify = function (data) {
    if (data === void 0) { data = 'vibrate'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var device;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.connect)()];
                case 1:
                    device = _a.sent();
                    return [4 /*yield*/, _notify(device, data)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, exports.disconnect)(device)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.notify = notify;
