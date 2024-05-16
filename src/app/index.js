import { ActivityIndicator, View } from "react-native";

export default function ViewInitial() {
  console.log("ViewInitial");

  return (
    <View style={{ flex: 1 , justifyContent:"center"}}>
      <ActivityIndicator size="large" />
    </View>
  )
}