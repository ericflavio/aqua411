import { StyleSheet } from "react-native";
import { styleApp } from "../../styles/styleApp";

export const styles = StyleSheet.create({
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
});