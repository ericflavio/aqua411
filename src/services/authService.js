async function signIn(email, senha) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (senha == "1234567890") {
        resolve({
          nome:"eric123"
        })
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 500);
  })
}