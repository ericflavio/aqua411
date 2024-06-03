import { StyleSheet } from "react-native";
//Obs: Importar apenas dentro da StylesComuns.

const tema = "claro";

//Cores da paleta do app
tema60A = "#ffffff";
tema60B = "#f5f1e0ff";
tema60C = "#364366ff", //"#262626ff";
tema30A = "#84d3f8ff", //"#4ea0f8ff";
tema10A = "#ee7087ff", //"#f8cd37ff";
tema10B = "#968078ff",//"#8e7262ff"; "#669e8eff"

//Textos gerais
tema === "claro" ? textoPadrao = '#262626ff' : textoPadrao = '#f5f1e0ff';
tema === "claro" ? textoDestaque = tema10B : textoDestaque = tema10A;
tema === "claro" ? textoTitulo = tema10B : textoTitulo = tema60A;
tema === "claro" ? textoSubtitulo = "#262626ff" : textoSubtitulo = tema60B;

//Botões (incluindo também seus textos)
tema === "claro" ? buttonBkg = tema10A : buttonBackground = tema60B;
tema === "claro" ? buttonBorder = '#606060ff' : buttonBorder = tema30A;
tema === "claro" ? buttonText = "white" : buttonText = "white";
tema === "claro" ? buttonTextFlat = textoPadrao : buttonTextFlat = textoPadrao;

//Background da safe-area
tema === "claro" ? bkgSafeArea = '#ffffff' : bkgSafeArea = '#262626ff';

export const myStyleColor = StyleSheet.create({
  //CPaleta de cores do app
  tema60A,
  tema60B,
  tema60C,
  tema30A,
  tema10A,
  tema10B,
  //Botões
  buttonBkg,
  buttonBorder,
  buttonText,
  buttonTextFlat,
  buttonIcon,
  //Background
  bkgSafeArea,
  //Textos
  textoPadrao,
  textoDestaque,
  textoTitulo,
  textoSubtitulo,
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
  sucesso: "#98e07eff",
});