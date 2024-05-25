//Consultar CEP
import axios from 'axios';

export async function pingUrl(url) {
  //const baseUrl = 'https://viacep.com.br/ws/' + cep + '/json/';
  try {
    const response = await axios.request(url); 
    //console.log("response ", response.status
    if (response.status == 200) { return true } else { return false }
  } catch (e) {
    throw e;
  }
}