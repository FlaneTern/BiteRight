import { StyleSheet, View } from "react-native";
import React from "react";
import Login from "./login";
import Colors from "../constants/Colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.c000,
  },
});
