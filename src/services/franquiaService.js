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
        schemaFranquiaDados.idFranquia= '001';
        schemaFranquiaDados.idUsuarioProprietario= '001';
        schemaFranquiaDados.nome= 'AquaMagic';
        schemaFranquiaDados.cnpj= '000000000';
        schemaFranquiaDados.whatsapp= '370000000';
        schemaFranquiaDados.siteUrl= 'https://aquamagic.com.br';
        schemaFranquiaDados.frasePrincipal= 'Sua lavanderia fora de casa';
        schemaFranquiaDados.fraseSecundaria= 'Lavanderia serlf-service';
        schemaFranquiaDados.uriLogotipo= 'https://imagem/logo';
        schemaFranquiaDados.dataConstituicao= '03/03/2022';
        schemaFranquiaDados.idUsuarioCadastramento= '0000011111';
        schemaFranquiaDados.idUsuarioAtualizacao= '';

        resolve(schemaFranquiaDados)
      } else {
        resolve(null)
      }
    }, 500);
  })
}
//Dados de uma franquia
export async function consultaListaFranquias(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id && id === "s") {
        f1 = {
          idFranquia: '001',
          nome: 'AquaMagic',
          frasePrincipal: 'Sua lavanderia fora de casa',
          fraseSecundaria: 'Lavanderia serlf-service',
          uriLogotipo: 'https://imagem/logo/aquamagic',
        };
        f2 = {
          idFranquia: '002',
          nome: '60 Minutos',
          frasePrincipal: 'Lava e seca rápido',
          fraseSecundaria: 'Lavanderia inteligente',
          uriLogotipo: 'https://imagem/logo/60minutos',
        };
        resolve([f1, f2])
      } else {
        resolve(null)
      }
    }, 500);
  })
}
