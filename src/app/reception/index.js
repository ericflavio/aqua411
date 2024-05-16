import { View, Image, Text, TouchableOpacity } from "react-native";
import { myStyles } from './styles';
import { myStylesComuns } from '../../styles/stylesComuns';
import { Link, router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { myStylesColors } from "../../styles/stylesColors";

export function goToLogin() {
  router.replace('/login');
}

export default function ViewReception() {
  console.log("ViewReception");

  return (
    <View style={myStylesComuns.containerPrincipalSafeArea}>
      <View style={myStyles.containerHeader}>
        <Text style={myStylesComuns.textoTituloPagina}>
          Lavar roupa em casa é coisa do passado
        </Text>
        <TouchableOpacity style={myStylesComuns.button} onPress={goToLogin}>
          <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
            <Text style={myStylesComuns.buttonTextoStyle}>Experimente mudar</Text>
            <MaterialIcons name="arrow-outward" size={30} color={myStylesColors.corAzulClaro} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={myStyles.containerBody}>
        <Image
          style={myStyles.imgLogo}
          source={require('../../assets/outros/ovelha_cena_01.png')}
        />
      </View>
    </View>
  )
}