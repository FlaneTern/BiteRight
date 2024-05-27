import Colors from "./Colors"
import { StyleSheet } from "react-native"

export const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.main,
    width: "80%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.c000,
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
  subheading: {
    fontSize: 16,
    fontFamily: "RobotoFlex",
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
    fontFamily: "RobotoFlex",
    fontWeight: "regular",
  },
  bodyUnderlined: {
    fontSize: 12,
    fontFamily: "RobotoFlex",
    fontWeight: "regular",
    textDecorationLine: "underline",
  },
})