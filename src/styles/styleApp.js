import { StyleSheet, StatusBar } from "react-native";
import { myStyleColor } from './stylesColors';
import { myStyleSize } from './styleSize';

export const myStyleApp = StyleSheet.create({
  size: myStyleSize,
  color: myStyleColor,
  //Container
  containerBordaRaio: myStyleSize.containerBordaRaio,
  containerTamanhoMedioTelas: myStyleSize.containerTamanhoMedioTelas,

  containerPrincipalSafeArea: {
    flex: 1,
    backgroundColor: myStyleColor.BkgSafeArea,
    alignItems: "center",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
    paddingTop: StatusBar.currentHeight
  },
  containerPrincipalScroll: {
    flex: 1,
    width: "86%",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
    marginTop: "10%"
  },
  containerPrincipalScrollWB: {
    flex: 1,
    width: "100%",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
    marginTop: "0%"
  },

  //Textos
  textoTituloPagina: {
    fontFamily: 'Lato-Bold',
    fontSize: myStyleSize.textoFonteTam0,
    //fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 20,
    marginBottom: 25,
    color: myStyleColor.corTextoTitulo,
  },
  textoSubtitulo: {
    fontFamily: 'Lato-Regular',
    fontSize: myStyleSize.textoFonteTam2,
    //fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 0,
    color: myStyleColor.corTextoSubtitulo,
  },
  textoComum: {
    fontFamily: 'Lato-Regular',
    fontSize: myStyleSize.textoFonteTam3,
    //fontWeight: myStyleSize.textoNegritoMedio,
    color: myStyleColor.corTextoPadrao,
  },
  textoPequeno: {
    fontFamily: 'Lato-Thin',
    fontSize: myStyleSize.textoFonteTam5,
    //fontWeight: myStyleSize.TextoNegritoOff,
    color: myStyleColor.corTextoPadrao,
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
  buttonFlatTranspHL: {//Horizontal flat, esquerdo, transparente
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
  buttonFlatV: { //Vertical flat, centralizado 
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: myStyleColor.corCinzaClaro,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    minHeight: 70,
    minWidth: "50%",
    borderWidth: 1,
    borderRadius: 6,
    gap: 6
  },
  buttonFlatHL: { //Horizontal flat, esquerdo
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: myStyleColor.corCinzaClaro,
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
  buttonFlatListHL: { //Horizontal flat, esquerdo, estilo lista
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: myStyleColor.corCinzaClaro,
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
    fontSize: myStyleSize.textoFonteTam4,
    fontWeight: myStyleSize.textoNegritoForte,
    color: myStyleColor.corTextoPadrao,
  },
  buttonTextStyleFlat: {
    fontSize: myStyleSize.textoFonteTam4,
    fontWeight: myStyleSize.textoNegritoMedio,
    color: myStyleColor.corTextoPadrao,
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
    borderBottomColor: myStyleColor.corInputTextBorder,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },

});