import { ActivityIndicator, View } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import { Redirect } from 'expo-router';

export default function ViewInitial() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("ViewInitial.user: ", user, " isLoading: ", isLoading );

  //Procedimentos de recuperação de usário no storage local finalizado
  if (!isLoading && (!user || user == null)) {
    return <Redirect href="/splash" />;
  }

  if (!isLoading && user) {
    return <Redirect href="(main)" />;
  }

  //Procedimentos de recuperação de usário no storage local em curso
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  )
}