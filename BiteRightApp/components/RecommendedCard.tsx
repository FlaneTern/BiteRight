import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { ConsumptionParams } from "@/constants/Interfaces";
import { defaultStyles } from "@/constants/Styles";
import CalorieIndicator from "./CalorieIndicator";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface RecommendedProps {
  data: ConsumptionParams;
}

const Recommended = (props: RecommendedProps) => {
  const { data } = props;
  const {
    food_id,
    food_image,
    food_name,
    carbohydrates,
    sugar,
    protein,
    calories,
  } = data;

  const router = useRouter();
  const food = food_name.slice(0, 30);

  const _handlePress = () => {
    if (food_id) {
      router.navigate({
        pathname: "/(auth)/product/[id]",
        params: { id: food_id, type: "ean" },
      });
    }
  };

  return (
    <Pressable style={styles.main} onPress={_handlePress}>
      <Image source={{ uri: food_image }} style={styles.image} />
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={styles.foodName}>
          {`${food}${food.length > 30 ? "..." : ""}`}
        </Text>
        <Text style={styles.servingQty}>{calories} kcal</Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
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
            color={Colors.green2}
            amount={protein}
            nutritions="protein"
            calories={calories}
            textStyle={{ fontSize: 11.25 }}
          />
        </View>
      </View>
      <Entypo name="chevron-thin-right" size={20} color={Colors.c400} />
    </Pressable>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  main: {
    height: 90,
    paddingHorizontal: 16,
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.c050,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 16,
    resizeMode: "contain",
  },
  foodName: {
    ...defaultStyles.bodyBold,
    fontSize: 13,
  },
  servingQty: {
    ...defaultStyles.body,
    top: -5,
  },
});
