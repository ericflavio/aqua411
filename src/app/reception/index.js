import { View, Image, Text, TouchableOpacity } from "react-native";
import { myStyles } from './styles';
import { myStyleApp } from '../../styles/styleApp';
import { router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { myStyleColor } from "../../styles/stylesColors";
import { GradienteFill } from '../../componentes/gradienteFill';
import * as Animatable from 'react-native-animatable';

export default function ViewReception() {
  function goToLogin() {
    router.replace('/login');
  }

  return (
    <View style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill('rgba(158,205,255,100)','white')}
      <View style={myStyles.containerHeader}>
        <Animatable.Text
          animation="slideInLeft"
          style={myStyleApp.textoTituloPagina}>
          Você ainda lava roupa em casa?
        </Animatable.Text>
        <Text style={myStyleApp.textoSubtitulo}>
          Está na hora de conhecer os benefícios das lavanderias inteligentes
        </Text>
        <View style={myStyles.containerViewButton}>
          <TouchableOpacity style={myStyleApp.buttonHC} onPress={goToLogin}>
            <View style={myStyles.containerButton}>
              <Text style={myStyleApp.buttonTextStyle}>Começar</Text>
              <MaterialIcons name="arrow-outward" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleColor.textoPadrao} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={myStyles.containerBody}>
        <Animatable.Image
          animation="zoomInUp"
          style={myStyles.imgCenaBttom}
          source={require('../../assets/outros/sheep_chuva_01.png')}
        />
      </View>
    </View>
  )
}