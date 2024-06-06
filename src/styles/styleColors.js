import { StyleSheet } from "react-native";
//Obs: Importar apenas dentro da StylesComuns.

const tema = "claro";

//Cores da paleta do app
tema60A = "#ffffff";
tema60B = "#f5f1e0ff";
tema60C = "#364366ff", //"#262626ff";
  tema30A = "#ee7087ff", //"#4ea0f8ff";
  tema10A = "#84d3f8ff", //"#f8cd37ff";
  tema10B = "#968078ff",//"#8e7262ff"; "#669e8eff"

  //Textos gerais
  tema === "claro" ? textRegular = '#262626ff' : textRegular = '#f5f1e0ff';
tema === "claro" ? textoDestaque = tema10B : textoDestaque = tema10A;
tema === "claro" ? textoTitulo = tema10B : textoTitulo = tema60A;
tema === "claro" ? textSubtitulo = "#262626ff" : textSubtitulo = tema60B;

//Botões (incluindo também seus textos)
tema === "claro" ? buttonBackground = tema10A : buttonBackground = tema60B;
tema === "claro" ? buttonBorder = '#bebebeff' : buttonBorder = tema30A;
tema === "claro" ? textButtonRegular = "white" : textButtonRegular = "white";
tema === "claro" ? textButtonFlat = textRegular : textButtonFlat = textRegular;

//Background da safe-area
tema === "claro" ? backgroundSafeArea = '#f7f7f8' : backgroundSafeArea = '#262626ff';

export const styleColor = StyleSheet.create({
  //Paleta de cores do app
  tema60A,
  tema60B,
  tema60C,
  tema30A,
  tema10A,
  tema10B,
  //Botões
  buttonBackground,
  buttonBorder,
  //Textos dentro de botões
  textButtonRegular,
  textButtonFlat,
  //Textos fora de botões
  textRegular,
  textoDestaque,
  textoTitulo,
  textSubtitulo,
  //Container de InputTextos
  inputTextBorder: tema30A,
  //Azul
  azulEscuro: "#364366ff",
  azulClaro: "#4ea0f8ff",
  //Cinza
  cinzaEscuro: "#606060ff",
  cinzaMedio: "#bebebeff",
  cinzaClaro: "#f1f1f1ff",
  //Preto
  pretoAbsoluto: "#000000ff",
  pretoRelativo: "#262626ff",
  //Variados
  erro: "#fa7251ff",
  alerta: "#ffe275ff",
  sucesso: "#669e8eff",
  //Activity Indicadtor
  activityIndicatorCollor: "#262626ff",
  //Background
  backgroundSafeArea,
});