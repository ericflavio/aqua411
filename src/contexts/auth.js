//Contextos são enxergados de forma global pela aplicação, e precisam de um 
//componente para guardar seus dados e suas funções (assíncornas) pois só aqui
//elas têm permissão de alteração dos dados do seu respectivo contexto.
import { React, createContext, useState } from "react";
import { authService } from '../services/authService';

//TODO:
{/*var AuthData = {
  auth: {
    nome,
  }
}
var AuthContextData = {
  nome,
  signIn: (email, senha) => Promise,
  signOut: () => Promise,
}
export const AuthContext = createContext({ AuthContextData });
*/}

export const AuthContext = createContext({});

//Agora é necessário criar o provedor do contexto
export default function AuthProvider({children}) {
  const [user, setUser] = useState({});

  //Funções assíncronas para invocação das APIs
  async function signIn() {
    //const auth = await authService.signIn(email, senha);
    //const auth = {nome:"id-1-2"};
    //console.log("auth-signIn: ", auth);
    userData = {
      nome: "Eric Flavio",
      id: "eric123"
    }
    setUser({userData})
    return user;
  };
  async function signOut() {
    setAuth({}); //limpar o objeto Auth
    return true;
  };

  return (
    <AuthContext.Provider value={{user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}