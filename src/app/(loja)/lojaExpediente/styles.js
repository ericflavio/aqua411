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
    marginBottom: 10,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerEspecial: {
    flex: 0,
    alignItems:'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    marginBottom: 10,
    paddingBottom: 16,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerPicker: {
    alignSelf:'stretch',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: styleApp.color.tema10pSecundaria,
    borderRadius: 4
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