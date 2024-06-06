//Tamanhos mais utilizados.
//Obs: Importar apenas dentro da StylesComuns.

//Borda arredondada (quando utilizada)
const bordaArredondadaParaBotaoSize = 8;
const bordaArredondadaParaContainers = 8;

//botões regulares (não flat): Bordas e cantos
const buttonBorderFlatRegular = 0;
const buttonBorderRegular = 0;
const buttonBorderBottomRegular = 0;
const buttonBorderRadiusRegular = bordaArredondadaParaBotaoSize;

export const styleSize = {
  //botões
  buttonBorderWidthFlat: buttonBorderFlatRegular,
  buttonBorderWidth: buttonBorderRegular,
  buttonBorderWidthBottom: buttonBorderBottomRegular,
  buttomBorderRadius: buttonBorderRadiusRegular,
  //Icones para botões e tabbars
  iconSizeButtonRegular: 30,
  iconSizeButtonSmall: 26,
  iconSizeButtonLarge: 34,
  iconSizeTabBar: 34,
  //Icones gerais
  iconSizeRegular: 32,
  iconSizeSmall: 28,
  iconSizeLarge: 38,
  //Container (Views, SafeArea, Scrolls)
  containerBordaOnOff: 0, //Ligar apenas para debug (padrão é desligado)
  containerBorderRadius: bordaArredondadaParaContainers,
  containerOcupacaoHorizontalFull: "100%",
  ContainerOcupacaoHorizontalParcial: "88%",
  containerOcupacaoMargens: 14,
  containerTamanhoMedioTelas: 800,
  //Textos
  textoNegritoForte: "700",
  textoNegritoMedio: "500",
  TextoNegritoOff: "100",
  textoSize0: 30,
  textoSize1: 24,
  textoSize2: 20,
  textoSize3: 20,
  textoSize4: 18,
  textoSize5: 16,
  //Activity Indicadtor
  activityIndicatorSize: "small",
};