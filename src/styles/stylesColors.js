import { StyleSheet } from "react-native";
//Obs: Importar apenas dentro da StylesComuns.

const tema = "claro";

//Cores da paleta do app
corTema60A = "#ffffff";
corTema60B = "#f5f1e0ff";
corTema60C = "#364366ff", //"#262626ff";
corTema30 = "#84d3f8ff", //"#4ea0f8ff";
corTema10A = "#ee7087ff", //"#f8cd37ff";
corTema10B = "#669e8eff", //#968078ff",//"#8e7262ff";

//Textos gerais
tema === "claro" ? textoPadrao = '#262626ff' : textoPadrao = '#f5f1e0ff';
tema === "claro" ? textoDestaque = corTema10B : textoDestaque = corTema10A;
tema === "claro" ? textoTitulo = corTema10B : textoTitulo = corTema60A;
tema === "claro" ? textoSubtitulo = "#262626ff" : textoSubtitulo = corTema60B;

//Botões (incluindo também seus textos)
tema === "claro" ? buttonBkg = corTema10A : buttonBackground = corTema60B;
tema === "claro" ? buttonBorder = '#606060ff' : buttonBorder = corTema30;
tema === "claro" ? buttonText = "white" : buttonText = "white";
tema === "claro" ? buttonTextFlat = textoPadrao : buttonTextFlat = textoPadrao;
tema === "claro" ? buttonIcon = "white" : buttonIcon = "white";

//Background da safe-area
tema === "claro" ? BkgSafeArea = '#ffffff' : BkgSafeArea = '#262626ff';

export const myStyleColor = StyleSheet.create({
  //CPaleta de cores do app
  corTema60A,
  corTema60B,
  corTema60C,
  corTema30,
  corTema10A,
  corTema10B,
  //Botões
  buttonBkg,
  buttonBorder,
  buttonText,
  buttonIcon,
  //Background
  BkgSafeArea,
  //Textos
  corTextoPadrao: textoPadrao,
  corTextoDestaque: textoDestaque,
  corTextoTitulo: textoTitulo,
  corTextoSubtitulo: textoSubtitulo,
  //Container de InputTextos
  corInputTextBorder: corTema30,
  //Azul
  corAzulEscuro: "#364366ff",
  corAzulClaro: "#4ea0f8ff",
  //Cinza
  corCinzaEscuro: "#606060ff",
  corCinzaMedio: "#bebebeff",
  corCinzaClaro: "#f1f1f1ff",
  //Preto
  corPretoAbsoluto: "#000000ff",
  corPretoRelativo: "#262626ff",
  //Variados
  corErro: "#fa7251ff",
  corAlerta: "#ffe275ff",
  corSucesso: "#98e07eff",
});