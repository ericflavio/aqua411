import { StyleSheet } from "react-native";

export const myStylesComuns = StyleSheet.create({

  //Cores
  corTemaAppPrincipal: "#041e52ff",
  corTemaAppSecundario: "#2ba6daff",
  corTemaAppAuxiliar: "#606060ff",
  corBackground: "#dcedffff",
  corAzulEscuro: "#041e52ff",
  corAzulClaro: "#2ba6daff",
  corCinzEscuro: "#606060ff",
  corCinzMedio: "#bebebeff",
  corCinzaClaro: "#f1f1f1ff",
  corPretoAbsoluto: "#000000ff",
  corPretoRelativo: "#1f1f1fff",
  corErro: "#fa7251ff",
  corAlerta: "#ffe275ff",
  corSucesso: "#98e07eff",

  //Container
  containerBordaOnOff: 0,
  containerBordaRaio: 8,
  containerTamanhoMedioTelas: 800,

  containerPrincipalSafeArea: {
    flex: 1,
    backgroundColor: "#dcedffff",
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
  textoBordaOnOff: 0,
  textoNegritoForte: "700",
  textoNegritoMedio: "500",
  TextoNegritoOff: "100",
  textoFonteTam0: 34,
  textoFonteTam1: 28,
  textoFonteTam2: 20,
  textoFonteTam3: 18,

  textoTituloPagina: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 25,
    color: "#041e52ff",
    borderWidth: 0
  },
  textoSubtitulo: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 0,
    color: "#1f1f1fff",
    borderWidth: 0
  },
  textoComum: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1f1f1fff",
    borderWidth: 0
  },
  //Botões
  buttonTextoStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f1f1fff",
  },
  buttonTextoStyleFlat: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1f1f1fff",
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: "#8f8f8fff",
    borderWidth: 1,
    borderRadius: 8,
    margin: 6,
    padding: 14,
    borderBottomWidth: 4,
    maxWidth: "100%",
    minWidth: "50%",
    alignSelf: "center",
    fontWeight: "700"
  },
  buttonFlat: {
    backgroundColor: 'transparent',
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
    borderLeftWidth: 1,
    borderLeftColor: "#2ba6daff",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },

});