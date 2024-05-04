import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { myStylesComuns } from "../../../styles/stylesComuns";
import { GradienteFill } from '../../../componentes/gradienteFill';

export default function ViewSaibaMais() {
  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ImageBackground
        source={imageBkg} resizeMode="contain" blurRadius={0} style={{
          flex: 1,
          width: "100%",
          padding: 0,
          paddingVertical: 0,
          paddingBottom: 86,
          overflow: 'hidden', // prevent image overflow the container
          position: 'absolute',
          bottom: 0
        }}
        imageStyle={{
          resizeMode: "stretch",
          alignSelf: "flex-end",
          //height: 500, // the image height
          //top: undefined
        }}>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1 }}>

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
            mais do mesmo,
            eu eu mesmo e irene
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}