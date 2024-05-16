import { View, Image, ActivityIndicator , Text} from "react-native";
import { myStyles } from './styles';
import { myStylesComuns } from '../../styles/stylesComuns';
import { Link } from 'expo-router';

export default function ViewSplash() {
  console.log("ViewSplash");

  return (
    <View style={myStylesComuns.containerPrincipalSafeArea}>
      <View style={myStyles.containerHeader}>
        <Text style={myStylesComuns.textoTituloPagina}>
          Lavar roupas em casa é coisa do passado
        </Text>
      </View>
      <View style={myStyles.containerBody}>
        <Link replace href={"/login"}>Ir para login</Link>
        {/*<View style={myStyles.containerSpiner}>
        <ActivityIndicator size="large" />
        </View>*/}
        <Image
          style={myStyles.imgLogo}
          source={require('../../assets/outros/ovelha_cena_01.png')}
        />
      </View>
    </View>
  )
}