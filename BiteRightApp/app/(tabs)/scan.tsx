import { StyleSheet, View } from "react-native";
import { useCameraPermissions } from "expo-camera";

import BarcodeScan from "../../components/BarcodeScan";

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
    justifyContent: "center",
  },
});
