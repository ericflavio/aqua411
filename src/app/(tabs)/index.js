import { View, Text , Image, SafeAreaView, ScrollView} from "react-native";

export default function ViewHome() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white" , justifyContent:"center", alignItems:"center"}}>
      <Text style={{fontSize:44 , fontWeight:"700", padding:40, color:"black"}}>
        Sua lavanderia fora de casa
      </Text>
      <ScrollView>

      <View>
        <View>
        <Text style={{fontSize:12 , fontWeight:"700", padding:0, color:"black"}}>
        3 Secadoras
        </Text>
        </View>
             
      <View style={{
        flexDirection: 'row',
        padding: 20,
      }}>
          <View style={{
            backgroundColor: 'white'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/maquinas/seca_disp.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'white'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/maquinas/seca_emuso.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'white'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/maquinas/seca_emuso.png')}
              />
          </View>
      </View>
 
      </View>
      <View style={{
        flexDirection: 'row',
        padding: 20,
      }}>
          <View style={{
            backgroundColor: 'white'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/maquinas/lava_emuso.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'white'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/maquinas/lava_disp.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'white'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/maquinas/lava_emuso.png')}
              />
          </View>

      </View>
      <Text style={{fontSize:22 , fontWeight:"700", padding:40, color:"black"}}>
        Endereço e geolocalização
      </Text>
      </ScrollView>

    </SafeAreaView>
  )
}