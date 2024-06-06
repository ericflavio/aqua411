import { StyleSheet, StatusBar } from "react-native";
import { styleColor } from './styleColors';
import { styleSize } from './styleSize';

export const styleApp = StyleSheet.create({
  size: styleSize,
  color: styleColor,

  //Container
  containerBorderRadiusOn: styleSize.containerBorderRadiusOn,
  containerBorderRadiusOff: styleSize.containerBorderRadiusOff,
  containerTamanhoMedioTelas: styleSize.containerTamanhoMedioTelas,

  containerSafeArea: { //Com padding
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: styleColor.bkgSafeArea,
    alignItems: "center",
    borderWidth: styleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
    paddingTop: StatusBar.currentHeight
  },
  containerSafeAreaSemPadding: { //Sem padding
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: styleColor.bkgSafeArea,
    alignItems: "center",
    borderWidth: styleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
  },
  containerScroll: { // Com borda lateral
    flex: 0,
    width: styleSize.ContainerOcupacaoHorizontalParcial,
    borderWidth: styleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
  },
  containerScrollFull: { // Sem borda lateral. Encosta nos cantos da tela
    flex: 0,
    width: styleSize.containerOcupacaoHorizontalFull,
    borderWidth: styleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
  },
  containerScrollStyleContent: {
    justifyContent: "flex-start",
    paddingBottom: 72,
  },
  //Textos
  textoTituloPagina: {
    fontFamily: 'Lato-Bold',
    fontSize: styleSize.textoSize0,
    //fontWeight: styleSize.textoNegritoForte,
    marginTop: 20,
    marginBottom: 20,
    color: styleColor.textoTitulo,
  },
  textoSubtitulo: {
    fontFamily: 'Lato-Bold',
    fontSize: styleSize.textoSize1,
    //fontWeight: styleSize.textoNegritoForte,
    marginTop: 0,
    color: styleColor.textoSubtitulo,
  },
  textoRegular: {
    fontFamily: 'Lato-Regular',
    fontSize: styleSize.textoSize3,
    //fontWeight: styleSize.textoNegritoMedio,
    color: styleColor.textoRegular,
  },
  textoPequeno: {
    fontFamily: 'Lato-Thin',
    fontSize: styleSize.textoSize5,
    //fontWeight: styleSize.TextoNegritoOff,
    color: styleColor.textoRegular,
  },

  //Botões: estilo do touchable
  buttonHC: { //Horizontal centralizado
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: styleColor.buttonBkg,
    borderColor: styleColor.buttonBorder,
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
  buttonHR: { //Horizontal justificado à direita
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: styleColor.buttonBkg,
    borderColor: styleColor.buttonBorder,
    borderWidth: 1,
    borderRadius: 9,
    borderBottomWidth: 4,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 4,
    paddingRight: 4,
    gap: 6,
    //minWidth: "100%",
  },
  buttonFlatV: { //Vertical flat, centralizado 
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: styleColor.cinzaClaro,
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
    borderColor: styleColor.cinzaClaro,
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
    justifyContent: "flex-start",
    alignItems: 'center',
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
    borderColor: styleColor.cinzaClaro,
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
  buttonTextRegular: {
    fontSize: styleSize.textoSize4,
    fontWeight: styleSize.textoNegritoForte,
    color: styleColor.buttonText,
  },
  buttonTextFlat: {
    fontSize: styleSize.textoSize4,
    fontWeight: styleSize.textoNegritoMedio,
    color: styleColor.buttonTextFlat,
  },

  //InputText
  inputText: {
    marginTop: 6,
    height: 54,
    margin: 0,
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: styleColor.inputTextBorder,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },

});