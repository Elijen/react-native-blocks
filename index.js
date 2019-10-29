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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
exports.withBlock = function (Component) { return function (props) {
    var style = props.style, restProps = __rest(props, ["style"]);
    var computedStyle = react_1.useMemo(function () { return computeStyles(props); }, [props]);
    if (props["if"] === false) {
        return null;
    }
    return react_1["default"].createElement(Component, __assign({}, restProps, { style: [computedStyle.block, style] }));
}; };
exports.Block = exports.withBlock(react_native_1.View);
var computeStyles = function (props) {
    var style = {};
    Object.keys(props).forEach(function (key) {
        if (STYLES[key]) {
            style = __assign({}, style, STYLES[key](props));
        }
    });
    KEYS.forEach(function (key) {
        if (typeof props[key] !== "undefined") {
            style[key] = props[key];
        }
    });
    Object.keys(ALIASES).forEach(function (key) {
        if (typeof props[key] !== "undefined") {
            style[ALIASES[key]] = props[key];
        }
    });
    return react_native_1.StyleSheet.create({
        block: style
    });
};
var KEYS = [
    "padding",
    "paddingTop",
    "paddingLeft",
    "paddingRight",
    "paddingBottom",
    "paddingVertical",
    "paddingHorizontal",
    "margin",
    "marginTop",
    "marginLeft",
    "marginRight",
    "marginBottom",
    "marginVertical",
    "marginHorizontal",
    "opacity",
    "color",
    "fontSize",
    "fontFamily",
    "height",
    "width",
    "minHeight",
    "maxHeight",
    "alignItems",
    "alignSelf",
    "justifyContent"
];
var ALIASES = { radius: "borderRadius", bg: "backgroundColor" };
var STYLES = {
    row: function () { return ({ flexDirection: "row" }); },
    center: function () { return ({ alignItems: "center", justifyContent: "center" }); },
    centerHorizontal: function (props) {
        var _a;
        return (_a = {},
            _a[props.row ? "justifyContent" : "alignItems"] = "center",
            _a);
    },
    centerVertical: function (props) {
        var _a;
        return (_a = {},
            _a[props.row ? "alignItems" : "justifyContent"] = "center",
            _a);
    },
    flex1: function () { return ({ flex: 1 }); },
    flex2: function () { return ({ flex: 2 }); },
    flex3: function () { return ({ flex: 3 }); },
    bordered: function () { return ({
        borderColor: "#E6E8EB",
        borderWidth: react_native_1.StyleSheet.hairlineWidth
    }); },
    borderedTop: function () { return ({
        borderTopColor: "#E6E8EB",
        borderTopWidth: react_native_1.StyleSheet.hairlineWidth
    }); },
    borderedBottom: function () { return ({
        borderBottomColor: "#E6E8EB",
        borderBottomWidth: react_native_1.StyleSheet.hairlineWidth
    }); },
    borderedLeft: function () { return ({
        borderLeftColor: "#E6E8EB",
        borderLeftWidth: react_native_1.StyleSheet.hairlineWidth
    }); },
    borderedRight: function () { return ({
        borderRightColor: "#E6E8EB",
        borderRightWidth: react_native_1.StyleSheet.hairlineWidth
    }); },
    bgWhite: function () { return ({ backgroundColor: "#FFF" }); },
    bgGrey: function () { return ({ backgroundColor: "#f5f6f8" }); }
};
