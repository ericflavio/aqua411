import axios from 'axios';
import {
  schemaLojaDadosMinimos,
  schemaLojaDados,
  schemaLojaStatus,
  schemaLojaEndereco,
  schemaLojaLocalizacao,
  schemaLojaExpediente,
} from '../schemas/lojaSchema';

//Expediente (horários)
export async function atualizaExpedienteLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 500);
  })
}

export async function consultaExpedienteLoja(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idLoja && idLoja === "s") {
        schemaLojaExpediente.dia= ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
        schemaLojaExpediente.aberto= ["s","s","s","s","s","n","n"];
        schemaLojaExpediente.hrInicio= ["06:00","06:00","06:00","06:00","06:00","06:00","06:00"];
        schemaLojaExpediente.hrFim= ["23:00","23:00","23:00","23:00","23:00","23:00","23:00"];
        schemaLojaExpediente.inPermanentementeAberto= true;
        schemaLojaExpediente.inAtendeChamadosForaDoExpediente= false;
        resolve(schemaLojaExpediente)
      } else {
        resolve(null)
      }
    }, 500);
  })
}

//Status (todos)
export async function consultaListaStatusLoja() {
  const statusLoja = [
    {
      id: "Criando", //Cadastramento iniciado. Ainda não foi ativada pela primeria vez.
      nome: "Criando",
      descricao: "A loja está sendo criada. Omitida da consulta de lojas, e ninguém pode favoritá-la.",
      tituloAcionamento: "Cadastrar uma loja que possuo",
      icone: "add-business", //expo materialIcons
      inPermiteEdicao: true,
      dfs: ["Ativa", "Excluída"]
    },
    {
      id: "Ativa", //Proprietário autorizou que a loja seja encontrata nas pesquisas
      nome: "Ativa",
      descricao: "Todas as pessoas podem pesquisar e favoritar esta loja.",
      tituloAcionamento: "Aparecer nas buscas (ativar)",
      icone: "saved-search", //expo materialIcons
      inPermiteEdicao: true,
      dfs: ["Suspensa", "Inativa"]
    },
    {
      id: "Suspensa", //Temporariamente omitda da consulta de pesquisa de lojas. Também não pode ser favoritada por ninguém.
      nome: "Suspensa",
      descricao: "Situação temporária: Omitida da consulta de lojas, e ninguém pode favoritá-la.",
      tituloAcionamento: "Suspender atividade temparariamente",
      icone: "pause-circle-outline", //expo materialIcons
      inPermiteEdicao: true,
      dfs: ["Ativa", "Inativa"]
    },
    {
      id: "Inativa", //Permanentemente omitida dos resultados das 
      nome: "Inativa",
      descricao: "Permanentemente omitida da consulta de lojas, e ninguém pode mais favoritá-la.",
      tituloAcionamento: "Inativar permamentemente",
      icone: "stop-circle", //expo materialIcons
      inPermiteEdicao: false,
      dfs: []
    },
    {
      id: "Excluída", //Registro deletado da base (mesmo). Cliente desistiu do cadastramento.
      nome: "Excluída",
      descricao: "Permanentemente excluída.",
      tituloAcionamento: "Desistir de cadastrar (excluir)",
      icone: "delete-outline", //expo materialIcons
      inPermiteEdicao: true,
      dfs: []
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(statusLoja)
    }, 500);
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

export async function consultaExistenciaLojaEmCriacao(user) {
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
    }, 500);
  })
}
export async function consultaDadosLoja(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id && id === "s") {
        schemaLojaDados.id = "LOJA00001",
          schemaLojaDados.nome = "Aquamagic-AsaNorte-Brasilia-DF",
          schemaLojaDados.apelido = "Apelido-loja",
          schemaLojaDados.status = "Criando",
          schemaLojaDados.cnpj = "",
          schemaLojaDados.email = "",
          schemaLojaDados.whatsapp = "",
          schemaLojaDados.idImagemCapa = ""
        resolve(schemaLojaDados)
      } else {
        resolve(null)
      }
    }, 500);
  })
}

export async function atualizaDadosBasicosLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 500);
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
    }, 500);
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
    }, 500);
  })
}
export async function atualizaEnderecoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 500);
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
    }, 500);
  })
}
export async function IncluiLocalizacaoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 500);
  })
}
export async function atualizaLocalizacaoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 500);
  })
}




