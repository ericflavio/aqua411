import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function principal() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#0101",
      borderWidth: 1 }}>
      <Text>PRINCPAL HOME</Text>
      <Link href={"/principal"}>Ir para main</Link>
      <Link href={"/login"}>Ir para login</Link>
    </View>
  )
}