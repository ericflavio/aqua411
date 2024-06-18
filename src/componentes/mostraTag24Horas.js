import { View, Text, StyleSheet } from "react-native";
import { styleApp } from '../styles/styleApp';
//Sinal de aberto 24h

export default function MostraTag24horas() {
  return (
    <>
    <View style={stylesLocal.containerPeriodo}>
      <Text style={[styleApp.textSubtitulo, { color: 'white' }]}>24h</Text>
    </View>
    </>
  )
}

const stylesLocal = StyleSheet.create({
  containerPeriodo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});