//Consultar CEP
import axios from 'axios';
import { schemaLoja, schemaLojaStatus, schemaLojaEndereco } from '../schemas/lojaSchema';

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
    /*     {
          id: "Excluída",
          nome: "Excluída",
          descricao: "Foi excluída durante sua criação.",
          dfs: []
        }, */
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(statusLoja)
    }, 300);
  })
}

export async function consultaUnidades(user) {
  const res = [
    {
      id: "Loja00001",
      nome: "loja-01",
      apelido: "Apelido-loja",
      status: "Criando"
    },
    {
      id: "Loja00002",
      nome: "loja-02",
      apelido: "Apelido-loja",
      status: "Inativa"
    },
    {
      id: "Loja00003",
      nome: "loja-03",
      apelido: "Apelido-loja",
      status: "Suspensa"
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
          status: "Criando"
        })
      } else {
        resolve(null)
      }
    }, 1000);
  })
}

//Endereco
export async function consultaEndereco(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        cep: "70847060",
        localidade: "Plano Piloto",
        uf: "DF",
        ddd: "61",
        bairro: "Asa Norte",
        logradouro: "SQN 109 Bloc A",
        numero: "108",
        complemento: "Apto",
      })
    }, 1000);
  })
}
export async function IncluiEndereco(endereco) {
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
export async function atualizaEndereco(endereco) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 1000);
  })
}


