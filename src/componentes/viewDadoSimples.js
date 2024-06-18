import { styleColor } from '../styles/styleColors';
import { styleApp } from '../styles/styleApp';
import { TextInput, View, Text, StyleSheet } from "react-native";

export function ViewDadoSimples(label, valor) {
  return (
    <View style={stylesLocal.containerItem}>
      <View style={stylesLocal.containerBarra}>
        <View style={{height: "80%", borderLeftWidth:1, borderBlockColor:styleApp.color.cinzaClaro }}></View>
        <View>
          <Text style={styleApp.textSmall}>{label}</Text>
          <Text style={styleApp.textRegular}>{valor}</Text>
        </View>
      </View>
    </View>
  )
};

const stylesLocal = StyleSheet.create({
  containerItem: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  containerBarra: {
    flexDirection: "row",
    flex: 0,
    gap: 4,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerDado: {
    flex: 1,
    width: "100%",
    minHeight: 26,
    borderRadius: styleApp.containerBorderRadius,
    backgroundColor: "#f1f1f1f1",
  },
});
