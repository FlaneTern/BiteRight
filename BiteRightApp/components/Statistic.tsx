import { useSharedValue, withTiming } from "react-native-reanimated";
import { useFocusEffect, useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "@/constants/Colors";

import {
  getConsumptionHistory,
  getMaxCalories,
  getName,
} from "@/utils/Database";
import { defaultStyles } from "@/constants/Styles";
import { dateToISO } from "@/utils/DateFormat";
import DailyProgress from "./DailyProgress";
import Button from "./Buttons";

interface StatisticProps {
  email: string;
}

const Statistic = (params: StatisticProps) => {
  const [name, setName] = useState<string | undefined>("");
  const [progress, setProgress] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const { email } = params;

  const db = useSQLiteContext();
  const router = useRouter();
  const end = useSharedValue(0);
  const icon = (
    <MaterialIcons
      name="history"
      style={{ marginRight: 8 }}
      size={16}
      color={Colors.c000}
    />
  );

  useFocusEffect(() => {
    const getData = async () => {
      getName(db, email).then((result) => {
        setName(result?.split(" ")[0]);
      });
      getMaxCalories(db, email).then((result) => {
        setMax(parseInt(result?.toFixed(0) as string));
      });
      getConsumptionHistory(db, email, dateToISO(new Date())).then((result) => {
        let total = 0;
        result?.forEach((item) => {
          total += item.calories;
        });
        setProgress(total);
      });
    };

    if (email) {
      getData();

      const percentage = progress / max || 0;
      end.value = withTiming(percentage, { duration: 750 });
    }
  });

  return (
    <View style={styles.container}>
      <DailyProgress radius={42} strokeWidth={20} end={end} text="🤩" />
      <View style={{ flexDirection: "column", width: "55%" }}>
        <Text style={styles.title}>Way to go, {name}!</Text>
        <Text>
          <Text style={styles.progress}>{`${progress} `}</Text>
          <Text style={styles.max}>/{` ${max} `}</Text>
          <Text style={styles.unit}>kcal</Text>
        </Text>
        <Button
          title="View History"
          onPress={() => router.push("/history/intake")}
          buttonStyle={styles.button}
          icon={icon}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 118,
    borderRadius: 12,
    backgroundColor: Colors.blue4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  title: {
    ...defaultStyles.subHeading,
    color: Colors.c400,
  },
  progress: {
    ...defaultStyles.heading2,
    color: Colors.blue1,
  },
  max: {
    ...defaultStyles.heading2,
    color: Colors.blue2,
  },
  unit: {
    ...defaultStyles.bodyBold,
    color: Colors.blue2,
  },
  button: {
    height: 28,
    backgroundColor: Colors.blue1,
    justifyContent: "flex-start",
    marginTop: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  buttonText: {
    ...defaultStyles.bodySmall,
    top: -1,
  },
});
