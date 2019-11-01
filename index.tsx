import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

export const withBlock = Component => props => {
  const { style, ...restProps } = props;
  const computedStyle = useMemo(() => computeStyles(props), [props]);

  if (props.if === false) {
    return null;
  }

  return <Component {...restProps} style={[computedStyle.block, style]} />;
};

export const Block = withBlock(View);

const computeStyles = props => {
  let style = {};
  Object.keys(props).forEach(key => {
    if (STYLES[key]) {
      style = {
        ...style,
        ...STYLES[key](props)
      };
    }
  });

  KEYS.forEach(key => {
    if (typeof props[key] !== "undefined") {
      style[key] = props[key];
    }
  });

  Object.keys(ALIASES).forEach(key => {
    if (typeof props[key] !== "undefined") {
      style[ALIASES[key]] = props[key];
    }
  });

  return StyleSheet.create({
    block: style
  });
};

const KEYS = [
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
  "justifyContent",
  "overflow"
];

const ALIASES = { radius: "borderRadius", bg: "backgroundColor" };

const STYLES = {
  row: () => ({ flexDirection: "row" }),
  center: () => ({ alignItems: "center", justifyContent: "center" }),
  centerHorizontal: props => ({
    [props.row ? "justifyContent" : "alignItems"]: "center"
  }),
  centerVertical: props => ({
    [props.row ? "alignItems" : "justifyContent"]: "center"
  }),
  flex1: () => ({ flex: 1 }),
  flex2: () => ({ flex: 2 }),
  flex3: () => ({ flex: 3 }),
  bordered: () => ({
    borderColor: "#E6E8EB",
    borderWidth: StyleSheet.hairlineWidth
  }),
  borderedTop: () => ({
    borderTopColor: "#E6E8EB",
    borderTopWidth: StyleSheet.hairlineWidth
  }),
  borderedBottom: () => ({
    borderBottomColor: "#E6E8EB",
    borderBottomWidth: StyleSheet.hairlineWidth
  }),
  borderedLeft: () => ({
    borderLeftColor: "#E6E8EB",
    borderLeftWidth: StyleSheet.hairlineWidth
  }),
  borderedRight: () => ({
    borderRightColor: "#E6E8EB",
    borderRightWidth: StyleSheet.hairlineWidth
  }),
  bgWhite: () => ({ backgroundColor: "#FFF" }),
  bgGrey: () => ({ backgroundColor: "#f5f6f8" })
};
