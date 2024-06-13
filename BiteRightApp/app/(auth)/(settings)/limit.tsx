import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "@clerk/clerk-expo";
import { getUserLimit } from "@/utils/Database";
import CalorieDetails from "@/components/CalorieDetails";
import { Macronutrients } from "@/utils/CaloriesCount";
import Button from "@/components/Buttons";

const DailyLimit = () => {
  const [calorie, setCalorie] = useState<number>(0);
  const [nutritions, setNutritions] = useState<Macronutrients>();
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  const db = useSQLiteContext();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (email) {
      getUserLimit(db, email).then((result) => {
        if (result) {
          setCalorie(result.calories);
          setNutritions({
            carbohydrates: result.carbohydrates,
            sugar: result.sugar,
            fat: result.fats,
            protein: result.protein,
          });

          setLoading(false);
        }
      });
    }
  }, [email]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={styles.body}>
        Based on your profile, we estimate that your daily calorie intake should
        be:
      </Text>

      <CalorieDetails calorie={calorie} nutritions={nutritions!} />

      <Button
        title="Edit"
        onPress={() => console.log("Edit daily limit")}
        buttonStyle={{ marginTop: 32 }}
      />
    </View>
  );
};

export default DailyLimit;

const styles = StyleSheet.create({
  body: {
    ...defaultStyles.body,
    width: "85%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 32,
    fontSize: 12.5,
  },
});
