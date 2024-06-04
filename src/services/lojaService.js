//Consultar CEP
import axios from 'axios';

export async function consultaListaStatusLoja() {
  const statusLoja = ["Editando", "Ativa", "Suspensa", "Inativa", "Excluída"];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(statusLoja)
    }, 300);
  })
}

export async function consultaUnidades(user) {
  const res = [
    {
      idLoja: "Loja00001",
      nome: "loja-01",
      status: "Editando"
    },
    {
      idLoja: "Loja00002",
      nome: "loja-02",
      status: "Ativa"
    },
    {
      idLoja: "Loja00003",
      nome: "loja-03",
      status: "Excluída"
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
          idLoja: "LOJA00001",
          nome: "Aquamagic-AsaNorte-Brasilia-DF",
          status: "Em edição"
        })
      } else {
        resolve(null)
      }
    }, 1000);
  })
}

