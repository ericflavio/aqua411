import axios from 'axios';
import {
  schemaFranquiaDados,
  schemaFranquiaIngerenciaSobreLojas,
  schemaFranquiaSolicitacaoVinculos
} from '../schemas/franquiaSchema';

//Dados de uma franquia
export async function consultaDadosFranquia(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id && id === "s") {
        schemaFranquiaDados = {
          idFranquia: '001',
          idUsuarioProprietario= '001',
          nome: 'AquaMagic',
          cnpj: '000000000',
          whatsapp: '370000000',
          siteUrl: 'https://aquamagic.com.br',
          frasePrincipal: 'Sua lavanderia fora de casa',
          fraseSecundaria: 'Lavanderia serlf-service',
          uriLogotipo: 'https://imagem/logo',
          dataConstituicao: '03/03/2022',
          idUsuarioCadastramento: '0000011111',
          idUsuarioAtualizacao: '',
        };
        resolve(schemaFranquiaDados)
      } else {
        resolve(null)
      }
    }, 500);
  })
}
