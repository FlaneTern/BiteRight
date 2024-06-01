import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router } from "expo-router";

import { ScanArea } from "./ScanArea";

export default function BarcodeScan() {
  const [scanned, setScanned] = useState(false);
  const [ID, setID] = useState("");
  const scannedValue = new Map();

  const handleScannedBarcode = (scanningResult: BarcodeScanningResult) => {
    const { cornerPoints, data } = scanningResult;
    const points = cornerPoints.map((point) => ({ x: point.x, y: point.y }));

    const { width, height } = Dimensions.get("window");
    const scanArea = {
      xMin: width * 0.15,
      xMax: width * 0.85,
      yMin: height * 0.25,
      yMax: height * 0.75,
    };

    const isInsideArea = points.every(
      (point) =>
        point.x >= scanArea.xMin &&
        point.x <= scanArea.xMax &&
        point.y >= scanArea.yMin &&
        point.y <= scanArea.yMax
    );

    if (scannedValue.get(data) > 3) {
      setScanned(true);
      setID(data);
    }

    if (scanned) {
      router.navigate(`/product/${ID}`);
      setScanned(false);
      setID("");
      scannedValue.clear();
      return;
    }

    if (isInsideArea) {
      scannedValue.set(data, (scannedValue.get(data) || 0) + 1);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={(scanningResult) =>
          handleScannedBarcode(scanningResult)
        }
      >
        <ScanArea />
      </CameraView>
      <Text style={styles.text}>Align the barcode within the{"\n"}scanner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 60,
    textAlign: "center",
  },
});
