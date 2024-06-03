import { StyleSheet } from "react-native";
//Obs: Importar apenas dentro da StylesComuns.

const tema = "claro";

//Cores da paleta do app
corTema60A = "#ffffff";
corTema60B = "#f5f1e0ff";
corTema60C = "#262626ff";
corTema30 = "#4ea0f8ff";
corTema10A = "#f8cd37ff";
corTema10B = "#8e7262ff";

//Textos gerais
tema === "claro" ? textoPadrao = '#262626ff' : textoPadrao = '#f5f1e0ff';
tema === "claro" ? textoDestaque = corTema10B : textoDestaque = corTema10A;
tema === "claro" ? textoTitulo = corTema10B : textoTitulo = corTema60A;
tema === "claro" ? textoSubtitulo = "#262626ff" : textoSubtitulo = corTema60B;

//Botões (incluindo também seus textos)
tema === "claro" ? buttonBkg = '#f8cd37ff' : buttonBackground = '#f5f1e0ff';
tema === "claro" ? buttonBorder = '#606060ff' : buttonBorder = '#f8cd37ff';
tema === "claro" ? buttonText = textoPadrao : buttonText = textoPadrao;
tema === "claro" ? buttonIcon = textoPadrao : buttonIcon = textoPadrao;

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
  corAzulEscuro: "#376ba4ff",
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