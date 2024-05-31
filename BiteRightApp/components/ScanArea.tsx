import {
  DimensionValue,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { FC, memo, useRef } from "react";

type EdgePosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type OnLayoutChangeHandler = (event: LayoutChangeEvent) => void;

interface ScanAreaProps {
  width?: DimensionValue;
  height?: DimensionValue;
  edgeWidth?: DimensionValue;
  edgeHeight?: DimensionValue;
  edgeColor?: string;
  edgeRadius?: number;
  edgeBorderWidth?: DimensionValue;
  backgroundColor?: string;
  maskOpacity?: number;
  onLayoutChange?: OnLayoutChangeHandler;
}

export const ScanArea: FC<ScanAreaProps> = memo(
  ({
    width = "70%",
    height = "50%",
    edgeWidth = 30,
    edgeHeight = 30,
    edgeColor = "white",
    edgeRadius = 12.5,
    edgeBorderWidth = 5,
    maskOpacity = 0.75,
    backgroundColor = "black",
    onLayoutChange,
  }) => {
    const edgeBorderStyle = useRef<{
      [position in EdgePosition]: ViewStyle;
    }>({
      topLeft: {
        borderTopWidth: edgeBorderWidth as number,
        borderLeftWidth: edgeBorderWidth as number,
        borderTopLeftRadius: edgeRadius,
        top: -(edgeBorderWidth as number),
        left: -(edgeBorderWidth as number),
      },
      topRight: {
        borderTopWidth: edgeBorderWidth as number,
        borderRightWidth: edgeBorderWidth as number,
        borderTopRightRadius: edgeRadius,
        top: -(edgeBorderWidth as number),
        right: -(edgeBorderWidth as number),
      },
      bottomLeft: {
        borderBottomWidth: edgeBorderWidth as number,
        borderLeftWidth: edgeBorderWidth as number,
        borderBottomLeftRadius: edgeRadius,
        bottom: -(edgeBorderWidth as number),
        left: -(edgeBorderWidth as number),
      },
      bottomRight: {
        borderBottomWidth: edgeBorderWidth as number,
        borderRightWidth: edgeBorderWidth as number,
        borderBottomRightRadius: edgeRadius,
        bottom: -(edgeBorderWidth as number),
        right: -(edgeBorderWidth as number),
      },
    });

    const scanEdgeSize = (
      size: DimensionValue | undefined,
      dimensionType: "width" | "height"
    ): DimensionValue => {
      if (typeof size === "string") {
        return `${parseFloat(size) + (dimensionType === "width" ? 2 : 1)}%`;
      }

      if (typeof size === "number") {
        const dimension = Dimensions.get("window")[dimensionType];
        const percentage = (1 / dimension) * 2500;

        return size + (dimensionType === "width" ? 1 : 2) * percentage;
      }

      return "0%";
    };

    const _renderEdge = (position: EdgePosition) => {
      const edgeStyle: ViewStyle = {
        width: edgeWidth,
        height: edgeHeight,
        borderColor: edgeColor,
        zIndex: 2,
      };

      return (
        <View
          style={{
            ...edgeStyle,
            ...edgeBorderStyle.current[position],
            ...styles[position],
          }}
        />
      );
    };

    const _width: DimensionValue = scanEdgeSize(width, "width");
    const _height: DimensionValue = scanEdgeSize(height, "height");

    return (
      <View style={styles.container}>
        <View
          onLayout={onLayoutChange || (() => {})}
          style={{
            ...styles.finder,
            width: _width,
            height: _height,
          }}
        >
          {_renderEdge("topLeft")}
          {_renderEdge("topRight")}
          {_renderEdge("bottomLeft")}
          {_renderEdge("bottomRight")}
        </View>
        <View style={styles.maskOuter}>
          <View
            style={{
              ...styles.maskRow,
              ...{ backgroundColor, opacity: maskOpacity, flex: 1 },
            }}
          />
          <View style={{ ...styles.maskCenter, height }}>
            <View style={{ backgroundColor, opacity: maskOpacity, flex: 1 }} />
            <View
              style={{
                ...styles.maskInner,
                width,
                height,
                borderRadius: edgeRadius,
              }}
            />
            <View style={{ backgroundColor, opacity: maskOpacity, flex: 1 }} />
          </View>
          <View
            style={{
              ...styles.maskRow,
              ...{ backgroundColor, opacity: maskOpacity, flex: 1 },
            }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  maskOuter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  finder: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  maskInner: {
    backgroundColor: "transparent",
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: {
    display: "flex",
    flexDirection: "row",
  },
  topLeft: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
