import { StyleSheet, StatusBar } from "react-native";
import { myStyleColor } from './stylesColors';
import { myStyleSize } from './styleSize';

export const myStyleApp = StyleSheet.create({
  size: myStyleSize,
  color: myStyleColor,

  //Container
  containerBordaRaio: myStyleSize.containerBordaRaio,
  containerTamanhoMedioTelas: myStyleSize.containerTamanhoMedioTelas,

  containerSafeArea: { //Com padding
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: myStyleColor.bkgSafeArea,
    alignItems: "center",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
    paddingTop: StatusBar.currentHeight
  },
  containerSafeAreaSemPadding: { //Sem padding
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: myStyleColor.bkgSafeArea,
    alignItems: "center",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
  },
  containerScroll: { // Com borda lateral
    flex: 0,
    width: "88%",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
  },
  containerScrollWB: { // Sem Borda lateral
    flex: 0,
    width: "100%",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
  },
  containerScrollContent: {
    justifyContent: "flex-start",
    paddingBottom: 72,
  },
  continerViewPrincipal: { //Com borda lateral
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: myStyleColor.bkgSafeArea,
    borderWidth: myStyleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
    marginBottom: 40,
    width: "88%",
  },

  //Textos
  textoTituloPagina: {
    fontFamily: 'Lato-Bold',
    fontSize: myStyleSize.textoSize0,
    //fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 20,
    marginBottom: 25,
    color: myStyleColor.textoTitulo,
  },
  textoSubtitulo: {
    fontFamily: 'Lato-Regular',
    fontSize: myStyleSize.textoSize2,
    //fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 0,
    color: myStyleColor.textoSubtitulo,
  },
  textoRegular: {
    fontFamily: 'Lato-Regular',
    fontSize: myStyleSize.textoSize3,
    //fontWeight: myStyleSize.textoNegritoMedio,
    color: myStyleColor.textoRegular,
  },
  textoPequeno: {
    fontFamily: 'Lato-Thin',
    fontSize: myStyleSize.textoSize5,
    //fontWeight: myStyleSize.TextoNegritoOff,
    color: myStyleColor.textoRegular,
  },

  //Botões: estilo do touchable
  buttonHC: { //Horizontal centralizado
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: myStyleColor.buttonBkg,
    borderColor: myStyleColor.buttonBorder,
    borderWidth: 1,
    borderRadius: 9,
    borderBottomWidth: 4,
    marginTop: 12,
    marginBottom: 6,
    padding: 14,
    gap: 6,
    minWidth: "100%",
    fontWeight: "700",
  },
  buttonFlatV: { //Vertical flat, centralizado 
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: myStyleColor.cinzaClaro,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    minHeight: 70,
    minWidth: "49%",
    borderWidth: 1,
    borderRadius: 6,
    gap: 4
  },
  buttonFlatHL: { //Horizontal flat, esquerdo
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: myStyleColor.cinzaClaro,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    paddingLeft: 8,
    minHeight: 70,
    minWidth: "100%",
    borderWidth: 1,
    borderRadius: 6,
    gap: 6
  },
  buttonFlatHL_transp: {//Horizontal flat, esquerdo, transparente
    flexDirection: "row",
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 0,
    padding: 4,
    maxWidth: "100%",
    borderWidth: 0,
    gap: 6,
  },
  buttonFlatHL_list: { //Horizontal flat, esquerdo, estilo lista
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: myStyleColor.cinzaClaro,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    paddingLeft: 8,
    minHeight: 70,
    minWidth: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderRadius: 0,
    gap: 6
  },
  //Botões: estilo do texto dentro do touchable
  buttonTextStyle: {
    fontSize: myStyleSize.textoSize4,
    fontWeight: myStyleSize.textoNegritoForte,
    color: myStyleColor.buttonText,
  },
  buttonTextStyleFlat: {
    fontSize: myStyleSize.textoSize4,
    fontWeight: myStyleSize.textoNegritoMedio,
    color: myStyleColor.buttonTextFlat,
  },

  //InputText
  inputText: {
    marginTop: 6,
    height: 54,
    margin: 0,
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: myStyleColor.inputTextBorder,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },

});