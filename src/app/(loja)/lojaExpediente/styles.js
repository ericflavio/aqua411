import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";

export const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 8
  },
  containerPrincipal: {
    flex: 0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerTimer: {
    flexDirection: "row",
    columnGap: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  containerPeriodo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});