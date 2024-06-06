import { View, Image, ActivityIndicator } from "react-native";
import React, { useContext } from 'react';
import { styles } from './styles';

export default function ViewLoading() {

  return (
    <View style={styles.containerBody}>
      {/*<Text>HOME</Text>
      <Link href={"/principal"}>Ir para main</Link>
     <Link href={"/login"}>Ir para login</Link>*/}
      <View style={styles.containerSpiner}>
        <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} />
      </View>
      <Image
        style={styles.imgLogo}
        source={require('../../assets/outros/ovelha_cena_01.png')}
      />
    </View>
  )
}