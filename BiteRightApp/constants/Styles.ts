import Colors from "./Colors"
import { StyleSheet } from "react-native"

export const defaultStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.c000,
  },
  button: {
    backgroundColor: Colors.main,
    width: "80%",
    height: 40,
    borderRadius: 8,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  heading1: {
    fontSize: 24,
    fontFamily: "RobotoFlex",
    fontWeight: "bold",
    margin: 10,
  },
  heading2: {
    fontSize: 20,
    fontFamily: "RobotoFlex",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 16,
    fontFamily: "RobotoFlex",
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
    fontFamily: "RobotoFlex",
    fontWeight: "regular",
  },
  bodyBold: {
    fontSize: 12,
    fontFamily: "RobotoFlex",
    fontWeight: "bold",
  },
  bodyUnderlined: {
    fontSize: 12,
    fontFamily: "RobotoFlex",
    fontWeight: "regular",
    textDecorationLine: "underline",
  },
  bodySmall: {
    fontSize: 10,
    fontFamily: "RobotoFlex",
    fontWeight: "regular",
  }
})