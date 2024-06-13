import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import { getEarliestConsumptionDate } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { formatToDayMonthDay } from "@/utils/DateFormat";
import { FlashList } from "@shopify/flash-list";
import Separator from "@/components/Separator";
import { Link, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const IntakeHistory = () => {
  const [date, setDate] = useState<string>("");

  const { user } = useUser();

  const db = useSQLiteContext();
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (email) {
      getEarliestConsumptionDate(db, email).then((result) => {
        if (result) {
          setDate(result);
        }
      });
    }
  }, [email]);

  const dates = [];
  const today = new Date();
  const currentDate = new Date(date);

  while (currentDate <= today) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  dates.sort((a, b) => b.getTime() - a.getTime());

  return (
    <View style={defaultStyles.pageContainer}>
      <FlashList
        data={dates}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() =>
              router.navigate({
                pathname: "/(auth)/(settings)/history/[id]",
                params: { id: item.toISOString() },
              })
            }
          >
            <Text style={styles.text}>{formatToDayMonthDay(item)}</Text>
            <Entypo name="chevron-thin-right" size={16} color="#000" />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default IntakeHistory;

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
  },
  text: {
    ...defaultStyles.bodyBold,
    fontSize: 14,
  },
});
