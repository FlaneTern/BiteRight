import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import Separator from "@/components/Separator";
import Button from "@/components/Buttons";
import { addConsumptionHistory } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "@clerk/clerk-expo";
import { ConsumptionParams } from "@/constants/Interfaces";

export default function ProductPage() {
  const [data, setData] = useState<ParsedData[]>([]);
  const [email, setEmail] = useState<string>("");

  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
  const { user } = useUser();

  const router = useRouter();
  const db = useSQLiteContext();
  const icon = <Entypo name="chevron-thin-up" size={16} color={Colors.c300} />;

  const handlePress = () => {
    if (type === "ean") {
      router.navigate("/(auth)/(tabs)/home");
    } else {
      router.back();
    }
  };

  const addFood = async () => {
    await addConsumptionHistory(db, email, {
      food_id: data[0].food,
      food_image: data[0].image,
      food_name: data[0].food,
      calories: data[0].calories,
      carbohydrates: data[0].carbohydrates,
      sugar: data[0].sugar,
      fats: data[0].fat,
      protein: data[0].protein,
    } as ConsumptionParams);

    router.navigate("/(auth)/(tabs)/home");
  };

  useEffect(() => {
    setEmail(user?.primaryEmailAddress?.emailAddress!);
  }, [user]);

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
    <ScrollView
      style={defaultStyles.pageContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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

      <View style={{ flex: 4 }}>
        <Accordion headerText="Nutrition Facts" icon={icon}>
          <View>
            <Text style={styles.calories}>{data[0].calories} kcal</Text>
            <View style={styles.details}>
              <CalorieIndicator
                color={Colors.red1}
                amount={data[0].carbohydrates}
                nutritions="carbs"
                calories={data[0].calories}
                circle
              />
              <CalorieIndicator
                color={Colors.accent2}
                amount={data[0].sugar}
                nutritions="sugar"
                calories={data[0].calories}
                circle
              />
              <CalorieIndicator
                color={Colors.magenta}
                amount={data[0].fat}
                nutritions="fat"
                calories={data[0].calories}
                circle
              />
              <CalorieIndicator
                color={Colors.green2}
                amount={data[0].protein}
                nutritions="protein"
                calories={data[0].calories}
                circle
              />
            </View>
          </View>
        </Accordion>

        <Separator />

        <Accordion headerText="Ingredients" icon={icon}>
          <View>
            <FlashList
              data={data[0].ingredients}
              renderItem={({ item }) => (
                <Text style={styles.ingredients}>{item}</Text>
              )}
              estimatedItemSize={30}
              keyExtractor={(item) => item}
              ItemSeparatorComponent={() => <Separator />}
            />
          </View>
        </Accordion>

        <Separator />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Add to Intake" onPress={addFood} />
        <Button
          title="Cancel"
          onPress={() => router.navigate("/(auth)/(tabs)/home")}
          buttonStyle={styles.cancelButton}
          textStyle={styles.cancelText}
        />
      </View>
    </ScrollView>
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
    marginBottom: 16,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    rowGap: 16,
  },
  ingredients: {
    ...defaultStyles.body,
    minHeight: 38,
    marginVertical: 12,
    textAlignVertical: "center",
  },
  buttonArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    gap: 8,
    marginVertical: 24,
  },
  cancelButton: {
    backgroundColor: Colors.c000,
    borderWidth: 1,
    borderColor: Colors.main,
  },
  cancelText: {
    color: Colors.main,
  },
});
