//Consultar CEP
import axios from 'axios';

export async function consultaListaStatusLoja() {
  const statusLoja = ["Editando", "Ativa", "Suspensa", "Inativa", "Excluída"];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (l && l === "s") {
      resolve({statusLoja})
    } else {
      resolve(null)
    }
    }, 2000);
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
    }, 2000);
  })
}

