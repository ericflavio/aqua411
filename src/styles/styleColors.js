import { StyleSheet } from "react-native";
//Obs: Importar apenas dentro da StylesComuns.

const tema = "claro";

//Cores da paleta do app
tema60pClaro = "#ffffff";
tema60pMedio = "#f5f1e0ff";
tema60pEscuro = "#364366ff",
tema30pPrincipal = "#84d3f8ff",  // Cor principal que representa o APP
tema10pSecundaria = "#968078ff", // Cor secundaria que representa o APP
tema10pTerciaria = "#ee7087ff",  // Cor terciaria que representa o APP

//Textos gerais
tema === "claro" ? textRegular = '#262626ff' : textRegular = '#f5f1e0ff';
tema === "claro" ? textoTitulo = tema10pSecundaria : textoTitulo = tema30pPrincipal;
tema === "claro" ? textSubtitulo = "#262626ff" : textSubtitulo = tema60pMedio;

//Botões (incluindo também seus textos)
tema === "claro" ? buttonBackground = tema30pPrincipal : buttonBackground = tema60pMedio;
tema === "claro" ? buttonBorder = '#bebebeff' : buttonBorder = tema30pPrincipal;
/////Textos de botões
  tema === "claro" ? textButtonRegular = "white" : textButtonRegular = tema60pEscuro;
  tema === "claro" ? textButtonFlat = textRegular : textButtonFlat = tema60pEscuro;

//Background da safe-area
tema === "claro" ? backgroundSafeArea = '#f7f7f8' : backgroundSafeArea = '#262626ff';

export const styleColor = StyleSheet.create({
  //Paleta de cores do app
  tema60pClaro,
  tema60pMedio,
  tema60pEscuro,
  tema30pPrincipal,
  tema10pSecundaria,
  tema10pTerciaria,
  //Botões
  buttonBackground,
  buttonBorder,
  //Textos dentro de botões
  textButtonRegular,
  textButtonFlat,
  //Textos fora de botões
  textoTitulo,
  textSubtitulo,
  textRegular,
  //Container de InputTextos
  inputTextBorder: tema30pPrincipal,
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
  aviso: "#c1dfffff",
  erro: "#ed979fff",
  alerta: "#ffebaaff",
  sucesso: "#aadbb6ff",
  //Activity Indicadtor
  activityIndicatorCollor: "#262626ff",
  //Background
  backgroundSafeArea,
});