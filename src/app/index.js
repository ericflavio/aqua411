import { View, Text, Button } from 'react-native'
import { Link } from 'expo-router';

export default function Hhome() {
  return (
    <View style={{flex:1, alignContent:"center", justifyContent:"center"}}>
      <Text>sss</Text>
      <Link href='/login'>Ir para login</Link>
      <Link href='/splash'>Ir para splash</Link>
      <Link href='(main)'>Ir para main</Link>
    </View>
  );
}