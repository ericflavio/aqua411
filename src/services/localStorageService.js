import AsyncStorage from '@react-native-async-storage/async-storage';
//TODO: Sempre atualizar a chave do nome do DB AsyncStorage, no padrão
//@nomedoapp:coleção

export const idDB = "@lavanderias:DadosLogin"

export async function SetLocalDataLogin(userDataLogin) {
  if (userDataLogin == undefined) return false;
  if (userDataLogin.login == undefined) return false;
  if (userDataLogin.id == undefined) return false;
  if (userDataLogin.token == undefined) return false;

  var d = new Date();
  var dataHora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
  userDataLogin.timestamp = dataHora;

  try {
    const jsonValue = JSON.stringify(userDataLogin);
    await AsyncStorage.setItem(idDB, jsonValue);
    return true;
  } catch (e) {
    //console.log("AsyncStorage(erro): ", e)
    return false;
  }
}

export async function GetLocalDataLogin() {
  try {
    const response = await AsyncStorage.getItem(idDB);
    //Se response existe (<> undefines e null)
    const userDataLogin = response ? JSON.parse(response) : {};
    return userDataLogin;
  } catch (e) {
    //console.log("AsyncStorage(erro): ", e)
    const userDataLogin = {}
    return userDataLogin;
  }
}

export async function RemoveLocalDataLogin() {
  try {
    const response = await AsyncStorage.removeItem(idDB);
    return true;
  } catch (e) {
    //console.log("AsyncStorage(erro): ", e)
    return false;
  }
}