import { View, Text , Image, SafeAreaView, ScrollView} from "react-native";
import { myStyles } from "../../styles";

export default function ViewHome() {
  return (
    <SafeAreaView style={myStyles.containerPrincipal}>
      <ScrollView style={{backgroundColor:"green"}}>
          <Text style={myStyles.textoTituloPrincipal}>
            Sua lavanderia fora de casa
          </Text>
          <View style={myStyles.containerMaquinas}>  
              <View>            
                  <Image
                    style={{
                    width: 84,
                    height: 84,
                    resizeMode: 'contain',
                    }}
                    source={require('../../../assets/maquinas/seca_disp.png')}
                  />
                  <View style={{
                    flexDirection: 'row',
                    borderWidth:1}}> 
                  <Text>Seca2</Text>
                  <Text>pisca</Text>
                </View>
              </View>

              <View>            
                  <Image
                    style={{
                    width: 84,
                    height: 84,
                    resizeMode: 'contain',
                    }}
                    source={require('../../../assets/maquinas/seca_emuso.png')}
                  />
                  <View style={{
                    flexDirection: 'row',
                    borderWidth:1}}> 
                  <Text>Seca2</Text>
                  <Text>pisca</Text>
                </View>
              </View>

              <View>            
                  <Image
                    style={{
                    width: 84,
                    height: 84,
                    resizeMode: 'contain',
                    }}
                    source={require('../../../assets/maquinas/seca_disp.png')}
                  />
                  <View style={{
                    flexDirection: 'row',
                    borderWidth:1}}> 
                  <Text>Seca2</Text>
                  <Text>pisca</Text>
                </View>
              </View>
          </View>
          <Text style={{fontSize:22 , fontWeight:"700", padding:40, color:"black"}}>
            Endereço e geolocalização
          </Text>
        </ScrollView>

    </SafeAreaView>
  )
}