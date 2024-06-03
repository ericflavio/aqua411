//Consultar CEP
import axios from 'axios';

export async function consultaLojaEmEdicao(l) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (l && l === "s") {
      console.log("x")
      resolve({
        idLoja: "LOJA00001",
        nome: "Aquamagic-AsaNorte-Brasilia-DF",
        status: "Em edição"
      })
    } else {
      //devolve nulo
      resolve(null)
    }
    }, 2000);
  })
}