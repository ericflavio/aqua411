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
          idUsuarioProprietario: '001',
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
//Dados de uma franquia
export async function listaFranquias(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id && id === "s") {
        f1 = {
          idFranquia: '001',
          idUsuarioProprietario: '001',
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
        f2 = {
          idFranquia: '001',
          idUsuarioProprietario: '001',
          nome: 'Lavô',
          cnpj: '000000000',
          whatsapp: '370000000',
          siteUrl: 'https://lavo.com.br',
          frasePrincipal: 'Lavanderia inteligente',
          fraseSecundaria: 'Venha lavar conscno',
          uriLogotipo: 'https://imagem/logo',
          dataConstituicao: '03/03/2022',
          idUsuarioCadastramento: '0000011111',
          idUsuarioAtualizacao: '',
        };
        resolve([f1, f2])
      } else {
        resolve(null)
      }
    }, 500);
  })
}
