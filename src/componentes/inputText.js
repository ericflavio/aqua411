import { myStylesColors } from '../styles/stylesColors';
import { myStylesComuns } from '../styles/stylesComuns';
import { TextInput } from "react-native";

export function InputText(funcao, textPlaceHolder, qtdLinhas, tamanhoMáximo, tipoTeclado, flagEditavel, valorInicial, valorDefault, flagSecure, flagErro) {
  if (textPlaceHolder == undefined) textPlaceHolder = "";
  if (qtdLinhas == undefined) qtdLinhas = 1;
  if (tamanhoMáximo == undefined) tamanhoMáximo = 80;
  if (tipoTeclado == undefined) tipoTeclado = "default";
  if (flagEditavel == undefined) flagEditavel = true;
  if (valorInicial == undefined) valorInicial = null;
  if (valorDefault == undefined) valorDefault = null;
  if (flagSecure == undefined) flagSecure = false;

  qtdLinhas > 1 ? flagMultiline = true : flagMultiline = false;
  
  return (
      <TextInput
        style={myStylesComuns.inputText}
        onChangeText={funcao}
        value={valorInicial}
        placeholder={textPlaceHolder}
        placeholderTextColor={myStylesColors.corCinzMedio}
        keyboardType={tipoTeclado}
        secureTextEntry={flagSecure}
        defaultValue={valorDefault}
        editable={flagEditavel}
        multiline={flagMultiline}
        numberOfLines={qtdLinhas}
        maxLength={tamanhoMáximo}
      />)
}