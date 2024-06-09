import axios from 'axios';
import {
  schemaLojaDadosBasicos,
  schemaLojaDadosComplementares,
  schemaLojaStatus,
  schemaLojaEndereco,
  schemaLojaLocalizacao
} from '../schemas/lojaSchema';

export async function consultaListaStatusLoja() {
  const statusLoja = [
    {
      id: "Criando",
      nome: "Criando",
      descricao: "A loja está sendo criada. Apenas o proprietário pesquisar e favoritar esta loja.",
      dfs: ["Ativa"]
    },
    {
      id: "Ativa",
      nome: "Ativa",
      descricao: "Todas as pessoas podem pesquisar e favoritar esta loja.",
      dfs: ["Suspensa", "Inativa"]
    },
    {
      id: "Suspensa",
      nome: "Suspensa",
      descricao: "Situação temporária. Pode ser pesquisada, porém ninguém pode favoritá-la.",
      dfs: ["Ativa", "Inativa"]
    },
    {
      id: "Inativa",
      nome: "Inativa",
      descricao: "Não aparece nas pesquisas de lojas.",
      dfs: []
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(statusLoja)
    }, 300);
  })
}

export async function consultaListaUnidades(user) {
  const res = [
    {
      id: "Loja00001",
      nome: "loja-01",
      apelido: "Apelido-loja",
      status: "Criando",
      cnpj: ""
    },
    {
      id: "Loja00002",
      nome: "loja-02",
      apelido: "Apelido-loja",
      status: "Inativa",
      cnpj: ""
    },
    {
      id: "Loja00003",
      nome: "loja-03",
      apelido: "Apelido-loja",
      status: "Suspensa",
      cnpj: ""
    }
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res);
    }, 500);
  })
}

export async function consultaLojaEmEdicao(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (l && l === "s") {
        schemaLojaDadosBasicos.id = "LOJA00001",
        schemaLojaDadosBasicos.nome = "Aquamagic-AsaNorte-Brasilia-DF",
        schemaLojaDadosBasicos.apelido = "Apelido-loja",
        schemaLojaDadosBasicos.status = "Criando",
        schemaLojaDadosBasicos.cnpj = ""
        resolve(schemaLojaDadosBasicos)
      } else {
        resolve(null)
      }
    }, 1000);
  })
}

export async function atualizaDadosBasicosLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 1000);
  })
}

//Endereco
export async function consultaEnderecoLoja(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        cep: "70847060",
        localidade: "Brasilia",
        uf: "DF",
        ddd: "61",
        bairro: "Asa Norte",
        logradouro: "SQN 109 Bloco A",
        numero: "108",
        complemento: "Apto",
      })
    }, 2000);
  })
}
export async function IncluiEnderecoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endereco) {
        resolve(null)
      } else {
        resolve(null)
      }
    }, 1000);
  })
}
export async function atualizaEnderecoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 1000);
  })
}

//Localização geográfica
export async function consultaLocalizacaoLoja(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //schemaLojaLocalizacao.latitude = "13.0929340";
      //schemaLojaLocalizacao.longitude = "-27.9828120";
      //schemaLojaLocalizacao.urlMapa = "https://maps.google.com";
      resolve(null)
    }, 2000);
  })
}
export async function IncluiLocalizacaoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 1000);
  })
}
export async function atualizaLocalizacaoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 1000);
  })
}




