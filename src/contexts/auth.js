//Contextos são enxergados de forma global pela aplicação
import { React, createContext, useState } from "react";
import { authService } from '../services/authService';
import {GetLocalDataLogin , SetLocalDataLogin , RemoveLocalDataLogin} from '../services/localStorageService';

export const AuthContext = createContext({}); // Inicializa contexto vazio

//É necessário criar o provedor do contexto
export default function AuthProvider({children}) {
  const [user, setUser] = useState({});

  //Funções assíncronas para invocação das APIs
  async function signIn(email, senha) {
    const userData = {}
    if (!email || !senha) return userData;
    const auth = await authService.signIn(email, senha);
    console.log("authContext-signIn: ", auth);
/*     userData = {
      login: auth.email,
      id: auth.id,
      token: auth.token
    } */
    setUser(auth) //Rerender e atualização dos dados do Contexto
    SetLocalDataLogin(user) //Persiste o usuário localmente
    return user;
  };

  function signOut() {
    setAuth({}); //limpar o state do objeto user
    RemoveLocalDataLogin() //Remove o usuário localmente
    return true;
  };

  return (
    <AuthContext.Provider value={{user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}