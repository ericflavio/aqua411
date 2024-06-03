import { StyleSheet } from "react-native";
import { myStyleApp } from "../../styles/styleApp";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flex:2,
    marginTop:"15%",
    justifyContent:"center",
    width: "86%",
    borderWidth:0
  },
  containerBody: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    justifyContent: "flex-end",
    borderWidth:0,
    marginBottom: 30,
    zIndex: 0
  },
  containerViewButton: {
    width:"60%",
    zIndex: 1
  },
  containerButton: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  imgCenaBttom: {
    width: 400,
    overflow:"hidden",
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  textoTituloPagina: {
    fontFamily: 'Lato-Bold',
    fontSize: myStyleApp.size.textoSize0,
    //fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 20,
    marginBottom: 25,
    color: myStyleApp.color.tema10B,
  },
  textoSubtitulo: {
    fontFamily: 'Lato-Regular',
    fontSize: myStyleApp.size.textoSize2,
    //fontWeight: myStyleSize.textoNegritoForte,
    marginTop: 0,
    color: myStyleApp.color.tema10B,
  },
});