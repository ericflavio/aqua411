export default function NewErrorMessage(cod, e) {
  //Se entrar apenas COD, devolve-se a mensagem correspondente.
  //Na ausência do COD, espera-se o "e" para montar o retorno.

 var newError = {
    cod: "",
    message: ""
  }

  const msgDefault = "Lamentamos, mas um erro inesperado aconteceu. Tente novamente mais tarde.";

  if (!cod || cod == null || cod == "") {
    if (e && (e.message || e.cod)) {
      e.cod ? newError.cod = e.cod : newError.cod = "de2700";
      e.message ? newError.message = e.message : newError.message = msgDefault;
      return newError;
    } else {
      newError.cod = "de2701"; //default error
      newError.message = msgDefault;
      return newError;
    }
  }

  newError.cod = cod;
  //Depura o código informado.
  //Cada sessão do aplicativo deve criar um prefixo com dois dígitos iniciais

  switch (cod.substr(0, 2)) {
    case "ob": // Onboarding (tratamento de signIn e logIn)
      switch (cod) {
        case "ob101": newError.message = "Informe um e-mail válido.";
          break;
        case "ob102": newError.message = "Informe uma senha válida.";
          break;
        case "ob103": newError.message = "Informe duas senhas iguais.";
          break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    case "xx": // Onboarding (tratamento de signIn e logIn)
      switch (cod) {
        case "xx101": newError.message = "Informe um e-mail válido.";
          break;
        case "xx102": newError.message = "Informe uma senha válida.";
          break;
        case "xx103": newError.message = "Informe duas senhas iguais.";
          break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;

    default:
      newError.cod = "de2703" + cod.substr(0, 2);
      newError.message = msgDefault + " [" + cod + "]";
  }

  return newError;
}