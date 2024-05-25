import { StyleSheet } from "react-native";
import { myStylesColors } from './stylesColors';
import { myStyleSize } from './stylesSize';

export const myStylesComuns = StyleSheet.create({
  //
  size: myStyleSize,
  //Icones
  iconSizeButtonRegular: myStyleSize.iconSizeButtonRegular,
  iconSizeButtonSmall: myStyleSize.iconSizeButtonSmall,
  iconSizeButtonLarge: myStyleSize.iconSizeButtonLarge,
  iconSizeTabBar: myStyleSize.iconSizeTabBar,
  iconSizeRegular: myStyleSize.iconSizeRegular,
  iconSizeSmall: myStyleSize.iconSizeSmall,
  iconSizeLarge: myStyleSize.iconSizeLarge,

  //Container
  containerBordaRaio: myStyleSize.containerBordaRaio,
  containerTamanhoMedioTelas: myStyleSize.containerTamanhoMedioTelas,

  containerPrincipalSafeArea: {
    flex: 1,
    backgroundColor: myStylesColors.corBackgroundClaro,
    alignItems: "center",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
  },
  containerPrincipalScroll: {
    flex: 1,
    width: "86%",
    borderWidth: myStyleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
    marginTop: "10%"
  },

  //Textos
  textoTituloPagina: {
    fontSize: myStyleSize.textoFonteTam0,
    fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 40,
    marginBottom: 25,
    color: myStylesColors.corTextoTitulo,
  },
  textoSubtitulo: {
    fontSize: myStyleSize.textoFonteTam2,
    fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 0,
    color: myStylesColors.corTextoSubtitulo,
  },
  textoComum: {
    fontSize: myStyleSize.textoFonteTam3,
    fontWeight: myStyleSize.textoNegritoMedio,
    color: myStylesColors.corTextoPadrao,
  },
  textoPequeno: {
    fontSize: myStyleSize.textoFonteTam5,
    fontWeight: myStyleSize.TextoNegritoOff,
    color: myStylesColors.corTextoPadrao,
  },
  //Botões
  buttonContainerWithIconHL: {
    flexDirection:"row",
    alignItems:"flex-start",
    gap:6,
    borderWidth:0,
    paddingLeft:8,
    minWidth: "100%",
  },
  buttonContainerWithIconHC: {
    flexDirection:"row",
    justifyContent:"center",
    gap:6,
    borderWidth:0,
    minWidth: "100%",
  },
  buttonContainerWithIconV: {
    flexDirection:"column",
    gap:6,
    alignItems:"center",
    borderWidth:0
  },
  buttonTextStyle: {
    fontSize: myStyleSize.textoFonteTam4,
    fontWeight: myStyleSize.textoNegritoForte,
    color: myStylesColors.corTextoPadrao,
  },
  buttonTextStyleFlat: {
    fontSize: myStyleSize.textoFonteTam4,
    fontWeight: myStyleSize.textoNegritoMedio,
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
  buttonFlatWithBgCollor: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    minHeight: 70,
    minWidth: "50%",
    borderWidth:1,
    borderColor: myStylesColors.corCinzaClaro,
    borderRadius: 6
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
    borderBottomColor: myStylesColors.corInputTextBorder,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },

});