import { StyleSheet, TextStyle, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
import { Text } from "react-native";

interface ProgressProps {
  radius: number;
  strokeWidth: number;
  end: SharedValue<number>;
}

const DailyProgress = (params: ProgressProps) => {
  const { radius, strokeWidth, end } = params;

  const innerRadius = radius - strokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const textStyle: TextStyle = {
    position: "absolute",
    alignSelf: "center",
    transform: [{ scale: 1.5 }],
  };

  return (
    <View
      style={{
        width: 2 * radius,
        height: 2 * radius,
        justifyContent: "center",
      }}
    >
      <Canvas style={styles.progress}>
        <Path
          path={path}
          color={Colors.blue3}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={1}
        />
        <Path
          path={path}
          color={Colors.blue1}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeJoin="round"
          strokeCap="butt"
          start={0}
          end={end}
        />
      </Canvas>
      <Text style={textStyle}>🤩</Text>
    </View>
  );
};

export default DailyProgress;

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    transform: [{ rotate: "-90deg" }],
  },
});
