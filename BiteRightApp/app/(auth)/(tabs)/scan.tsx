import { StyleSheet, View } from "react-native";
import { useCameraPermissions } from "expo-camera";

import BarcodeScan from "../../../components/BarcodeScan";
import Colors from "../../../constants/Colors";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  // const [flashMode, setFlashMode] = useState("off");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
  }

  return (
    <View style={styles.container}>
      <BarcodeScan />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.c400,
    justifyContent: "center",
  },
});
