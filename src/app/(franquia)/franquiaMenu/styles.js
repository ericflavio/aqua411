import { StyleSheet , Dimensions} from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";

try {
  imageWidth = Dimensions.get('window').width;
} catch {
  imageWidth = 340;
};

export const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 8
  },
  containerDadosLoja: {
    flex: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 14,
    borderWidth: styleApp.size.containerBordaOnOff,
    backgroundColor: styleColor.tema30pPrincipal,
  },
  containerPrincipal: {
    flex: 0,
    borderWidth: styleApp.size.containerBordaOnOff,
    marginBottom: 40,
  },
  containerAlertaEdição: {
    padding: 12,
    backgroundColor: styleColor.erro,
    borderRadius: 0
  },
  textoStatus: {
    fontFamily: 'Roboto-Bold',
    size: styleApp.size.textoSize3,
    color: styleColor.erro
  },
  imgNovaLoja: {
    height: 140, 
    width: imageWidth,
    overflow: "hidden",
    resizeMode: "contain",
    //position: "relative"
  },
  containerOthers: {
    justifyContent: "center",
    alignItems: "stretch",
    gap: 8,
    borderWidth: styleApp.size.containerBordaOnOff,
    margin: 12,
  },
  containerSection: {
    backgroundColor: styleApp.color.backgroundSafeAreaLiquid, 
    minHeight: 28,
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});