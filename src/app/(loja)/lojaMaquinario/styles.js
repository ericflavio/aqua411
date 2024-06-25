import { StyleSheet, Dimensions } from "react-native";
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 16,
    padding: 8,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerFlagStatus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 0,
    width: '100%'
  },
  containerTogle: {
    width:'100%',
    flexWrap: 'wrap',
    flexDirection: 'row', 
    justifyContent: "flex-start", 
    alignItems: "center", 
    gap: 4,
  },
  containerInfo: {
    flexShrink: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 0, 
    borderColor: styleApp.color.cinzaClaro, 
    width: '100%', 
    height: '100%' 
  },
  containerPicker: {
    alignSelf: 'stretch',
    marginTop: 12,
    marginLeft: 0,
    marginRight: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: styleApp.color.tema10pSecundaria,
    borderRadius: 4
  },
  containerModal: {
    flex: 1,
    marginTop: 0,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalView: {
    flexShrink: 1,
    marginTop: 0,
    minHeight: Dimensions.get('window').height - 300,
    maxHeight: Dimensions.get('window').height - 100,
    width: "100%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 3,
    borderColor: styleApp.color.tema30pPrincipal,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 16,
    paddingTop: 0,
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