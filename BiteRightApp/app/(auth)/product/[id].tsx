import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  fetchItemById,
  fetchItemsByEAN,
  fetchNutrients,
  fetchNutrientsParams,
} from "@/api/Nutrition";
import {
  ParsedData,
  parseDataEAN,
  parseDataNutritionix,
} from "@/utils/ParseData";
import Accordion from "@/components/Accordion";
import CalorieIndicator from "@/components/CalorieIndicator";
import { FlashList } from "@shopify/flash-list";

export default function ProductPage() {
  const [data, setData] = useState<ParsedData[]>([]);

  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();

  const router = useRouter();
  const icon = <Entypo name="chevron-thin-up" size={16} color={Colors.c300} />;

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
        console.log(id);
        const data = await fetchItemsByEAN(id!);
        setData(parseDataEAN(data));
        console.log(parseDataEAN(data));
      } else {
        if (type === "nix") {
          const data = await fetchItemById("nix_item_id", id!);
          setData(parseDataNutritionix(data));
        } else {
          const params: fetchNutrientsParams = { query: id! };

          const data = await fetchNutrients(params);
          setData(parseDataNutritionix(data));
        }
      }
    };

    fetchData();
  }, [id]);

  if (data.length === 0) {
    return (
      <View style={defaultStyles.pageContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

      <Image source={{ uri: data[0].image }} style={styles.image} />
      <Text style={styles.foodName}>{data[0].food}</Text>
      <Text style={styles.serving}>{data[0].quantity} (1 serving)</Text>

      <Accordion headerText="Nutrition Facts" icon={icon}>
        <View>
          <Text style={styles.calories}>{data[0].calories} kcal</Text>
          <CalorieIndicator
            color={Colors.red1}
            amount={data[0].carbohydrates}
            nutritions="Carbs"
            calories={data[0].calories}
            circle
          />
        </View>
      </Accordion>
      <Accordion headerText="Ingredients" icon={icon}>
        <View>
          <FlashList
            data={data[0].ingredients}
            renderItem={({ item }) => <Text>{item}</Text>}
            estimatedItemSize={30}
          />
        </View>
      </Accordion>
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
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  foodName: {
    ...defaultStyles.heading1,
    textAlign: "center",
    marginTop: 12,
  },
  serving: {
    ...defaultStyles.body,
    textAlign: "center",
    color: Colors.c200,
    top: -10,
  },
  calories: {
    ...defaultStyles.heading2,
    textAlign: "center",
  },
});
