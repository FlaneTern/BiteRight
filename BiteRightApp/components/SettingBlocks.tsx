import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Entypo } from "@expo/vector-icons";

interface SettingBlocksProps {
  name: string;
  path?: string;
  params?: any;
  top?: boolean;
  bottom?: boolean;
}

const SettingBlocks = (input: SettingBlocksProps) => {
  const { name, path, params, top, bottom } = input;

  const topBorder: ViewStyle = {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 12,
  };

  const bottomBorder: ViewStyle = {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 12,
  };

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(top ? topBorder : {}),
    ...(bottom ? bottomBorder : {}),
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.text}>{name}</Text>
      <Entypo name="chevron-thin-right" size={14} color={Colors.c300} />
    </View>
  );
};

export default SettingBlocks;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "85%",
    minHeight: 36,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.c050,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    ...defaultStyles.bodyBold,
  },
});
