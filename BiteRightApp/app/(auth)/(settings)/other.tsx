import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { fetchItemsByEAN } from "@/api/Nutrition";
import {
  resetConsumptionTable,
  checkStorageContent,
  resetMMKV,
  resetUserDB,
} from "@/utils/ResetData";
import { useSQLiteContext } from "expo-sqlite";

export default function Other() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const [barcode, setBarcode] = useState("");

  const db = useSQLiteContext();

  const onSearchBarcode = async () => {
    const response = await fetchItemsByEAN(barcode);
    console.log(response);
  };

  const resetStorage = async () => {
    await resetUserDB(db);
    resetMMKV();
  };

  const viewStorage = async () => {
    await checkStorageContent(db, user?.primaryEmailAddress?.emailAddress!);
  };

  const resetConsumption = async () => {
    await resetConsumptionTable(db);
  };

  return (
    <View
      style={[
        defaultStyles.pageContainer,
        { justifyContent: "center", alignItems: "center", gap: 8 },
      ]}
    >
      <Text>Settings</Text>
      <Button title="Sign Out" onPress={() => signOut()} />

      <TextInput
        placeholder="Barcode"
        onChangeText={setBarcode}
        style={{
          borderWidth: 1,
          borderColor: "black",
          width: 200,
          padding: 4,
        }}
      />
      <Button title="Search" onPress={onSearchBarcode} />
      <Button title="Reset Storage" onPress={resetStorage} />
      <Button title="CheckDBContent" onPress={viewStorage} />
      <Button title="ResetConsumption" onPress={resetConsumption} />
    </View>
  );
}

const styles = StyleSheet.create({});
