import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { dateToISO, formatToDayMonthDay } from "@/utils/DateFormat";
import { defaultStyles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import { getConsumptionHistory, getUserLimit } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { Macronutrients } from "@/utils/CaloriesCount";
import { ConsumptionParams } from "@/constants/Interfaces";
import CalorieIndicator from "@/components/CalorieIndicator";
import Colors from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import HistoryCard from "@/components/HistoryCard";
import Separator from "@/components/Separator";

const ConsumptionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [calories, setCalories] = useState<number>(0);
  const [nutritions, setNutritions] = useState<Macronutrients>();
  const [limit, setLimit] = useState<Macronutrients>();
  const [data, setData] = useState<ConsumptionParams[]>([]);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();

  const db = useSQLiteContext();
  const email = user?.primaryEmailAddress?.emailAddress;
  const date = formatToDayMonthDay(new Date(id!));
  const ISOdate = dateToISO(new Date(id!));

  useEffect(() => {
    if (email) {
      getConsumptionHistory(db, email, ISOdate).then((result) => {
        let totalCalories = 0,
          totalCarbs = 0,
          totalSugar = 0,
          totalFat = 0,
          totalProtein = 0;
        result?.forEach((item) => {
          totalCalories += Number(item.calories);
          totalCarbs += Number(item.carbohydrates);
          totalSugar += Number(item.sugar);
          totalFat += Number(item.fats);
          totalProtein += Number(item.protein);
        });

        setData(result);
        setCalories(totalCalories);
        setNutritions({
          carbohydrates: totalCarbs,
          sugar: totalSugar,
          fat: totalFat,
          protein: totalProtein,
        });
      });
      getUserLimit(db, email).then((result) => {
        if (result) {
          setLimit({
            carbohydrates: result.carbohydrates,
            sugar: result.sugar,
            fat: result.fats,
            protein: result.protein,
          });
        }
      });

      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [email]);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={Colors.main}
        style={{ backgroundColor: Colors.c000, flex: 1 }}
      />
    );

  return (
    <ScrollView
      style={defaultStyles.pageContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Stack.Screen
        options={{
          title: date,
          headerTitleStyle: { ...defaultStyles.heading2 },
        }}
      />

      <Text style={[styles.section, { marginTop: 16 }]}>Calorie Intake</Text>
      <Text style={styles.calories}>{calories} kcal</Text>
      <View style={styles.details}>
        <CalorieIndicator
          color={Colors.red1}
          amount={nutritions?.carbohydrates ?? 0}
          nutritions="carbs"
          calories={limit?.carbohydrates ?? 1}
          circle
        />
        <CalorieIndicator
          color={Colors.accent2}
          amount={nutritions?.sugar ?? 0}
          nutritions="sugar"
          calories={limit?.sugar ?? 1}
          circle
        />
        <CalorieIndicator
          color={Colors.magenta}
          amount={nutritions?.fat ?? 0}
          nutritions="fat"
          calories={limit?.fat ?? 1}
          circle
        />
        <CalorieIndicator
          color={Colors.green2}
          amount={nutritions?.protein ?? 0}
          nutritions="protein"
          calories={limit?.protein ?? 1}
          circle
        />
      </View>

      <Text style={styles.section}>Food History</Text>
      <FlashList
        data={data}
        renderItem={({ item }) => <HistoryCard data={item} />}
        keyExtractor={(item) => item.food_name}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={200}
        ListFooterComponentStyle={{ marginBottom: 24 }}
      />
    </ScrollView>
  );
};

export default ConsumptionHistory;

const styles = StyleSheet.create({
  section: {
    ...defaultStyles.bodyBold,
    fontSize: 14,
    left: "7.5%",
  },
  calories: {
    ...defaultStyles.heading2,
    textAlign: "center",
    marginVertical: 12,
  },
  details: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    rowGap: 16,
    marginBottom: 32,
  },
});
