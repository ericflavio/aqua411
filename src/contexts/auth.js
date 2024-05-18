import { React, createContext, useState, useEffect } from "react";
import { signInService, logInService, checkTokenService } from '../services/authService';
import { GetLocalDataLogin, SetLocalDataLogin, RemoveLocalDataLogin } from '../services/localStorageService';

export const AuthContext = createContext({}); // Inicializa contexto vazio

//É necessário criar o provedor do contexto
export default function AuthProvider({ children }) {
  console.log("children: ", children);
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
      setUser(auth) //Rerender atualização dos dados do Contexto
      return auth;
    } catch (e) {
      console.log("erro<2>: ", e.message);
      const erro = {
        message: e.message,
        cod: 100
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
        cod: 100
      }
      throw erro;
    }
  };

  async function checkToken(user, token) {
    if (!user || !token) return false;
    console.log("authContext-checkToken, user: ", user, " token: ", token);
    try {
      const isTokenValido = await checkTokenService(user, token);
      console.log("isTokenValido: ", isTokenValido);
      if (isTokenValido) {
        user.isContaAtiva = true;
        await SetLocalDataLogin(user) //Persiste o usuário localmente
        setUser(user) //Rerender atualização dos dados do Contexto
      }
      return true;
    } catch (e) {
      const erro = {
        message: e.message,
        cod: 100
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
  //do contexto serão compartilhadas em todos os lugares/componentes 
  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signOut, logIn, logOut, checkToken }}>
      {children}
    </AuthContext.Provider>
  )
}