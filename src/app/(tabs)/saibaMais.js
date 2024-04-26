import { View, Text } from "react-native";
import { myStylesComuns } from "../styles/stylesComuns";

export default function ViewSaibaMais() {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text style={{fontSize:44 , fontWeight:"700"}}>
        Saiba Mais
      </Text>
      <Text style={myStylesComuns.textoComum}>
        qualidade das máquinas,
        racionamento de água, somos verdes,
        proibido pet,
        contatos,
        amenidades: jogos, ar, internet, achados e perdidos, 
        horário de funcionamento (saída após 23h), 
      </Text>
    </View>
  )
}