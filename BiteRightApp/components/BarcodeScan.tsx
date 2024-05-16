import { Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router } from "expo-router";

import ScanArea from "./ScanArea";

export default function BarcodeScan() {
  const [scanned, setScanned] = useState(false);

  let scannedValue = new Map<string, number>();

  const handleScannedBarcode = (scanningResult: BarcodeScanningResult) => {
    const points = scanningResult.cornerPoints.map((point) => ({
      x: point.x,
      y: point.y,
    }));

    let deviceWidth = Dimensions.get("window").width;
    let deviceHeight = Dimensions.get("window").height;

    const scanX = deviceWidth / 2 - deviceWidth * 0.35;
    const scanY = deviceHeight / 2 - deviceHeight * 0.25;

    const scannableArea = {
      width: [scanX, scanX + deviceWidth * 0.7],
      height: [scanY, scanY + deviceHeight * 0.5],
    };

    const isInsideArea = points.every(
      (point) =>
        point.x >= scannableArea.width[0] &&
        point.x <= scannableArea.width[1] &&
        point.y >= scannableArea.height[0] &&
        point.y <= scannableArea.height[1]
    );

    const data = scanningResult.data;
    if (scannedValue.get(data)! > 3) {
      setScanned(true);
    }

    if (scanned) {
      router.navigate(`/product/${data}`);
      setScanned(false);
      scannedValue.clear();
      return;
    }

    if (isInsideArea) {
      scannedValue.set(
        data,
        scannedValue.has(data) ? scannedValue.get(data)! + 1 : 1
      );
    }
  };

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      facing="back"
      barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8"] }}
      onBarcodeScanned={(scanningResult) =>
        handleScannedBarcode(scanningResult)
      }
    >
      <ScanArea />
    </CameraView>
  );
}
