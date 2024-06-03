import { myStyleColor } from '../styles/stylesColors';
import { myStyleApp } from '../styles/styleApp';
import { TextInput, View, Text } from "react-native";

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
        style={myStyleApp.inputText}
        onChangeText={funcao}
        value={valorInicial}
        placeholder={textPlaceHolder}
        placeholderTextColor={myStyleColor.cinzaMedio}
        keyboardType={tipoTeclado}
        secureTextEntry={flagSecure}
        editable={flagEditavel}
        multiline={flagMultiline}
        numberOfLines={qtdLinhas}
        maxLength={tamanhoMáximo}
      />
      <Text style={{paddingLeft:6}}>{label}</Text>
    </View>)
}