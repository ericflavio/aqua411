import { View, Image, Text, TouchableOpacity } from "react-native";
import { myStyles } from './styles';
import { myStylesComuns } from '../../styles/stylesComuns';
import { Link, router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { myStylesColors } from "../../styles/stylesColors";
import { GradienteFill } from '../../componentes/gradienteFill';
import * as Animatable from 'react-native-animatable';

export default function ViewReception() {
  console.log("ViewReception");
  function goToLogin() {
    router.replace('/login');
  }

  return (
    <View style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <View style={myStyles.containerHeader}>
        <Animatable.Text
          animation="slideInLeft"
          style={myStylesComuns.textoTituloPagina}>
          Você ainda lava roupa em casa?
        </Animatable.Text>
        <Text style={myStylesComuns.textoSubtitulo}>
          Está na hora de conhecer os benefícios das lavanderias inteligentes
        </Text>
        <View style={myStyles.containerViewButton}>
          <TouchableOpacity style={myStylesComuns.button} onPress={goToLogin}>
            <View style={myStyles.containerButton}>
              <Text style={myStylesComuns.buttonTextoStyle}>Começar</Text>
              <MaterialIcons name="arrow-outward" size={30} color={myStylesColors.corAzulClaro} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={myStyles.containerBody}>
        <Image
          style={myStyles.imgCenaBttom}
          source={require('../../assets/outros/ovelha_cena_01.png')}
        />
      </View>
    </View>
  )
}