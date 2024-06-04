import { myStyleColor } from '../styles/stylesColors';
import { myStyleApp } from '../styles/styleApp';
import { TextInput, View, Text, } from "react-native";
import { consultaListaStatusLoja } from '../services/lojaService'
import { ShowMsgError } from '../errors/errorMessage';

async function fetchStatusList() {
  try {
    statusList = await consultaListaStatusLoja();
  } catch (e) {
    ShowMsgError("lj001");
    statusList = null;
  }
  console.log("status recuperados ", statusList)
}

export function LojaHandleStatus(statusAtual, funcao) {
  fetchStatusList();

  return (
    <View>
      <Text>handle status</Text>
    </View>)
}