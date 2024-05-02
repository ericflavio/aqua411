import { myStylesComuns } from '../styles/stylesComuns';
import { TextInput } from "react-native";

export function InputText(valorInicial, ValorDefault, textPlaceHolder, inEditavel, inSecure, tipoTeclado, funcao) {
  if (!valorInicial) valorInicial = null;
  if (!ValorDefault) ValorDefault = null;
  if (!textPlaceHolder) textPlaceHolder = "";
  if (!inEditavel) inEditavel = true;
  if (!inSecure) inSecure = false;
  if (!tipoTeclado) tipoTeclado = "default";

  //console.log("valorInicial: ", valorInicial);
  //console.log("ValorDefault: ", ValorDefault);
  //console.log("textPlaceHolder: ", textPlaceHolder);
  //console.log("inEditavel: ", inEditavel);
  //console.log("inSecure: ", inSecure);
  //console.log("tipoTeclado: ", tipoTeclado);
  //console.log("funcao: ", funcao);

  return (
      <TextInput
        style={myStylesComuns.inputText}
        onChangeText={funcao}
        value={valorInicial}
        placeholder={textPlaceHolder}
        placeholderTextColor="#9F9F9F"
        keyboardType={tipoTeclado}
        secureTextEntry={inSecure}
        defaultValue={ValorDefault}
        editable={inEditavel}
      />)
}