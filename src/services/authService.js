//Tratamento de autenticação de usuário; Baseado no FireBase

export async function logInService(idLogin, senha) {
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (idLogin === "ericflavio@gmail.com") {
      resolve({
        idLogin: "ericflavio@gmail.com",
        tipLogin: "email",
        idUser: "1001",
        name: "Éric Flávio",
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idLogin === "ericflavio@gmail.com") {
        resolve({
          idLogin: "ericflavio@gmail.com",
          tipLogin: "email",
          idUser: "1001",
          name: "Éric Flávio",
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
    }, 1500);
  })
}

export async function checkTokenService(user, token) {
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