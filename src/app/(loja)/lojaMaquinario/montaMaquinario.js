
import { View, Text, TouchableOpacity, } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";

export function MontaMaquinario(mList) {
  console.log("monta maquinario")

  mList =
    [{
      idMaquina: "UUID01",
      tipo: "l",
      nrConjunto: 123,
      numeroLabel: "1",
      nomeLabel: "Lava 1",
      status: "Disponível",
    },
    {
      idMaquina: "UUID02",
      tipo: "s",
      nrConjunto: 123,
      numeroLabel: "2",
      nomeLabel: "Seca 2",
      status: "Disponível",
    },
    {
      idMaquina: "UUID03",
      tipo: "l",
      nrConjunto: 347,
      numeroLabel: "3",
      nomeLabel: "Lava 3",
      status: "Disponível",
    },
    {
      idMaquina: "UUID04",
      tipo: "s",
      nrConjunto: 347,
      numeroLabel: "14",
      nomeLabel: "Seca 4",
      status: "Disponível",
    },
    {
      idMaquina: "UUID05",
      tipo: "l",
      nrConjunto: 5611,
      numeroLabel: "5",
      nomeLabel: "Lava 5",
      status: "Disponível",
    },
    {
      idMaquina: "UUID06",
      tipo: "s",
      nrConjunto: 5611,
      numeroLabel: "6",
      nomeLabel: "Seca 6",
      status: "Disponível",
    }]



  const tipoExibicao = "lista";
  if (tipoExibicao === "conjunto") {
    //Ordena pelo número do conjunto
    mList.sort((a, b) => {
      if (a.nrConjunto < b.nrConjunto) return -1;
      if (a.nrConjunto > b.nrConjunto) return 1;
      if (a.tipo === 'l') return -1;
      return 0;
    })
  } else {
    //Ordena primeiro as Lavas, depois as Secas.
    mList.sort((a, b) => {
      console.log("a: ", a, " b: ", b)
      if (a.tipo === 'l') return -1;
      if (a.tipo === 's') return 1;
      return 0;
    })
  };

  //console.log("lista_ordenada ", mList)
  return (


    <View style={styles.containerPrincipal}>

      {tipoExibicao !== "conjunto" ? 
        mList.map((maq, index) => (
          <TouchableOpacity key={index}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 6, backgroundColor: styleColor.sucesso, borderRadius: 8, gap: 6 }}>
              <View style={{ width: 60, height: 60, backgroundColor: "white", borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 48, height: 48, borderRadius: 25, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
                </View>
              </View>
              <View>
                <Text style={styleApp.textSubtitulo}>{[maq.nomeLabel, maq.numeroLabel]}</Text>
                <Text>Status: {maq.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
        :
        <></>
      }


      <View style={{ justifyContent: 'flex-start', alignItems: 'center', padding: 6, backgroundColor: styleColor.cinzaClaro, borderRadius: 8, gap: 6, alignSelf: 'baseline' }}>
        <View>
          <Text style={styleApp.textSubtitulo}>SECA 2</Text>
          <Text>Disponível</Text>
        </View>
        <View style={{ width: 60, height: 60, backgroundColor: "white", borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 42, height: 42, borderRadius: 0, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
          </View>
        </View>
        <View style={{ width: 60, height: 60, backgroundColor: "white", borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 48, height: 48, borderRadius: 25, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
          </View>
        </View>
        <View>
          <Text style={styleApp.textSubtitulo}>LAVA 1</Text>
          <Text>Disponível</Text>
        </View>
      </View>
    </View >
  )
}