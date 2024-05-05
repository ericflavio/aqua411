import { View, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import React, { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import { myStyles } from './styles';

export default function ViewStart() {

  //const { signIn } = useContext(AuthContext);
  //function logar() {
  // var user = signIn("eric@gmail.com", "12345678")
  // console.log("home-logar-user: ", user);
  //}

  return (
    <View style={myStyles.containerBody}>
      {/*<Text>HOME</Text>
      <Link href={"/principal"}>Ir para main</Link>
     <Link href={"/login"}>Ir para login</Link>*/}
      <View style={myStyles.containerSpiner}>
        <ActivityIndicator size="large"/>
      </View>
      <Image
        style={myStyles.imgLogo}
        source={require('../assets/outros/ovelha_cena_01.png')}
      />
    </View>
  )
}