import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions , Text} from "react-native";

function tamanhoTela() {
  //Seta tamanho ideal das VIEWS baseado no tamanho da tela do aparelho
  let screenHeight = 0;
  try {
    screenHeight = Dimensions.get('window').height;
  } catch {
    screenHeight = myStyleApp.containerTamanhoMedioTelas;
  };
  let headerHeight = 0; //Eventual header na página
  let bodyHeight = screenHeight - headerHeight + 100;
  return bodyHeight;
};

export function GradienteFill(corForte, corFraca, tamanho) {
  if (tamanho == undefined) tamanho = tamanhoTela();

  if (!corForte || corForte === null || corForte === "") {
    return (null);
    corForte = 'rgba(119,183,248,100)';
  }
  if (!corFraca || corFraca === null || corFraca === "") {
    return (null);
    corFraca = 'white';
  }

  return (
    <LinearGradient
      // A cor mais fraca começa no topo (liner horizontal)
      colors={[corFraca, corForte]}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: tamanho,
      }}
    />)
}