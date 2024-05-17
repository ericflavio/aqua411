import { ActivityIndicator, View } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import { Redirect } from 'expo-router';

export default function ViewLoading() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("ViewLoading.user: ", user, " isLoading: ", isLoading);

  //Procedimentos de recuperação de usário no storage local finalizado
  if (!isLoading &&
    (!user || user == null)) {
    return <Redirect href="reception" />;
  }

  if (!isLoading &&
      (user.isContaAtiva == undefined
      || user.isContaAtiva == false)) {
    return <Redirect href="login" />;
  }

  if (!isLoading && user && user.isContaAtiva
    && user.isContaAtiva == true) {
    return <Redirect href="(main)" />;
  }

  //Procedimentos de recuperação de usário no storage local em curso
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  )
}