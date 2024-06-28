import { StyleSheet, StatusBar, View, Text } from "react-native";
import { styleColor } from './styleColors';
import { styleSize } from './styleSize';
import { MaterialIcons } from "@expo/vector-icons";

export function separator (miolo) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width:'100%', marginTop:18, marginBottom:12}}>
      <View style={{ height: 1, backgroundColor: '#eee', width: '100%', flexShrink:1 }} />
      <Text style={styleApp.textSmall}>{miolo}</Text>
      <View style={{ height: 1, backgroundColor: '#eee', width: '100%', flexShrink:1 }} />
    </View>
  )
}

export const styleApp = StyleSheet.create({
  size: styleSize,
  color: styleColor,

  //Container
  containerBorderRadius: styleSize.containerBorderRadius,
  containerTamanhoMedioTelas: styleSize.containerTamanhoMedioTelas,

  containerSafeArea: { //Com padding top
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: styleColor.backgroundSafeArea,
    alignItems: "center",
    borderWidth: styleSize.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
    //padding: styleSize.containerDistanciamentoHorizontalRegular,
    paddingTop: StatusBar.currentHeight,
  },
  containerScroll: { // Com borda lateral 
    flex: 0,
    width: styleSize.ContainerOcupacaoHorizontalParcial, //%
    borderWidth: styleSize.containerBordaOnOff,
    borderColor: "#98e07eff",
  },
  containerScrollStyleContent: {
    justifyContent: "flex-start",
    paddingBottom: 72,
  },
  containerButtonBottom: {
   justifyContent: 'flex-end', 
   marginHorizontal: styleSize.containerDistanciamentoHorizontalRegular
  },
  //Textos
  textTitulo: {
    fontFamily: 'Roboto-Bold',
    fontSize: styleSize.textoSize0,
    //fontWeight: styleSize.textoNegritoForte,
    marginTop: 20,
    marginBottom: 20,
    color: styleColor.textoTitulo,
  },
  textSubtitulo: {
    fontFamily: 'Roboto-Medium',
    fontSize: styleSize.textoSize1,
    //fontWeight: styleSize.textoNegritoForte,
    marginTop: 0,
    color: styleColor.textSubtitulo,
  },
  textRegular: {
    fontFamily: 'Roboto-Regular',
    fontSize: styleSize.textoSize3,
    //fontWeight: styleSize.textoNegritoMedio,
    color: styleColor.textRegular,
  },
  textSmall: {
    fontFamily: 'Roboto-Light', 
    fontSize: styleSize.textoSize5,
    //fontWeight: styleSize.TextoNegritoOff,
    color: styleColor.textRegular,
  },
  textSmallItalico: {
    fontFamily: 'Roboto-LightItalic', 
    fontSize: styleSize.textoSize5,
    //fontWeight: styleSize.TextoNegritoOff,
    color: styleColor.textRegular,
  },
  //Textos dentro dos botões
  textButtonRegular: {
    fontFamily: 'Roboto-Bold',
    fontSize: styleSize.textoSize4,
    //fontWeight: styleSize.textoNegritoForte,
    color: styleColor.textButtonRegular,
  },
  textButtonFlat: {
    fontFamily: 'Roboto-Regular',
    fontSize: styleSize.textoSize4,
    //fontWeight: styleSize.textoNegritoMedio,
    color: styleColor.textButtonFlat,
  },

  //Botões: estilo do touchable
  buttonHC: { //Horizontal centralizado
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: styleColor.buttonBackground,
    borderColor: styleColor.buttonBorder,
    borderWidth: styleSize.buttonBorderWidth,
    borderRadius: styleSize.buttomBorderRadius,
    borderBottomWidth: styleSize.buttonBorderWidthBottom,
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
    backgroundColor: styleColor.buttonBackground,
    borderColor: styleColor.buttonBorder,
    borderWidth: styleSize.buttonBorderWidth,
    borderRadius: styleSize.buttomBorderRadius,
    borderBottomWidth: styleSize.buttonBorderWidthBottom,
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
    minHeight: 60,
    minWidth: "50%",
    borderWidth: styleSize.buttonBorderWidthFlat,
    borderRadius: styleSize.buttomBorderRadius,
    gap: 4
  },
  buttonFlatVBorda: { //Vertical flat, centralizado, com borda
    flexDirection: "column",
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: styleColor.cinzaMedio,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    minHeight: 40,
    width: '100%',
    minWidth: "40",
    borderWidth: 1,
    borderRadius: styleSize.buttomBorderRadius,
    gap: 4
  },
  buttonFlatHL: { //Horizontal flat, esquerdo
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: styleColor.buttonBorder,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    paddingLeft: 8,
    minHeight: 60,
    minWidth: "100%",
    borderWidth: styleSize.buttonBorderWidthFlat,
    borderRadius: styleSize.buttomBorderRadius,
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
    borderWidth: styleSize.buttonBorderWidthFlat,
    borderRadius: 0,
    borderColor: styleColor.buttonBorder,
    gap: 6,
  },
  buttonFlatHL_list: { //Horizontal flat, esquerdo, estilo lista
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: styleColor.buttonBorder,
    marginTop: 0,
    marginBottom: 0,
    padding: 4,
    paddingLeft: 8,
    minHeight: 60,
    minWidth: "100%",
    borderTopWidth: styleSize.buttonBorderWidthFlat,
    borderBottomWidth: styleSize.buttonBorderWidthFlat / 2,
    borderRadius: 0,
    gap: 6
  },
  //Frases que se repetem
  textFraseOpcaoDeAssinantes: "Opções para assinantes do app",

});