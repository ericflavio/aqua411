//Contextos são enxergados de forma global pela aplicação. Como este aqui vai
//encapsular o app inteiro, ele sempre será invocado quando o app foi ativado
import { React, createContext, useState, useEffect } from "react";
import { signInService, logInService } from '../services/authService';
import { GetLocalDataLogin, SetLocalDataLogin, RemoveLocalDataLogin } from '../services/localStorageService';

export const AuthContext = createContext({}); // Inicializa contexto vazio

//É necessário criar o provedor do contexto
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true); //Inicialização do app

  useEffect(() => {
    //Toda vez que o app se iniciar/contexto for criado
    //Resgata, se houver, user na storage
    //TODO: remover a remoção
    //RemoveLocalDataLogin();
    loadUserFromLocalStorage();
  }, [])

  //Funções assíncronas para invocação das APIs
  async function signIn(email, senha) {
    if (!email || !senha) return null;
    console.log("authContext-signIn: ", email, senha);
    try {
      const auth = await signInService(email, senha);
      console.log("<!>auth: ", auth);
      await SetLocalDataLogin(auth) //Persiste o usuário localmente
      //setUser(auth) //Rerender atualização dos dados do Contexto ::  Não. Fazer depois do token
      return auth;
    } catch (e) {
      console.log("erro<2>: ", e.message);
      const erro = {
        message: e.message,
        codigo: 100
      }
      throw erro;
    }
  };

  async function signOut() {
    await RemoveLocalDataLogin() //Remove o usuário localmente
    setAuth(null); //limpar o state do objeto user
    return true;
  };

  async function logIn(email, senha) {
    console.log("authContext-logIn");
    if (!email || !senha) return null;
    try {
      const auth = await logInService(email, senha);
      console.log("auth: ", auth);
      await SetLocalDataLogin(auth) //Persiste o usuário localmente
      setUser(auth) //Rerender atualização dos dados do Contexto
      return auth;
    } catch (e) {
      //console.log("erro<2>: ", e.message);
      const erro = {
        message: e.message,
        codigo: 100
      }
      throw erro;
    }
  };

  async function logOut() {
    await RemoveLocalDataLogin() //Remove o usuário localmente
    setAuth(null); //limpar o state do objeto user
    return true;
  };

  async function loadUserFromLocalStorage() {
    try {
      const auth = await GetLocalDataLogin();
      if (auth && auth !== null) {
        setUser(auth) //Rerender e atualização dos dados do Contexto
      }
    } catch (e) { }
    setLoading(false);
  };

  //Como este Provider é invocado no componente _layout.js raiz dentro da
  //pasta scr/app, que é onde start a aplicação como um todo, as informações
  //do contexto serão compartilhadas em todos os lucares/componentes 
  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signOut, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}