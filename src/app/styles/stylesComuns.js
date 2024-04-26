import { StyleSheet } from "react-native";

export const myStylesComuns = StyleSheet.create({

  //Cores
  corTemaAppPrincipal: "#041e52ff",
  corTemaAppSecundario: "#2ba6daff",
  corTemaAppAuxiliar: "#606060ff",

  corAzulEscuro: "#041e52ff",
  corAzulClaro: "#2ba6daff",
  corCinzEscuro: "#606060ff",
  corCinzMedio: "#bebebeff",
  corCinzaClaro: "#dfdfdfff",
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
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 0,
    borderBlockColor: "#fa7251ff"
  },
  containerPrincipalScroll: {
    flex: 1,
    width: "86%",
    borderWidth: 0,
    borderColor: "#98e07eff"
  },

  //Textos
  textoBordaOnOff: 0,
  textoNegritoForte: "700",
  textoNegritoMedio: "500",
  TextoNegritoOff: "100",
  textoFonteTam0: 40,
  textoFonteTam1: 30,
  textoFonteTam2: 20,
  textoFonteTam3: 18,
  textoFonteTam4: 16,
  textoFonteTam5: 12,
  textoFonteTam6: 10,

  textoTituloPagina: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 40,
    color: "#041e52ff",
    borderWidth: 0
  },
  textoSubtitulo: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    color: "#1f1f1fff",
    borderWidth: 0
  },
  textoDestacado: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f1f1fff",
    borderWidth: 0
  },
  textoComum: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1f1f1fff",
    borderWidth: 0
  },

  //Botões
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: "#8f8f8fff",
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 10,
    padding: 14,
    borderBottomWidth: 6,
    maxWidth: "80%",
    minWidth: 240,
    alignSelf: "center"
  },

});