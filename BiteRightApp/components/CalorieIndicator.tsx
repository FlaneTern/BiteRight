import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { defaultStyles } from "@/constants/Styles";

interface CalorieIndicatorProps {
  color: string;
  amount: number;
  calories: number;
  nutritions: string;
}

const CalorieIndicator = (params: CalorieIndicatorProps) => {
  const { color, amount, calories, nutritions } = params;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const nutritionPercentage =
        (amount * (nutritions === "fat" ? 9 : 4)) / calories;

      setPercentage(nutritionPercentage);
    }, 350);
  }, []);

  return (
    <View style={styles.container}>
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
      <View style={styles.textContainer}>
        <Text style={defaultStyles.body}>{`${amount}g\n${nutritions}`}</Text>
      </View>
    </View>
  );
};

export default CalorieIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 48,
    height: 30,
    // borderWidth: 1,
    // borderColor: "#D9D7D7",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    left: -20,
    top: -2,
  },
});
