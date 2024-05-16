import { StyleSheet, Text, View } from "react-native";

export default function ScanArea() {
  return (
    <View style={styles.container}>
      <View style={styles.focused} />
      <Text style={styles.text}>Align the barcode with the scanner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000AA",
  },
  focused: {
    width: "70%",
    height: "50%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#FFFFFF01",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    top: 50,
  },
});
