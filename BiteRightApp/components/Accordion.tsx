import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import propTypes from "prop-types";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

interface Props {
  headerText: string;
  duration?: number;
  icon?: React.JSX.Element;
  children: React.JSX.Element;
}

const Accordion = (props: Props) => {
  const { headerText, duration = 200, icon, children } = props;
  //   const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

  const [open, setOpen] = useState(false);
  const animatedHeightValue = useSharedValue(0);
  const bodyHeight = useSharedValue(0);

  const headerPressHandler = () => {
    toggleOpen();
  };

  const toggleOpen = () => {
    toggleAnimationValue(!open);
    setOpen(!open);
  };

  const toggleAnimationValue = (isLocalOpen: boolean) => {
    if (isLocalOpen) {
      animatedHeightValue.value = withTiming(1, {
        duration: duration,
      });
    } else {
      animatedHeightValue.value = withTiming(0, {
        duration: duration,
      });
    }
  };

  const animatedHeight = useAnimatedStyle(() => {
    const height = interpolate(
      animatedHeightValue.value,
      [0, 1],
      [0, bodyHeight.value]
    );
    const marginTop = interpolate(animatedHeightValue.value, [0, 1], [0, 16]);
    return {
      height: height,
      marginTop: marginTop,
    };
  });

  const animatedRotation = useAnimatedStyle(() => {
    const rotate = interpolate(animatedHeightValue.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={headerPressHandler}
        activeOpacity={0.8}
      >
        <Text style={styles.headerText}>{headerText}</Text>
        <Animated.View style={animatedRotation}>{icon}</Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.bodyContainer, animatedHeight]}>
        <View
          style={styles.body}
          onLayout={(event) => {
            bodyHeight.value = event.nativeEvent.layout.height;
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "85%",
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.c000,
    height: 20,
  },
  headerText: {
    ...defaultStyles.subHeading,
    flex: 1,
  },
  bodyContainer: {
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  body: {
    position: "absolute",
    width: "100%",
  },
});

export default Accordion;
