import {
  StyleSheet,
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { forwardRef } from "react";

import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

type ButtonProps = {
  onPress?: TouchableOpacityProps["onPress"];
  buttonStyle?: TouchableOpacityProps["style"];
  textStyle?: TextStyle;
  image?: any;
  icon?: React.JSX.Element;
  title?: string;
} & TouchableOpacityProps;

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ onPress, title, image, icon, buttonStyle, textStyle }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[defaultStyles.button, buttonStyle]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {image && <Image source={image} style={styles.icon} />}
        {icon}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

export default Button;

const styles = StyleSheet.create({
  buttonText: {
    ...defaultStyles.subHeading,
    color: Colors.c000,
    textAlign: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
