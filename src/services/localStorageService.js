import AsyncStorage from '@react-native-async-storage/async-storage';
//TODO: Sempre atualizar a chave do nome do DB AsyncStorage, no padrão
//@nomedoapp:coleção

export const idDB = "@lavanderias:DadosLogin"

export async function SetDataLogin(userDataLogin) {
  if (userDataLogin == undefined) return false;
  if (userDataLogin.nome == undefined) return false;
  if (userDataLogin.user == undefined) return false;

  var d = new Date();
  var dataHora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
  userDataLogin.timestamp = dataHora;
  console.log("SetLogin", userDataLogin);

  try {
    const jsonValue = JSON.stringify(userDataLogin);
    await AsyncStorage.setItem(idDB, jsonValue);
    return true;
  } catch (e) {
    console.log("AsyncStorage(erro): ", e)
    return false;
  }
}

export async function GetDataLogin() {
  console.log("idDBStorage: ", idDB);
  try {
    const response = await AsyncStorage.getItem(idDB);
    var userDataLogin = JSON.parse(response);
    console.log("GetLogin: ", userDataLogin);
  } catch (e) {
    console.log("AsyncStorage(erro): ", e)
  }
}