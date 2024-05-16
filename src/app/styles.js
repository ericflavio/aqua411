import { StyleSheet } from "react-native";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flex:2,
    marginTop:"15%",
    justifyContent:"center"
  },
  containerBody: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    justifyContent: "flex-end",
  },
  containerSpiner: {
    justifyContent:"center", 
  },
  imgLogo: {
    //width: "100%",
    height: 300, 
    overflow:"scroll",
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
});