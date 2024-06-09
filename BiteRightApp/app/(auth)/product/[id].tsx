import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  fetchItemById,
  fetchItemsByEAN,
  fetchNutrients,
  fetchNutrientsParams,
} from "@/api/Nutrition";
import { ParsedData, parseData } from "@/utils/ParseData";

export default function ProductPage() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();

  const router = useRouter();

  const handlePress = () => {
    if (type === "ean") {
      router.navigate("/(auth)/(tabs)/home");
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (type === "ean") {
        const data = await fetchItemsByEAN(id!);
        const parsedData = parseData(data);
        console.log(parsedData);
      } else {
        if (parseInt(id!) > 0) {
          const data = await fetchItemById("nix_item_id", id!);
          console.log(data);
        } else {
          const params: fetchNutrientsParams = {
            query: id!,
            num_servings: 2,
          };

          const data = await fetchNutrients(params);
          console.log(data);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={handlePress} style={styles.backButton}>
              <FontAwesome6 name="chevron-left" size={22} color={Colors.c300} />
            </TouchableOpacity>
          ),
        }}
      />

      <Text>ProductPage : {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 30,
    height: 30,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
