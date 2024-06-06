import { styleColor } from '../styles/styleColors';
import { styleApp } from '../styles/styleApp';
import { TextInput, View, Text, StyleSheet } from "react-native";

export function InputText(label, funcao, textPlaceHolder, qtdLinhas, tamanhoMáximo, tipoTeclado, flagEditavel, valorInicial, flagSecure) {
  if (label == undefined) label = "";
  if (textPlaceHolder == undefined) textPlaceHolder = "";
  if (qtdLinhas == undefined) qtdLinhas = 1;
  if (tamanhoMáximo == undefined) tamanhoMáximo = 80;
  if (tipoTeclado == undefined) tipoTeclado = "default";
  if (flagEditavel == undefined) flagEditavel = true;
  if (valorInicial == undefined) valorInicial = null;
  if (flagSecure == undefined) flagSecure = false;

  qtdLinhas > 1 ? flagMultiline = true : flagMultiline = false;

  return (
    <View>
      <TextInput
        style={styleLocal.inputText}
        onChangeText={funcao}
        value={valorInicial}
        placeholder={textPlaceHolder}
        placeholderTextColor={styleColor.cinzaMedio}
        keyboardType={tipoTeclado}
        secureTextEntry={flagSecure}
        editable={flagEditavel}
        multiline={flagMultiline}
        numberOfLines={qtdLinhas}
        maxLength={tamanhoMáximo}
      />
      <Text style={{ paddingLeft: 6 }}>{label}</Text>
    </View>)
}

//InputText
const styleLocal = StyleSheet.create({
  inputText: {
    marginTop: 6,
    height: 54,
    margin: 0,
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    //fontWeight: styleSize.textoNegritoMedio,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: styleColor.inputTextBorder,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
  },
});