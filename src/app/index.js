import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import React, { useContext } from 'react';
import { AuthContext } from "../contexts/auth";

export default function ViewHome() {

  const { signIn } = useContext(AuthContext);
  function logar() {
   var user = signIn("eric@gmail.com", "12345678")
   console.log("home-logar-user: ", user);
  }

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0101",
      borderWidth: 1
    }}>
      <Text>HOME</Text>
      <Link href={"/principal"}>Ir para main</Link>
      <Link href={"/login"}>Ir para login</Link>
      <Button
        onPress={logar}
        title="Logar"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}