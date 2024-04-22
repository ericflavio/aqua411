import {StyleSheet} from "react-native";

const myColors = {
  corTextoTituloPagina: "#63636363"
};

export const myStyles = StyleSheet.create({
  //Telas principais invocadas via opção do menu
  containerPrincipal: {
    flex:1, 
    backgroundColor:"blue" , 
    justifyContent:"center", 
    alignItems:"center"
  },
  textoTituloPrincipal: {
    fontSize:40 , 
    fontWeight:"700",
    padding:40, 
    color:"black",
    borderWidth:1
  },
  //Tela INICIO
  containerMaquinas: {
    flexDirection:"row",
    flex:1, 
    borderWidth:0,
    backgroundColor:"yellow",
    alignContent:"center",
    justifyContent:"space-around"
  },
  textoMaquinas: {
    fontSize:16 , 
    fontWeight:"700",
    paddingTop:6,
    paddingBottom:2, 
    color:"black"
  },
});