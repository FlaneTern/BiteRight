import React from "react";
import { View } from "react-native";

import { defaultStyles } from "../constants/Styles";
import Login from "./login";

const Index = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <Login />
    </View>
  );
};

export default Index;
