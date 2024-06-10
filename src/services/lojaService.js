import axios from 'axios';
import {
  schemaLojaDadosMinimos,
  schemaLojaDados,
  schemaLojaStatus,
  schemaLojaEndereco,
  schemaLojaLocalizacao
} from '../schemas/lojaSchema';

export async function consultaListaStatusLoja() {
  const statusLoja = [
    {
      id: "Criando", //Cadastramento iniciado. Ainda não foi ativada pela primeria vez.
      nome: "Criando",
      descricao: "A loja está sendo criada. Omitida da consulta de lojas, e ninguém pode favoritá-la.",
      inPermiteEdicao: true,
      dfs: ["Ativa"]
    },
    {
      id: "Ativa", //Proprietário autorizou que a loja seja encontrata nas pesquisas
      nome: "Ativa",
      descricao: "Todas as pessoas podem pesquisar e favoritar esta loja.",
      inPermiteEdicao: true,
      dfs: ["Suspensa", "Inativa"]
    },
    {
      id: "Suspensa", //Temporariamente omitda da consulta de pesquisa de lojas. Também não pode ser favoritada por ninguém.
      nome: "Suspensa",
      descricao: "Situação temporária: Omitida da consulta de lojas, e ninguém pode favoritá-la.",
      inPermiteEdicao: true,
      dfs: ["Ativa", "Inativa"]
    },
    {
      id: "Inativa", //Permanentemente omitida dos resultados das 
      nome: "Inativa",
      descricao: "Permanentemente omitida da consulta de lojas, e ninguém pode mais favoritá-la.",
      inPermiteEdicao: false,
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
      apelido: "Apelido-01",
      status: "Criando",
      cnpj: ""
    },
    {
      id: "Loja00002",
      nome: "loja-02",
      apelido: "Apelido-02",
      status: "Inativa",
      cnpj: ""
    },
    {
      id: "Loja00003",
      nome: "loja-03",
      apelido: "Apelido-03",
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
      if (user && user === "s") {
        schemaLojaDadosMinimos.id = "LOJA00001",
        schemaLojaDadosMinimos.nome = "Aquamagic-AsaNorte-Brasilia-DF",
        schemaLojaDadosMinimos.apelido = "Apelido-loja",
        schemaLojaDadosMinimos.status = "Criando",
        schemaLojaDadosMinimos.cnpj = ""
        resolve(schemaLojaDadosMinimos)
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




