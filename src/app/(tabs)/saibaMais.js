import { View, Text, ImageBackground } from "react-native";
import { myStylesComuns } from "../styles/stylesComuns";
import { myStyles } from "../styles/stylesPagePromocao";

const imageBkg = require('../../../assets/outros/image3837-8.png');

export default function ViewSaibaMais() {
  return (
    <ImageBackground
      source={imageBkg} resizeMode="contain" blurRadius={3} style={{
        width: "100%",
        padding: 0,
        paddingVertical: 0,
        paddingBottom:86,
        overflow: 'hidden', // prevent image overflow the container
        position: 'absolute',
        bottom:0
      }}
      imageStyle={{
        resizeMode: "stretch",
        alignSelf: "flex-end",
        //height: 500, // the image height
        //top: undefined
      }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 44, fontWeight: "700" }}>
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
    </ImageBackground>
  )
}