import React, { useMemo, FunctionComponent } from "react";
import {
  View,
  StyleSheet,
  StyleSheetProperties,
  ViewStyle
} from "react-native";
import { isColor, isWidth, isBorderStyle } from "./utils";

type SupportedTextStyleUnion =
  | "color"
  | "fontSize"
  | "fontFamily"
  | "lineHeight";

type SupportedViewStyleUnion =
  | "padding"
  | "paddingTop"
  | "paddingLeft"
  | "paddingRight"
  | "paddingBottom"
  | "paddingVertical"
  | "paddingHorizontal"
  | "margin"
  | "marginTop"
  | "marginLeft"
  | "marginRight"
  | "marginBottom"
  | "marginVertical"
  | "marginHorizontal"
  | "opacity"
  | "flex"
  | "height"
  | "width"
  | "minHeight"
  | "maxHeight"
  | "alignItems"
  | "alignSelf"
  | "justifyContent"
  | "overflow";

type SupportedViewStylesType = Pick<ViewStyle, SupportedViewStyleUnion>;

type CustomProps = {
  flex1: boolean;
  flex2: boolean;
  flex3: boolean;
  row: boolean;
  center: boolean;
  centerHorizontal: boolean;
  centerVertical: boolean;
  bg: string;
  size: number;
  border: string | number | (string | number)[];
  borderWidth: number;
  borderColor: string;
};

interface BlockProps extends SupportedViewStylesType, Partial<CustomProps> {}

export const withBlock = Component => props => {
  const { style, ...restProps } = props;
  const computedStyle = useMemo(() => computeStyles(props), [props]);

  if (props.if === false) {
    return null;
  }

  return <Component {...restProps} style={[computedStyle.block, style]} />;
};

export const Block: FunctionComponent<BlockProps> = withBlock(View);

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

  console.log(style);

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
  "flex",
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

const createBorderProp = (prefix: BorderStylePrefixType) => props => {
  let border = props.border;
  if (!Array.isArray(props.border)) {
    border = [border];
  }

  const style = {};
  border.forEach(value => {
    if (isColor(value)) {
      style[prefix + "Color"] = value;
    } else if (isWidth(value)) {
      style[prefix + "Width"] = value;
    } else if (isBorderStyle(value)) {
      if (prefix !== "border") {
        console.warn(
          `Trying to set ${prefix}Style, but border style can only be set for the whole border (borderStyle)`
        );
      } else {
        style[prefix + "Style"] = value;
      }
    }
  });
  return style;
};

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
  bgGrey: () => ({ backgroundColor: "#f5f6f8" }),
  size: props => ({
    width: props.size,
    height: props.size
  }),
  border: createBorderProp("border"),
  borderTop: createBorderProp("borderTop"),
  borderBottom: createBorderProp("borderBottom"),
  borderLeft: createBorderProp("borderLeft"),
  borderRight: createBorderProp("borderRight")
};

type BorderStylePrefixType =
  | "border"
  | "borderTop"
  | "borderBottom"
  | "borderLeft"
  | "borderRight";

type BorderRadiusPrefixType =
  | "border"
  | "borderTopEnd"
  | "borderTopStart"
  | "borderTopLeft"
  | "borderTopRight"
  | "borderBottomEnd"
  | "borderBottomStart"
  | "borderBottomLeft"
  | "borderBottomRight";
