import { myStylesComuns } from '../styles/stylesComuns';
import { TextInput } from "react-native";

export function InputText(funcao, textPlaceHolder, qtdLinhas, tamanhoMáximo, tipoTeclado, inEditavel, valorInicial, valorDefault, inSecure) {
  if (textPlaceHolder == undefined) textPlaceHolder = "";
  if (qtdLinhas == undefined) qtdLinhas = 1;
  if (tamanhoMáximo == undefined) tamanhoMáximo = 80;
  if (tipoTeclado == undefined) tipoTeclado = "default";
  if (inEditavel == undefined) inEditavel = true;
  if (valorInicial == undefined) valorInicial = null;
  if (valorDefault == undefined) valorDefault = null;
  if (inSecure == undefined) inSecure = false;

  qtdLinhas > 1 ? flagMultiline = true : flagMultiline = false;
  
  return (
      <TextInput
        style={myStylesComuns.inputText}
        onChangeText={funcao}
        value={valorInicial}
        placeholder={textPlaceHolder}
        placeholderTextColor="#9F9F9F"
        keyboardType={tipoTeclado}
        secureTextEntry={inSecure}
        defaultValue={valorDefault}
        editable={inEditavel}
        multiline={flagMultiline}
        numberOfLines={qtdLinhas}
        maxLength={tamanhoMáximo}
      />)
}