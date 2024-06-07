import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowErrorMessage } from '../errors/errorMessage';
//TODO: Sempre atualizar a chave do nome do DB AsyncStorage, no padrão
//@nomedoapp:coleção

export const idDB = "@lavanderias:DadosLogin"

export async function SetLocalDataLogin(user) {
  if (!user || user === undefined || user === null ||
    !user.idLogin || user.idLogin === undefined || user.idLogin === null) {
    ShowErrorMessage("pl010","t");
    return false;
  }

  var d = new Date();
  var dataHora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
  user.timestamp = dataHora;

  try {
    //parse de json para string
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(idDB, jsonValue);
  } catch (e) {
    ShowErrorMessage("pl011","t");
    throw error;
  }
}

export async function GetLocalDataLogin() {
  try {
    const response = await AsyncStorage.getItem(idDB);
    //Parce de string para json
    const userDataLogin = response ? JSON.parse(response) : null;
    return userDataLogin;
  } catch (e) {
    ShowErrorMessage("pl012","t");
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