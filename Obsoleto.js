import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Image} from 'react-native';
import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>

      <Text> Lavar roupa todo dia2</Text>
      <Text> que alegria</Text>

      <View style={{
        flexDirection: 'row',
        padding: 20,
      }}>
          <View style={{
            backgroundColor: 'blue'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('./assets/maquinas/maq_open.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'red'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('./assets/maquinas/maq_closed.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'red'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('./assets/maquinas/maq_closed.png')}
              />
          </View>
      </View>
      <View style={{
        flexDirection: 'row',
        padding: 20,
      }}>
          <View style={{
            backgroundColor: 'red'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('./assets/maquinas/maq_closed.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'blue'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('./assets/maquinas/maq_open.png')}
              />
          </View>
          <View style={{
            backgroundColor: 'red'
          }}>
                <Image
                style={{
                  width: 96,
                  height: 96,
                  resizeMode: 'contain',
                }}
                source={require('./assets/maquinas/maq_closed.png')}
              />
          </View>

      </View>
      </View>

  );
}
