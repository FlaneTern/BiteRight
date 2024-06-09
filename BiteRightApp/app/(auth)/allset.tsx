import { Image, StyleSheet, Text, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import CalorieDetails from "@/components/CalorieDetails";
import { calculateMacronutrients } from "@/utils/CaloriesCount";
import Buttons from "@/components/Buttons";

const AllSetPage = () => {
  const complete = require("@/assets/images/All-Set.png");
  const router = useRouter();

  const { name, calories } = useLocalSearchParams<{
    name: string;
    calories: string;
  }>();

  const calorie = parseInt(calories as string);
  const nutritions = calculateMacronutrients(calorie);

  return (
    <View style={defaultStyles.pageContainer}>
      <Image source={complete} style={styles.image} />
      <Text style={styles.allSet}>{name}, you're all set!</Text>

      <Text style={styles.body}>
        Based on your profile, we estimate that your daily calorie intake should
        be:
      </Text>

      <CalorieDetails calorie={calorie} nutritions={nutritions} />

      <Text style={styles.body}>
        Don't worry you can fine tune this later{"\n"}
        For now, let's begin a new journey at
        <Text style={styles.appName}> BiteRight</Text>!
      </Text>

      <Buttons
        title={"Bring it on!"}
        onPress={() => router.replace("(auth)/(tabs)/home")}
      />
    </View>
  );
};

export default AllSetPage;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    marginTop: 48,
    alignSelf: "center",
  },
  allSet: {
    ...defaultStyles.heading1,
    textAlign: "center",
    marginTop: 24,
  },
  body: {
    ...defaultStyles.body,
    width: "85%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 32,
    fontSize: 12.5,
  },
  appName: {
    ...defaultStyles.bodyBold,
    color: Colors.main,
    fontSize: 12.5,
  },
});
