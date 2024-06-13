import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ConsumptionParams } from "@/constants/Interfaces";
import { defaultStyles } from "@/constants/Styles";
import CalorieIndicator from "./CalorieIndicator";
import Colors from "@/constants/Colors";

interface HistoryCardProps {
  data: ConsumptionParams;
}

const HistoryCard = (props: HistoryCardProps) => {
  const { data } = props;
  const {
    food_image,
    food_name,
    carbohydrates,
    sugar,
    fats,
    protein,
    calories,
  } = data;

  const food = food_name.slice(0, 30);

  return (
    <View style={styles.main}>
      <Image source={{ uri: food_image }} style={styles.image} />
      <View style={{ flexDirection: "column", width: "85%" }}>
        <Text style={styles.foodName}>
          {`${food}${food.length > 30 ? "..." : ""}`}
        </Text>
        <Text style={styles.servingQty}>{calories} kcal</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CalorieIndicator
            color={Colors.red1}
            amount={carbohydrates}
            nutritions="carbs"
            calories={calories}
            textStyle={{ fontSize: 11.25 }}
          />
          <CalorieIndicator
            color={Colors.accent2}
            amount={sugar}
            nutritions="sugar"
            calories={calories}
            textStyle={{ fontSize: 11.25 }}
          />
          <CalorieIndicator
            color={Colors.magenta}
            amount={fats}
            nutritions="fat"
            calories={calories}
            textStyle={{ fontSize: 11.25 }}
          />
          <CalorieIndicator
            color={Colors.green2}
            amount={protein}
            nutritions="protein"
            calories={calories}
            textStyle={{ fontSize: 11.25 }}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  main: {
    height: 90,
    paddingHorizontal: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 24,
    resizeMode: "contain",
  },
  foodName: {
    ...defaultStyles.bodyBold,
    fontSize: 14,
  },
  servingQty: {
    ...defaultStyles.body,
    top: -5,
  },
});
