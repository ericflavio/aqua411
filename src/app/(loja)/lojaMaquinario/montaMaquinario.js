
import { View, Text, TouchableOpacity, } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";

var conjunto = []; //Montagem dos conjuntos (bidimensional)

export function MontaMaquinario(mList) {
  console.log("monta maquinario")

  mList =
    [{
      idMaquina: "UUID01",
      tipo: "l",
      nrConjunto: 123,
      numeroLabel: "1",
      nomeLabel: "Lava",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID02",
      tipo: "s",
      nrConjunto: 123,
      numeroLabel: "2",
      nomeLabel: "Seca",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID03",
      tipo: "l",
      nrConjunto: 347,
      numeroLabel: "3",
      nomeLabel: "Lava",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID04",
      tipo: "s",
      nrConjunto: 347,
      numeroLabel: "4",
      nomeLabel: "Seca",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID05",
      tipo: "l",
      nrConjunto: 5611,
      numeroLabel: "5",
      nomeLabel: "Lava",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID06",
      tipo: "s",
      nrConjunto: 5611,
      numeroLabel: "6",
      nomeLabel: "Seca",
      status: "Disponível",
      capacidadeKg: 11,
    },
    ]

  const tipoExibicao = "conjunto";

  //Ordena primeiro as Lavas, depois as Secas.
  mList.sort((a, b) => {
    ka = a.tipo + a.numeroLabel;
    kb = b.tipo + b.numeroLabel;
    if (ka < kb) return -1;
    if (ka > kb) return 1;
    return 0;
  })

  if (tipoExibicao === "conjunto") {
    montaConjuntos();
  };

  function montaConjuntos() {
    var maquinas = []; //Cada maquina do conjunto
    var indiceConjunto = 0;
    var cj = 0 //conjunto a ser tratado
    var flagConjuntoJaTratado = Array.from({ length: mList.length }, () => 0); //Todas as ocorrências como zero (nrConjunto) 

    for (var i = 0; i < mList.length; i++) {
      console.log("<", i, ">")
      cj = mList[i].nrConjunto

      if (flagConjuntoJaTratado.indexOf(cj) < 0) { //Conjunto ainda não foi montado
        console.log("conjunto_nao_tratado: ", cj)
        flagConjuntoJaTratado[indiceConjunto] = cj //Guarda nr do conjunto já montado
        maquinas = mList.filter((maq) => maq.nrConjunto === cj); //Encontra o par
        console.log("maquinas encontratas: ", maquinas.length, maquinas)
        conjunto[indiceConjunto] = maquinas;
        indiceConjunto++;
      }
    }
  }

  if (tipoExibicao === "conjunto") {
    return viewConjunto();
  } else {
    return viewLista();
  }

  function viewConjunto() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
        {conjunto.map((maq, index) => (
          <TouchableOpacity key={index} activeOpacity={0.7}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 6, backgroundColor: styleColor.cinzaClaro, borderRadius: 8, gap: 6, alignSelf: 'baseline' }}>
              <View style={{ margin: 4 }}>
                {maq[0] !== undefined ?
                  <View>
                    <View>
                      <Text style={styleApp.textSubtitulo}>{maq[0].nomeLabel}</Text>
                      <Text>{maq[0].status}</Text>
                    </View>

                    {maq[0].tipo === 'l' ?
                      <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styleApp.textSubtitulo}>{maq[0].numeroLabel}</Text>
                      </View>
                      :
                      <View style={{ width: 48, height: 48, borderRadius: 4, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styleApp.textSubtitulo}>{maq[0].numeroLabel}</Text>
                      </View>
                    }

                  </View>
                  : <></>
                }
                {maq[1] !== undefined ?
                  <View>
                    {maq[1].tipo === 'l' ?
                      <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styleApp.textSubtitulo}>{maq[1].numeroLabel}</Text>
                      </View>
                      :
                      <View style={{ width: 48, height: 48, borderRadius: 4, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styleApp.textSubtitulo}>{maq[1].numeroLabel}</Text>
                      </View>
                    }
                    <View>
                      <Text style={styleApp.textSubtitulo}>{maq[1].nomeLabel}</Text>
                      <Text>{maq[1].status}</Text>
                    </View>
                  </View>
                  : <></>
                }
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }


  function viewLista() {
    return (
      <>
        {tipoExibicao !== "conjunto" ?
          mList.map((maq, index) => (
            <TouchableOpacity key={index} activeOpacity={0.7}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 6, backgroundColor: styleColor.cinzaClaro, borderRadius: 8, gap: 6, marginBottom: 4 }}>
                <View style={{ width: 60, height: 60, backgroundColor: "white", borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                  {maq.tipo === 'l' ?
                    <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={styleApp.textSubtitulo}>{maq.numeroLabel}</Text>
                    </View>
                    :
                    <View style={{ width: 48, height: 48, borderRadius: 4, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={styleApp.textSubtitulo}>{maq.numeroLabel}</Text>
                    </View>
                  }
                </View>
                <View>
                  <Text style={styleApp.textSubtitulo}>{maq.nomeLabel}</Text>
                  <Text>Status: {maq.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
          :
          conjunto.map((maq, index) => (
            <TouchableOpacity key={index} activeOpacity={0.7}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 6, backgroundColor: styleColor.cinzaClaro, borderRadius: 8, gap: 6, alignSelf: 'baseline' }}>
                <View style={{ margin: 4 }}>
                  {maq[0] !== undefined ?
                    <View>
                      <View>
                        <Text style={styleApp.textSubtitulo}>{maq[0].nomeLabel} {maq[0].numeroLabel}</Text>
                        <Text>{maq[0].status}</Text>
                      </View>
                      <View style={{ width: 60, height: 60, backgroundColor: "white", borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 0, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                      </View>
                    </View>
                    : <></>
                  }
                  {maq[1] !== undefined ?
                    <View>
                      <View style={{ width: 60, height: 60, backgroundColor: "white", borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 48, height: 48, borderRadius: 25, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                      </View>
                      <View>
                        <Text style={styleApp.textSubtitulo}>{maq[1].nomeLabel} {maq[1].numeroLabel}</Text>
                        <Text>{maq[1].status}</Text>
                      </View>
                    </View>
                    : <></>
                  }
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </>
    )
  }
}