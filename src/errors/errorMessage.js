import { Alert, ToastAndroid, Platform } from 'react-native';

//Centralizador das mensagens de erro
export const errorTextOops = "Oops!";
const tn = " Tente novamente mais tarde.";

export function NewErrorMessage(cod, e) {
  //Se entrar apenas COD, devolve-se a mensagem correspondente.
  //Na ausência do COD, espera-se o "e" para montar o retorno.

  var newError = {
    cod: "",
    message: ""
  }

  const msgDefault = "Lamentamos, mas um erro inesperado aconteceu." + tn;

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
    case "lj": // Lojas
      switch (cod) {
        //Status
        case "lj001": newError.message = "Estamos com dificuldades para pesquisar os Status." + tn; break;
        case "lj002": newError.message = "Não há novos status possíveis."; break;
        //Endereço
        case "lj003": newError.message = "Não foi possível atualizar os dados do endereço." + tn; break;
        case "lj007": newError.message = "Estamos com dificuldades para pesquisar o endereço." + tn; break;
        //Dados básicos
        case "lj004": newError.message = "O apelido está muito curto. Experimente mais de 3 letras."; break;
        case "lj005": newError.message = "Informe um CNPJ com formato válido"; break;
        case "lj006": newError.message = "Estamos com dificuldades para atualizar os dados básicos agora." + tn; break;
        case "lj008": newError.message = "Estamos com dificuldades para pesquisar os dados básicos da loja." + tn; break;
        //Localizacao
        case "lj009": newError.message = "Estamos com dificuldades para pesquisar os dados de localizacao." + tn; break;
        case "lj010": newError.message = "Estamos com dificuldades para atualizar os dados de localizacao." + tn; break;
        //Expediente (horários)
        case "lj011": newError.message = "Estamos com dificuldades para pesquisar os horários de funcionamento." + tn; break;
        case "lj012": newError.message = "Informe uma hora válida para todos os dias de funcionamento."; break;
        //Maquinario
        case "lj013": newError.message = "Estamos com dificuldades para pesquisar o maquinário da loja." + tn; break;
        case "lj014": newError.message = "Informe um número ainda não utilizado para Lavadora." ; break;
        case "lj015": newError.message = "Informe um número ainda não utilizado para Secadora." ; break;
        case "lj016": newError.message = "Informe um número para a Lavadora." ; break;
        case "lj017": newError.message = "Informe um número para a Secadora." ; break;
        //Facilidades
        case "lj018": newError.message = "Estamos com dificuldades para pesquisar os tipos de facilidades." + tn; break;
        case "lj019": newError.message = "Estamos com dificuldades para pesquisar as facilidades da sua loja." + tn; break;

        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    case "fr": // Franquias
      switch (cod) {
        case "fr001": newError.message = "Estamos com dificuldades para recuperar os dados da franquia vinculada." + tn; break;
        case "fr001": newError.message = "Estamos com dificuldades para recuperar a lista de franquias." + tn; break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    //Compartilhado
    case "pl": // Persistência local
      switch (cod) {
        case "pl010": newError.message = "Informe os dados para persistir" + " [" + cod + "]"; break;
        case "pl011": newError.message = "Falha ao persistir os dados" + " [" + cod + "]"; break;
        case "pl012": newError.message = "Falha ao recuperar dados persistidos" + " [" + cod + "]"; break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    case "vc": // Validação de CEP e endereço
      switch (cod) {
        case "vc010": newError.message = "Informe o CEP com 8 dígitos numéricos" + " [" + cod + "]"; break;
        case "vc011": newError.message = "CEP inválido" + " [" + cod + "]"; break;
        case "vc012": newError.message = "Estamos com dificuldades de validar o CEP." + tn + " [" + cod + "]"; break;
        default:
          newError.cod = "de2702" + cod.substr(0, 2);
          newError.message = msgDefault + " [" + cod + "]";
      }
      break;
    case "gu": // Georeferenciamento e URL
      switch (cod) {
        case "gu010": newError.message = "Informe um endereço válido que começa com 'https://maps.app.goo.gl/'" + " [" + cod + "]"; break;
        case "gu011": newError.message = "Informe um endereço web válido" + " [" + cod + "]"; break;
        case "gu012": newError.message = "Informe um código de Latitude válido" + " [" + cod + "]"; break;
        case "gu013": newError.message = "Informe um código de Longitude válido" + " [" + cod + "]"; break;
        case "gu014": newError.message = "Estamos com dificuldades para validar a url informada" + " [" + cod + "]" + tn; break;
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

export async function ShowErrorMessage(cod, showType) {
  const error = NewErrorMessage(cod);

  if (showType && (showType === "t" || showType === "T" || showType === "toast")) {
    //Toast
    if (Platform.OS === 'ios') {
      Alert.alert(errorTextOops, error.message);
    } else {
      ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  } else {
    //Default ALERT
    Alert.alert(errorTextOops, error.message);
  }
}

