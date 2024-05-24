//Centralizador das mensagens de erro

export const errorTextOops = "Oops!";

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
    case "ob": // Onboarding (tratamento de signI, logIn e logOut)
      switch (cod) {
        //Campos
        case "ob101": newError.message = "Informe um e-mail válido."; break;
        case "ob102": newError.message = "Informe uma senha válida."; break;
        case "ob103": newError.message = "Informe duas senhas iguais."; break;
        //Login
        case "ob104": newError.message = "Não reconhecemos os dados informados. Verifique e tente novamente."; break;
        //Token
        case "ob105": newError.message = "Informe um código com 4 dígitos."; break;
        case "ob106": newError.message = "Estamos com dificuldade para validar o código informado."; break;
        case "ob107": newError.message = "O código informado não é o esperado."; break;
        //Cadastro
        case "ob108": newError.message = "Estamos com dificuldade para cadastrar os dados informadas."; break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    case "pl": // Persistência local
      switch (cod) {
        case "pl10": newError.message = "Informe os dados para persistir" + " [" + cod + "]"; break;
        case "pl11": newError.message = "Falha ao persistir os dados" + " [" + cod + "]"; break;
        case "pl12": newError.message = "Falha ao recuperar dados persistidos" + " [" + cod + "]"; break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;

    //Compartilhado
    case "vc": // Validação de CEP e endereço
      switch (cod) {
        case "vc10": newError.message = "Informe o CEP com 8 dígitos numéricos" + " [" + cod + "]"; break;
        case "vc11": newError.message = "CEP inválido" + " [" + cod + "]"; break;
        case "vc12": newError.message = "Estamos com dificuldades de validar o CEP. Tente novamente mais tarde" + " [" + cod + "]"; break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    case "gu": // Georeferenciamento e URL
      switch (cod) {
        case "gu10": newError.message = "Não parece um endereço web válido" + " [" + cod + "]"; break;
        case "gu11": newError.message = "Informe um endereço web válido" + " [" + cod + "]"; break;
        case "gu12": newError.message = "Informe um código de Latitude válido" + " [" + cod + "]"; break;
        case "gu13": newError.message = "Informe um código de Longitude válido" + " [" + cod + "]"; break;
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