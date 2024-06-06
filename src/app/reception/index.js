import { View, Image, Text, TouchableOpacity } from "react-native";
import { myStyles } from './styles';
import { styleApp } from '../../styles/styleApp';
import { router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { styleColor } from "../../styles/styleColors";
import { GradienteFill } from '../../componentes/gradienteFill';
import * as Animatable from 'react-native-animatable';

export default function ViewReception() {
  function goToLogin() {
    router.replace('/login');
  }

  return (
    <View style={styleApp.containerSafeArea}>
      {GradienteFill('rgba(158,205,255,100)','white')}
      <View style={myStyles.containerHeader}>
        <Animatable.Text
          animation="slideInLeft"
          style={myStyles.textoTituloPagina}>
          Você ainda lava roupa em casa?
        </Animatable.Text>
        <Text style={myStyles.textoSubtitulo}>
          Está na hora de conhecer os benefícios das lavanderias inteligentes
        </Text>
        <View style={myStyles.containerViewButton}>
          <TouchableOpacity style={styleApp.buttonHC} onPress={goToLogin}>
            <View style={myStyles.containerButton}>
              <Text style={styleApp.buttonTextRegular}>Começar</Text>
              <MaterialIcons name="arrow-outward" size={styleApp.size.iconSizeButtonSmall} color={styleColor.buttonText} />
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