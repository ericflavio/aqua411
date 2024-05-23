import { StyleSheet } from "react-native";
import { myStylesColors } from './stylesColors';

export const myStylesComuns = StyleSheet.create({
  //Container
  containerBordaOnOff: 0,
  containerBordaRaio: 8,
  containerTamanhoMedioTelas: 800,

  containerPrincipalSafeArea: {
    flex: 1,
    backgroundColor: myStylesColors.corBackgroundClaro,
    alignItems: "center",
    borderWidth: 0,
    borderBlockColor: "#fa7251ff",
  },
  containerPrincipalScroll: {
    flex: 1,
    width: "86%",
    borderWidth: 0,
    borderColor: "#98e07eff",
    marginTop: "10%"
  },
  //Textos
  textoNegritoForte: "700",
  textoNegritoMedio: "500",
  TextoNegritoOff: "100",
  textoFonteTam0: 32,
  textoFonteTam1: 26,
  textoFonteTam2: 21,
  textoFonteTam3: 19,
  textoFonteTam4: 12,

  textoTituloPagina: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 25,
    color: myStylesColors.corTextoTitulo,
  },
  textoSubtitulo: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 0,
    color: myStylesColors.corTextoSubtitulo,
  },
  textoComum: {
    fontSize: 20,
    fontWeight: "500",
    color: myStylesColors.corTextoPadrao,
  },
  //Botões
  buttonContainerWithIcon: {
    flexDirection:"row",
    gap:6,
    borderWidth:0
  },
  buttonTextStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: myStylesColors.corTextoPadrao,
  },
  buttonTextStyleFlat: {
    fontSize: 18,
    fontWeight: "500",
    color: myStylesColors.corTextoPadrao,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: myStylesColors.corCinzMedio,
    borderWidth: 1,
    borderRadius: 8,
    borderBottomWidth: 4,
    marginTop: 12,
    marginBottom: 6,
    padding: 14,
    maxWidth: "100%",
    fontWeight: "700",
  },
  buttonFlat: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 0,
    padding: 4,
    maxWidth: "100%",
    borderWidth:0
  },

  //InputText
  inputText: {
    marginTop: 6,
    height: 54,
    margin: 0,
    borderWidth: 0,
    fontSize: 20,
    fontWeight: "bold",
    borderLeftWidth: 3,
    borderLeftColor: myStylesColors.corAzulClaro,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },

});