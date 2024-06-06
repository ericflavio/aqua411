import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";

export const myStyles = StyleSheet.create({
  containerHeader: {
    borderWidth: styleApp.size.containerBordaOnOff,
    marginBottom: 30,
    width:"100%"
  },
  containerBasics: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap:7,
    borderWidth: styleApp.size.containerBordaOnOff,
    marginBottom: 8,
    width:"100%"
  },
  containerOthers: {
    alignItems:"flex-start",
    alignContent:"stretch",
    gap:8,
    borderWidth: styleApp.size.containerBordaOnOff,
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