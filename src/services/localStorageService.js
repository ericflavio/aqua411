import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ToastAndroid, Platform } from 'react-native';
import NewErrorMessage, { errorTextOops } from '../errors/errorMessage';
//TODO: Sempre atualizar a chave do nome do DB AsyncStorage, no padrão
//@nomedoapp:coleção

export const idDB = "@lavanderias:DadosLogin"

function showMsgError(cod) {
  const error = NewErrorMessage(cod);

  if (Platform.OS === 'ios') {
    Alert.alert(errorTextOops, error.message);
  } else {
    ToastAndroid.showWithGravity(
      error.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  }
}

export async function SetLocalDataLogin(user) {
  if (!user || user === undefined || user === null ||
    !user.idLogin || user.idLogin === undefined || user.idLogin === null) {
    showMsgError("pl10");
    return false;
  }

  var d = new Date();
  var dataHora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
  user.timestamp = dataHora;

  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(idDB, jsonValue);
  } catch (e) {
    showMsgError("pl11");
    throw error;
  }
}

export async function GetLocalDataLogin() {
  try {
    const response = await AsyncStorage.getItem(idDB);
    const userDataLogin = response ? JSON.parse(response) : null;
    return userDataLogin;
  } catch (e) {
    showMsgError("pl12");
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