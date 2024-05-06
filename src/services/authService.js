//Tratamento de autenticação de usuário; Baseado no FireBase

export async function signIn(email, senha) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (senha == "1234567890") {
        resolve({
          login:"ericflavio@gmail.com",
          id: "1001",
          token: "e14-gadff-134314-13-1-599-361"
        })
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 500);
  })
}