//Consultar CEP
import axios from 'axios';

export async function consultaCepService(cep) {
  //const baseUrl = 'https://viacep.com.br/ws/' + cep + '/json/';
  try {
    const response = await axios.get('https://viacep.com.br/ws/' + cep + '/json'); 
    return response.data;
  } catch (e) {
    throw e;
  }
}