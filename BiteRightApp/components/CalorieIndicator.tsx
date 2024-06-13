import { StyleSheet, Text, TextStyle, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

interface CalorieIndicatorProps {
  color: string;
  amount: number;
  calories: number;
  nutritions: string;
  circle?: boolean;
  textStyle?: TextStyle;
}

const CalorieIndicator = (params: CalorieIndicatorProps) => {
  const { color, amount, calories, nutritions, circle, textStyle } = params;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const nutritionPercentage =
        (amount * (nutritions === "fat" ? 9 : 4)) / calories;

      setPercentage(nutritionPercentage);
    }, 1000);
  }, []);

  return (
    <View>
      {circle ? (
        <View style={styles.circleContainer}>
          <Progress.Circle
            progress={percentage ?? 0}
            color={color}
            size={64}
            unfilledColor={Colors.c050}
            borderWidth={0}
            borderColor="transparent"
            style={{ position: "absolute" }}
          />
          <View>
            <Text style={[defaultStyles.body, styles.circleText]}>
              {`${amount || 0}g\n${nutritions}`}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.barContainer}>
          <View style={{ left: -12 }}>
            <Progress.Bar
              progress={percentage || 0}
              color={color}
              borderRadius={0}
              borderColor="transparent"
              width={28}
              height={4}
              style={{ transform: [{ rotateZ: "270deg" }] }}
            />
          </View>
          <View style={styles.barText}>
            <Text style={[defaultStyles.body, { top: 5 }, textStyle]}>
              {`${amount || 0}g`}
            </Text>
            <Text style={[defaultStyles.body, textStyle]}>
              {`${nutritions}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CalorieIndicator;

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 48,
    height: 30,
    // borderWidth: 1,
    // borderColor: "#D9D7D7",
  },
  circleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: 64,
  },
  barText: {
    flexDirection: "column",
    justifyContent: "center",
    left: -20,
    top: -2,
  },
  circleText: {
    textAlign: "center",
  },
});
