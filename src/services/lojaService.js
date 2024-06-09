import axios from 'axios';
import {
  schemaLoja,
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

export async function consultaLojaEmEdicao(l) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (l && l === "s") {
        resolve({
          id: "LOJA00001",
          nome: "Aquamagic-AsaNorte-Brasilia-DF",
          apelido: "Apelido-loja",
          status: "Criando",
          cnpj: ""
        })
      } else {
        resolve(null)
      }
    }, 1000);
  })
}

export async function atualizaDadosBasicosLoja(loja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 1000);
  })
}

//Endereco
export async function consultaEnderecoLoja(id) {
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
export async function IncluiEnderecoLoja(endereco) {
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
export async function atualizaEnderecoLoja(endereco) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 1000);
  })
}

//Localização geográfica
export async function consultaLocalizacaoLoja(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //schemaLojaLocalizacao.latitude = "13.0929340";
      //schemaLojaLocalizacao.longitude = "-27.9828120";
      //schemaLojaLocalizacao.urlMapa = "https://maps.google.com";
      resolve(null)
    }, 2000);
  })
}
export async function IncluiLocalizacaoLoja(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 1000);
  })
}
export async function atualizaLocalizacaoLoja(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 1000);
  })
}




