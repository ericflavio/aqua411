import { View, Image, ActivityIndicator } from "react-native";
import { myStyles } from './styles';

export default function ViewSplash() {

  return (
    <View style={myStyles.containerBody}>
      {/*<Text>HOME</Text>
      <Link href={"/principal"}>Ir para main</Link>
     <Link href={"/login"}>Ir para login</Link>*/}
      <View style={myStyles.containerSpiner}>
        <ActivityIndicator size="large" />
      </View>
      <Image
        style={myStyles.imgLogo}
        source={require('../../assets/outros/ovelha_cena_01.png')}
      />
    </View>
  )
}