import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Branded, Common } from "@/constants/Interfaces";
import { Image } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";

interface FlashListCardProps {
  items: Branded | Common;
}

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .slice(0, 40)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const FlashListCard: React.FC<FlashListCardProps> = ({ items }) => {
  const isBranded = "nf_calories" in items;
  const itemName = toTitleCase(items.food_name);

  return (
    <Link
      href={{
        pathname: "/(auth)/product/[id]",
        params: {
          id: isBranded ? items.nix_item_id : items.food_name,
          type: "nix",
        },
      }}
    >
      <View style={styles.main}>
        <Image source={{ uri: items.photo.thumb }} style={styles.image} />
        <View style={{ flexDirection: "column", width: "85%" }}>
          <Text style={styles.foodName}>
            {`${itemName}${itemName.length > 40 ? "..." : ""}`}
          </Text>
          {"nf_calories" in items && (
            <Text style={styles.servingQty}>{items.nf_calories} kcal</Text>
          )}
          <Text style={styles.servingQty}>
            {items.serving_qty} {items.serving_unit} / servings
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default FlashListCard;

const styles = StyleSheet.create({
  main: {
    height: 90,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 56,
    height: 56,
    marginHorizontal: 24,
    resizeMode: "contain",
  },
  foodName: {
    ...defaultStyles.bodyBold,
    textAlign: "justify",
  },
  servingQty: {
    ...defaultStyles.body,
  },
});
