import { StyleSheet, Dimensions } from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";
import { styleSize } from "../../../styles/styleSize";

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
  containerPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 44,
    padding: 6,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: styleApp.color.tema10pSecundaria,
    borderRadius: 4
  },
  containerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalView: {
    flex:1,
    flexShrink: 1,
    minHeight: 320,
    maxHeight: Dimensions.get('window').height - 200,
    width: "100%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 3,
    borderColor: styleColor.tema30pPrincipal,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 16,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  modalClose: {
    marginBottom: 6,
    alignSelf: "flex-end"
  }
});