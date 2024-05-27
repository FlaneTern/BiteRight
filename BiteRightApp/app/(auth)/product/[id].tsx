import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ProductPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Stack.Screen
        options={{
          title: `${id}`,
          headerTitleAlign: "center",
        }}
      />
      <Text>ProductPage : {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
