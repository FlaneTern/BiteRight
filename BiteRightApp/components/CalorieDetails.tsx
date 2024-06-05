import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

import { Macronutrients } from "@/utils/CaloriesCount";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import CalorieIndicator from "./CalorieIndicator";

interface CalorieDetail {
  calorie: number;
  nutritions: Macronutrients;
}

const CalorieDetails = (params: CalorieDetail) => {
  const { calorie, nutritions } = params;

  return (
    <View style={styles.container}>
      <Text style={defaultStyles.heading2}>{calorie} kcal</Text>

      <Text style={[defaultStyles.body, { color: Colors.c200 }]}>
        Nutrition details:
      </Text>
      <View style={{ flexDirection: "column", marginTop: 12 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <CalorieIndicator
            color={Colors.red1}
            amount={nutritions.carbohydrates}
            calories={calorie}
            nutritions="carbs"
          />
          <CalorieIndicator
            color={Colors.accent2}
            amount={nutritions.sugar}
            calories={calorie}
            nutritions="sugar"
          />
          <CalorieIndicator
            color={Colors.magenta}
            amount={nutritions.fat}
            calories={calorie}
            nutritions="fat"
          />
          <CalorieIndicator
            color={Colors.green2}
            amount={nutritions.protein}
            calories={calorie}
            nutritions="protein"
          />
        </View>
      </View>
    </View>
  );
};

export default CalorieDetails;

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: Colors.c000,
    elevation: 5,
  },
});
