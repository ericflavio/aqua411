import {StyleSheet, TouchableOpacity} from "react-native";

export const myColors = {
  corAzulEscuro: "#041e52ff",
  corAzulClaro: "#2ba6daff",
  corCinzEscuro: "#8f8f8fff",
  corCinzaClaro: "#dfdfdfff",
  corPretoAbsoluto: "#000000ff",
  corPretoRelativo: "#2d2d2dff",
}

export const myStyles = StyleSheet.create({
  //Telas principais invocadas via opção do menu
  containerPrincipal: {
    flex:1, 
    backgroundColor:"white" , 
    justifyContent:"center", 
    alignItems:"center",
    padding: 30
  },
  textoTituloPrincipal: {
    fontSize:40 , 
    fontWeight:"700",
    paddingTop: 40, 
    paddingBottom: 20,
    color:"#041e52ff",
    borderWidth:0
  },
  textoSubtitulo: {
    fontSize:22 , 
    fontWeight:"700",
    paddingTop: 20,
    color:"#2d2d2dff",
    borderWidth:0
  },
  textoComum: {
    fontSize:20 , 
    fontWeight:"300",
    paddingTop: 16,
    color:"#2d2d2dff",
    borderWidth:0,
    borderWidth:0
  },
  textoPalavraDestacada: {
    fontSize:36 , 
    fontWeight:"700",
    color:"#041e52ff",
    borderWidth:0
  },

  //Tela INICIO
  containerMaquinas: {
    flexDirection:"row",
    flex:1, 
    borderWidth:0,
    backgroundColor:"white",
    alignContent:"center",
    justifyContent:"space-evenly",
    paddingTop: 18
  },
  textoMaquinas: {
    fontSize:16 , 
    fontWeight:"100",
    paddingTop:0,
    paddingBottom:0, 
    color:"black"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 12,
  },
});