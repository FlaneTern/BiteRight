import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";

const DietPage = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={styles.body}>
        We make sure to cater to your dietary preference. Please tick boxes that
        apply.
      </Text>
    </View>
  );
};

export default DietPage;

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
