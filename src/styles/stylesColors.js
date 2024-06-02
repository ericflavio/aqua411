import { StyleSheet } from "react-native";
//Obs: Importar apenas dentro da StylesComuns.

const tema = "claro";

//Botões
tema === "claro"? buttonBackground = '#f8cd37ff' : buttonBackground = '#f5f1e0ff';
tema === "claro"? buttonBorder = '#606060ff' : buttonBorder = '#f8cd37ff';
tema === "claro"? buttonText = '#ffffff' : buttonText = '#343434ff';
tema === "claro"? buttonIcon = '#ffffff' : buttonIcon = '#f8cd37ff';

export const myStyleColor = StyleSheet.create({
  buttonBackground,
  buttonBorder,
  buttonText,
  buttonIcon,
  //Tema
  corTemaAppPrincipal: "#041e52ff",
  corTemaAppSecundario: "#2ba6daff",
  corTemaAppAuxiliar: "#606060ff",
  //Textos
  corTextoPadrao: "#1f1f1fff",
  corTextoPadraoFundoEscuro: "#f1f1f1ff",
  corTextoDestaque: "#2ba6daff",
  corTextoTitulo: "#041e52ff",
  corTextoSubtitulo: "#041e52ff",
  //Container de InputTextos
  corInputTextBorder: "#2ba6daff",
  //Background
  corBackgroundClaro: "#dcedffff",
  corBackgroundEscuro: "#1f1f1fff",
  //Azul
  corAzulEscuro: "#041e52ff",
  corAzulClaro: "#2ba6daff",
  //Cinza
  corCinzaEscuro: "#606060ff",
  corCinzaMedio: "#bebebeff",
  corCinzaClaro: "#f1f1f1ff",
  //Preto
  corPretoAbsoluto: "#000000ff",
  corPretoRelativo: "#343434ff",
  //Variados
  corErro: "#fa7251ff",
  corAlerta: "#ffe275ff",
  corSucesso: "#98e07eff",
});