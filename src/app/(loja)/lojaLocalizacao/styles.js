import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";

export const styles = StyleSheet.create({
  containerHeader: {
    flexDirection:"row", 
    gap:8, 
    paddingLeft:8
  },
  containerPrincipal: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerBottom: {
    flexDirection:"row", 
    alignItems: 'center',
    marginTop: 10,
    gap:8, 
    padding:8,
    maxWidth:"100%",
    borderWidth:0
  },
});