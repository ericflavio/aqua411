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

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['white', 'rgba(78,160,248,100)']}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: tamanho,
      }}
    />)
}