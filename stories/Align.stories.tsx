import React from "react";
import { View } from "react-native";
import { Block } from "../index";

export default {
  title: "Align"
};

export const centerHorizontalColumn = () => (
  <View>
    <Block centerHorizontal size={150} bg="black">
      <Block size={30} bg="red" margin={5} />
      <Block size={30} bg="red" margin={5} />
    </Block>
  </View>
);

export const centerVerticalColumn = () => (
  <View>
    <Block centerVertical size={150} bg="black">
      <Block size={30} bg="red" margin={5} />
      <Block size={30} bg="red" margin={5} />
    </Block>
  </View>
);

export const centerVerticalRow = () => (
  <View>
    <Block centerVertical row size={150} bg="black">
      <Block size={30} bg="red" margin={5} />
      <Block size={30} bg="red" margin={5} />
    </Block>
  </View>
);

export const centerHorizontalRow = () => (
  <View>
    <Block centerHorizontal row size={150} bg="black">
      <Block size={30} bg="red" margin={5} />
      <Block size={30} bg="red" margin={5} />
    </Block>
  </View>
);

export const centerBoth = () => (
  <View>
    <Block center row size={150} bg="black">
      <Block size={30} bg="red" margin={5} />
      <Block size={30} bg="red" margin={5} />
    </Block>
  </View>
);
