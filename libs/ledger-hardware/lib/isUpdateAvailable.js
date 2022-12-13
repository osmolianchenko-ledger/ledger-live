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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var devices_1 = require("@ledgerhq/devices");
var semver_1 = __importDefault(require("semver"));
var provider_1 = require("../manager/provider");
var Manager_1 = __importDefault(require("../api/Manager"));
var apps_1 = require("../apps");
var isUpdateAvailable = function (deviceInfo, appAndVersion, checkMustUpdate) {
    if (checkMustUpdate === void 0) { checkMustUpdate = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var deviceModel, deviceVersionP, firmwareDataP, applicationsByDevice, appAvailableInProvider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deviceModel = (0, devices_1.identifyTargetId)(deviceInfo.targetId);
                    deviceVersionP = Manager_1["default"].getDeviceVersion(deviceInfo.targetId, (0, provider_1.getProviderId)(deviceInfo));
                    firmwareDataP = deviceVersionP.then(function (deviceVersion) {
                        return Manager_1["default"].getCurrentFirmware({
                            deviceId: deviceVersion.id,
                            version: deviceInfo.version,
                            provider: (0, provider_1.getProviderId)(deviceInfo)
                        });
                    });
                    return [4 /*yield*/, Promise.all([
                            deviceVersionP,
                            firmwareDataP,
                        ]).then(function (_a) {
                            var _b = __read(_a, 2), deviceVersion = _b[0], firmwareData = _b[1];
                            return Manager_1["default"].applicationsByDevice({
                                provider: (0, provider_1.getProviderId)(deviceInfo),
                                current_se_firmware_final_version: firmwareData.id,
                                device_version: deviceVersion.id
                            });
                        })];
                case 1:
                    applicationsByDevice = _a.sent();
                    appAvailableInProvider = applicationsByDevice.find(function (_a) {
                        var name = _a.name;
                        return appAndVersion.name === name;
                    });
                    if (!appAvailableInProvider)
                        return [2 /*return*/, false];
                    if (!checkMustUpdate) {
                        return [2 /*return*/, semver_1["default"].gt(appAvailableInProvider.version, appAndVersion.version)];
                    }
                    return [2 /*return*/, (!!appAvailableInProvider &&
                            !(0, apps_1.mustUpgrade)(deviceModel === null || deviceModel === void 0 ? void 0 : deviceModel.id, appAvailableInProvider.name, appAvailableInProvider.version))];
            }
        });
    });
};
exports["default"] = isUpdateAvailable;
//# sourceMappingURL=isUpdateAvailable.js.map