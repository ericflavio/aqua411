//Tratamento de autenticação de usuário; Baseado no FireBase

export async function logInService(idLogin, senha) {
  console.log("authService-logIn");
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (idLogin === "ericflavio@gmail.com") {
      resolve({
        idlogin: "ericflavio@gmail.com",
        tipLogin: "email",
        idUser: "1001",
        token: "e14-gadff-134314-13-1-599-361",
        isLiveAccount: false,
        isHasStore: false,
        isFranchise: false,
        isFranchiser: false,
        idFavoriteStore: null
      })
    } else {
      reject(new Error('Credenciais inválidas'));
    }
    //}, 2000);
  })
}

export async function signInService(idLogin, senha) {
  console.log("authService-signIn");
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (idLogin === "ericflavio@gmail.com") {
      resolve({
        idlogin: "ericflavio@gmail.com",
        tipLogin: "email",
        idUser: "1001",
        token: "e14-gadff-134314-13-1-599-361",
        isLiveAccount: false,
        isHasStore: false,
        isFranchise: false,
        isFranchiser: false,
        idFavoriteStore: null
      })
    } else {
      reject(new Error('Credenciais inválidas'));
    }
    //s}, 1500);
  })
}

export async function checkTokenService(user, token) {
  console.log("authService-checkTokenService, user: ", user , " token: ", token);
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (token == "abcd") {
      resolve(true)
    } else {
      reject(false);
    }
    //}, 2000);
  })
}