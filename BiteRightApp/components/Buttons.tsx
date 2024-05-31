import React from "react";
import {
  DimensionValue,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  buttonWidth: DimensionValue;
  buttonHeight: DimensionValue;
  buttonColor: string;
  textColor: string;
  text?: string;
  textSize?: number;
  onPress?: () => void;
}

const Buttons: React.FC<ButtonProps> = ({
  buttonWidth,
  buttonHeight,
  buttonColor,
  textColor,
  text,
  textSize,
  onPress,
}) => {
  const buttonStyle: ViewStyle = {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: buttonColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  };

  const textStyle: TextStyle = {
    color: textColor,
    fontSize: textSize || 12,
    fontWeight: "bold",
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.7}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;
