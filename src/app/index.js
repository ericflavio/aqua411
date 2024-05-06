import { View, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/auth";
import { myStyles } from './styles';
import { GetDataLogin , SetDataLogin } from '../services/localStorageService';

export default function ViewStart() {

  useEffect(() => {
    console.log("home renderizada")
    user = {
      nome: "Eric",
      user: "ericflavio@gmail.com"
    }
    GetDataLogin();
  }, []);

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
        <ActivityIndicator size="large" />
      </View>
      <Image
        style={myStyles.imgLogo}
        source={require('../assets/outros/ovelha_cena_01.png')}
      />
    </View>
  )
}