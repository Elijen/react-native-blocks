import React, { useRef } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Block, asBlock } from "../index";

export default {
  title: "Misc",
};

const ScrollViewAsBlock = asBlock(ScrollView);
const TouchableOpacityAsBlock = asBlock(TouchableOpacity);

export const forwardRef = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <View>
      <ScrollViewAsBlock ref={scrollViewRef} size={100} bg="#000">
        <Block size={60} bg="red" margin={10} />
        <Block size={60} bg="red" margin={10} />
      </ScrollViewAsBlock>

      <TouchableOpacityAsBlock
        padding={5}
        marginBottom={5}
        bordered
        onPress={() =>
          scrollViewRef.current && scrollViewRef.current.scrollTo(0)
        }
      >
        <Text>Scroll up</Text>
      </TouchableOpacityAsBlock>

      <TouchableOpacityAsBlock
        padding={5}
        bordered
        onPress={() =>
          scrollViewRef.current && scrollViewRef.current.scrollToEnd()
        }
      >
        <Text>Scroll down</Text>
      </TouchableOpacityAsBlock>
    </View>
  );
};

const Div = asBlock("div");

export const HTMLElementAsBlock = () => {
  return (
    <View>
      <Div bg="red" size={100} />
    </View>
  );
};
