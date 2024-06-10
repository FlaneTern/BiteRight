import { StyleSheet, Text, View } from "react-native";
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
}

const CalorieIndicator = (params: CalorieIndicatorProps) => {
  const { color, amount, calories, nutritions, circle } = params;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const nutritionPercentage =
        (amount * (nutritions === "fat" ? 9 : 4)) / calories;

      setPercentage(nutritionPercentage);
    }, 350);
  }, []);

  return (
    <View>
      {circle ? (
        <View style={styles.circleContainer}>
          <Progress.Circle
            progress={percentage}
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
              progress={percentage}
              color={color}
              borderRadius={0}
              borderColor="transparent"
              width={28}
              height={4}
              style={{ transform: [{ rotateZ: "270deg" }] }}
            />
          </View>
          <View style={styles.barText}>
            <Text style={defaultStyles.body}>{`${
              amount || 0
            }g\n${nutritions}`}</Text>
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
    alignItems: "center",
    left: -20,
    top: -2,
  },
  circleText: {
    textAlign: "center",
  },
});
