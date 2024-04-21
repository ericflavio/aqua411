import { StatusBar } from 'expo-status-bar';
import { Text, View, Button} from 'react-native';
import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Atualizar" onPress={console.log("apertou o botão")}/>
      <StatusBar style="auto" />
    </View>
  );
}
