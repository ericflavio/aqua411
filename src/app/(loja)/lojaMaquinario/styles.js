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
  containerPicker: {
    alignSelf:'stretch',
    marginTop: 12,
    marginLeft: 0,
    marginRight: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: styleApp.color.tema10pSecundaria,
    borderRadius: 4
  },
  
});