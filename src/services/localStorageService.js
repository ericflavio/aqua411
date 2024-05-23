import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
//TODO: Sempre atualizar a chave do nome do DB AsyncStorage, no padrão
//@nomedoapp:coleção

export const idDB = "@lavanderias:DadosLogin"

export async function SetLocalDataLogin(user) {
  console.log("ssss user ", user.idLogin);
  if (!user || user == undefined || user == null ||
    !user.idLogin || user.idLogin == undefined || user.idLogin == null) {
    Alert.alert("Alerta", "Erro ao setar usuário local2");
    return false;
  }

  var d = new Date();
  var dataHora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
  user.timestamp = dataHora;
  console.log("gravação do usuário local ", user);

  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(idDB, jsonValue);
  } catch (e) {
    console.log("AsyncStorage(erro): ", e)
  }
}

export async function GetLocalDataLogin() {
  try {
    const response = await AsyncStorage.getItem(idDB);
    const userDataLogin = response ? JSON.parse(response) : null;
    return userDataLogin;
  } catch (e) {
    return null;
  }
}

export async function RemoveLocalDataLogin() {
  try {
    const response = await AsyncStorage.removeItem(idDB);
  } catch (e) {
    //console.log("AsyncStorage(erro): ", e)
  }
}