//Tratamento de autenticação de usuário; Baseado no FireBase

export async function logInService(email, senha) {
  console.log("authService-logIn");
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (email === "ericflavio@gmail.com") {
      resolve({
        login: "ericflavio@gmail.com",
        id: "1001",
        token: "e14-gadff-134314-13-1-599-361",
        isContaAtiva: true
      })
    } else {
      reject(new Error('Credenciais inválidas'));
    }
    //}, 2000);
  })
}

export async function signInService(email, senha) {
  console.log("authService-signIn");
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (email === "ericflavio@gmail.com") {
      resolve({
        login: "ericflavio@gmail.com",
        id: "1001",
        token: "e14-gadff-134314-13-1-599-361",
        isContaAtiva: false
      })
    } else {
      reject(new Error('Credenciais inválidas'));
    }
    //s}, 1500);
  })
}