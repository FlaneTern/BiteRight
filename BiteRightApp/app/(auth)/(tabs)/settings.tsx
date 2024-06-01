import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { searchByBarcodes, searchItems } from "@/api/Nutrition";

export default function Settings() {
  const { signOut } = useAuth();

  const [query, setQuery] = useState("");
  const [barcode, setBarcode] = useState("");

  const onSearch = () => {
    searchItems(query);
  };

  const onSearchBarcode = () => {
    searchByBarcodes(barcode);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Text>Settings</Text>
      <Button title="Sign Out" onPress={() => signOut()} />

      <TextInput placeholder="Query" onChangeText={setQuery} />
      <Button title="Search" onPress={onSearch} />

      <TextInput placeholder="Barcode" onChangeText={setBarcode} />
      <Button title="Search" onPress={onSearchBarcode} />
    </View>
  );
}

const styles = StyleSheet.create({});
