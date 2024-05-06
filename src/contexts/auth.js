//Contextos são enxergados de forma global pela aplicação. Como este aqui vai
//encapsular o app inteiro, ele sempre será invocado quando o app foi ativado
import { React, createContext, useState, useEffect } from "react";
import { authService } from '../services/authService';
import {GetLocalDataLogin , SetLocalDataLogin , RemoveLocalDataLogin} from '../services/localStorageService';

export const AuthContext = createContext({}); // Inicializa contexto vazio

//É necessário criar o provedor do contexto
export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true); //Inicialização do app

  useEffect (() => {
    //Toda vez que o app se iniciar/contexto for criado
    //TODO: remover timeout
    //console.log("<a> authContext: useEffect");
    setTimeout(() => {
      loadUserFromLocalStorage(); //Resgata, se houver, user na storage
    }, 1500);
  },[])

  //Funções assíncronas para invocação das APIs
  async function signIn(email, senha) {
    if (!email || !senha) return null;
    const auth = await authService.signIn(email, senha);
    //console.log("authContext-signIn: ", auth);

    setUser(auth) //Rerender atualização dos dados do Contexto
    SetLocalDataLogin(user) //Persiste o usuário localmente
    return user;
  };

  function signOut() {
    setAuth(null); //limpar o state do objeto user
    RemoveLocalDataLogin() //Remove o usuário localmente
    return true;
  };

  async function loadUserFromLocalStorage() {
    const auth = await GetLocalDataLogin();
    //console.log("<b> authContext: loadUserStorage")
    if (auth && auth !== null) {
      setUser(auth) //Rerender e atualização dos dados do Contexto
    }
    setLoading(false);
    //console.log("authContext-loadStorage: ", auth);
  };

 //Como este Provider é invocado no componente _layout.js raiz dentro da
 //pasta scr/app, que é onde start a aplicação como um todo, as informações
 //do contexto serão compartilhadas em todos os lucares/componentes 
  return (
    <AuthContext.Provider value={{isLoading, user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}