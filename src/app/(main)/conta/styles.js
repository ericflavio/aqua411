import { StyleSheet } from "react-native";
import { myStyleApp } from "../../../styles/styleApp";
import { myStyleColor } from "../../../styles/stylesColors";

export const myStyles = StyleSheet.create({
  containerHeader: {
    borderWidth: myStyleApp.containerBordaOnOff,
    marginBottom: 30,
    width:"100%"
  },
  containerBasics: {
    flexDirection: "row",
    alignContent: "stretch",
    gap:8,
    borderWidth: myStyleApp.containerBordaOnOff,
    marginBottom: 30,
    width:"100%"
  },
  containerOthers: {
    alignItems:"flex-start",
    alignContent:"stretch",
    gap:8,
    borderWidth: myStyleApp.containerBordaOnOff,
    marginBottom: 30,
    width:"100%"
  },
  imageUser: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
  },
});