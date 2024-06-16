import { StyleSheet } from "react-native";
import { styleApp } from "../../../../styles/styleApp";
import { styleColor } from "../../../../styles/styleColors";

export const styles = StyleSheet.create({
  containerHeader: {
    gap:8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderWidth: styleApp.size.containerBordaOnOff,
    marginBottom: 10,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
  },
});