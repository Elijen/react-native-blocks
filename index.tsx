import React, { useMemo, FunctionComponent } from "react";
import {
  View,
  StyleSheet,
  StyleSheetProperties,
  ViewStyle,
  ViewProps,
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
  | "overflow"
  | "left"
  | "right"
  | "top"
  | "bottom";

type SupportedViewStylesType = Pick<ViewStyle, SupportedViewStyleUnion>;

type CustomProps = {
  /** Sets `flex: 1` */
  flex1: boolean;
  /** Sets `flex: 2` */
  flex2: boolean;
  /** Sets `flex: 3` */
  flex3: boolean;
  /** Sets `flexDirection: "row"` */
  row: boolean;
  /** Sets both `justifyContent: "center"` AND `alignItems: "center"` */
  center: boolean;
  /** Sets `justifyContent: "center"` OR `alignItems: "center"` to center the content **horizontally** */
  centerHorizontal: boolean;
  /** Sets `justifyContent: "center"` OR `alignItems: "center"` to center the content **vertically** */
  centerVertical: boolean;
  /** Sets `backgroundColor` to given value */
  bg: string;
  /** Sets `backgroundColor: "#fff"` */
  bgWhite: boolean;
  /** Sets both `width` and `height` to given value */
  size: number;
  /**
   * CSS-like border settings. Can set `borderWidth`, `borderColor` and `borderStyle` simultaneously. Examples:
   * - `1 solid #f00`
   * - `1 #f00`
   * - `#ff2244`
   * - `solid`
   * - `1`
   */
  border: string | number | (string | number)[];
  borderWidth: number;
  borderColor: string;
  /** Sets `position: "absolute"` */
  absolute: boolean;
  /** Sets `position: "relative"` */
  relative: boolean;
  /** Alias for `borderRadius` */
  radius: number;
  /** Style to override any other effects */
  style: ViewStyle;
  /** Sets zIndex to given value */
  z: number;
  /** If false, the component is not rendered */
  if: boolean;
};

interface BlockProps extends SupportedViewStylesType, Partial<CustomProps> {}

export const asBlock = (Component) =>
  React.forwardRef((props: any, ref) => {
    const { style, ...restProps } = props;
    const computedStyle = useMemo(() => computeStyles(props), [props]);

    if (props.if === false) {
      return null;
    }

    const passProps = {};
    Object.keys(restProps).forEach((propName) => {
      if (ALL_PROP_NAMES.indexOf(propName) === -1) {
        passProps[propName] = restProps[propName];
      }
    });

    return (
      <Component
        {...passProps}
        ref={ref}
        style={[computedStyle.block, style]}
      />
    );
  }) as any;

/** @deprecated use asBlock instead */
export const withBlock = asBlock;

export const Block: FunctionComponent<BlockProps & ViewProps> = withBlock(View);

const computeStyles = (props) => {
  let style = {};
  Object.keys(props).forEach((key) => {
    if (STYLES[key]) {
      style = {
        ...style,
        ...STYLES[key](props),
      };
    }
  });

  KEYS.forEach((key) => {
    if (typeof props[key] !== "undefined") {
      style[key] = props[key];
    }
  });

  Object.keys(ALIASES).forEach((key) => {
    if (typeof props[key] !== "undefined") {
      style[ALIASES[key]] = props[key];
    }
  });

  return StyleSheet.create({
    block: style,
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
  "overflow",
  "left",
  "right",
  "top",
  "bottom",
];

const ALIASES = { radius: "borderRadius", bg: "backgroundColor", z: "zIndex" };

const createBorderProp = (prefix: BorderStylePrefixType) => (props) => {
  let border = props.border;
  if (!Array.isArray(props.border)) {
    border = [border];
  }

  const style = {};
  border.forEach((value) => {
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
  centerHorizontal: (props) => ({
    [props.row ? "justifyContent" : "alignItems"]: "center",
  }),
  centerVertical: (props) => ({
    [props.row ? "alignItems" : "justifyContent"]: "center",
  }),
  flex1: () => ({ flex: 1 }),
  flex2: () => ({ flex: 2 }),
  flex3: () => ({ flex: 3 }),
  bordered: () => ({
    borderColor: "#E6E8EB",
    borderWidth: StyleSheet.hairlineWidth,
  }),
  borderedTop: () => ({
    borderTopColor: "#E6E8EB",
    borderTopWidth: StyleSheet.hairlineWidth,
  }),
  borderedBottom: () => ({
    borderBottomColor: "#E6E8EB",
    borderBottomWidth: StyleSheet.hairlineWidth,
  }),
  borderedLeft: () => ({
    borderLeftColor: "#E6E8EB",
    borderLeftWidth: StyleSheet.hairlineWidth,
  }),
  borderedRight: () => ({
    borderRightColor: "#E6E8EB",
    borderRightWidth: StyleSheet.hairlineWidth,
  }),
  bgWhite: () => ({ backgroundColor: "#FFF" }),
  bgGrey: () => ({ backgroundColor: "#f5f6f8" }),
  size: (props) => ({
    width: props.size,
    height: props.size,
  }),
  border: createBorderProp("border"),
  borderTop: createBorderProp("borderTop"),
  borderBottom: createBorderProp("borderBottom"),
  borderLeft: createBorderProp("borderLeft"),
  borderRight: createBorderProp("borderRight"),
  absolute: () => ({ position: "absolute" }),
  relative: () => ({ position: "relative" }),
};

const ALL_PROP_NAMES = [
  ...Object.keys(STYLES),
  ...Object.keys(ALIASES),
  ...KEYS,
];

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
