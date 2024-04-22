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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var deep_object_diff_1 = require("deep-object-diff");
var source = require("./en"); // Assuming your source file is 'en.ts'
function translate(targetFile, srcLang, tarLang) {
    return __awaiter(this, void 0, void 0, function () {
        // Function to simulate translation
        function translateText(text, srcLang, tarLang) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Here you would use an actual translation API
                    return [2 /*return*/, "Translated(".concat(text, ")")]; // Placeholder function
                });
            });
        }
        var target, differences, recursiveTranslate;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = {};
                    if (fs.existsSync(targetFile)) {
                        target = require("./".concat(targetFile)); // Adjust path as necessary
                    }
                    differences = (0, deep_object_diff_1.detailedDiff)(target, source.default);
                    recursiveTranslate = function (obj, parent) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _i, key, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _a = obj;
                                    _b = [];
                                    for (_c in _a)
                                        _b.push(_c);
                                    _i = 0;
                                    _f.label = 1;
                                case 1:
                                    if (!(_i < _b.length)) return [3 /*break*/, 6];
                                    _c = _b[_i];
                                    if (!(_c in _a)) return [3 /*break*/, 5];
                                    key = _c;
                                    if (!(typeof obj[key] === 'string')) return [3 /*break*/, 3];
                                    _d = parent;
                                    _e = key;
                                    return [4 /*yield*/, translateText(obj[key], srcLang, tarLang)];
                                case 2:
                                    _d[_e] = _f.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    if (!(typeof obj[key] === 'object' && !parent[key])) return [3 /*break*/, 5];
                                    parent[key] = {};
                                    return [4 /*yield*/, recursiveTranslate(obj[key], parent[key])];
                                case 4:
                                    _f.sent();
                                    _f.label = 5;
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, recursiveTranslate(source.default, target)];
                case 1:
                    _a.sent();
                    // Save the updated target i18n file
                    fs.writeFileSync(targetFile, "export default ".concat(JSON.stringify(target, null, 2)), 'utf8');
                    return [2 /*return*/];
            }
        });
    });
}
// Usage of the function
translate('fr.ts', 'en', 'fr').then(function () {
    console.log('Translation complete.');
}).catch(function (err) {
    console.error('Error during translation:', err);
});
//# sourceMappingURL=translate_i18n.js.map