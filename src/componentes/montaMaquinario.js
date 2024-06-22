import { View, Text, TouchableOpacity, } from "react-native";
import { styleApp } from '../styles/styleApp';
import { styleColor } from '../styles/styleColors';
import * as Animatable from 'react-native-animatable'; 

var conjunto = []; //Montagem dos conjuntos (bidimensional)

export function MontaMaquinario(mList, tipoVisualizacao, flagVisualizarStatus) {
  if (!mList || mList.length === 0) {
    return (
      <View style={{justifyContent:'flex-start', alignItems:'center', marginVertical:16}}>
        <Animatable.Image
          animation="rubberBand"
          style={{ resizeMode: "contain"}}
          source={require('../assets/outros/img_ovelha_vazio.png')}
        />
        <Text style={styleApp.textSmallItalico}>
          Esta loja ainda não dispõe de máquinas
        </Text>
      </View>
    )
  }

  var verStatus = false;
  var tipoExibicao = "conjunto";
  flagVisualizarStatus === undefined ? verStatus = false : verStatus = flagVisualizarStatus;
  tipoVisualizacao === undefined ? tipoExibicao = "conjunto" : tipoExibicao = tipoVisualizacao;
  //Tipos = conjunto, lista, quantidade

  //Ordena primeiro as Secas, depois as Lavas.
  mList.sort((a, b) => {
    ka = a.tipo;
    kb = b.tipo;
    if (ka < kb) return 1;
    if (ka > kb) return -1;
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

  function txLabelStatusConjuntoY(maq) {
    verStatus ? txStatus = maq.status : txStatus = "";
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styleApp.textSmallItalico, { marginBottom: 0 }]}>{txStatus}</Text>
        <Text style={[styleApp.textSubtitulo, { marginBottom: 0, marginTop: 0 }]}>{maq.nomeLabel}</Text>
      </View>
    )
  }
  function txLabelStatusConjuntoX(maq) {
    verStatus ? txStatus = maq.status : txStatus = "";
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styleApp.textSubtitulo, { marginBottom: 0, marginTop: 0 }]}>{maq.nomeLabel}</Text>
        <Text style={[styleApp.textSmallItalico, { marginBottom: 0 }]}>{txStatus}</Text>
      </View>
    )
  }
  function txLabelStatusLista(maq) {
    verStatus ? txStatus = maq.status : txStatus = "";
    return (
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={[styleApp.textSubtitulo, { marginBottom: 0, marginTop: 0 }]}>{maq.nomeLabel}</Text>
        <Text style={[styleApp.textSmallItalico, { marginBottom: 0 }]}>{txStatus}</Text>
      </View>
    )
  }
  function desenhoMaquina(maq) {
    maq.tipo === 'l' ? br = 24 : br = 4;
    var cor = 'white';
    if (verStatus) {
      if (maq.status.toLowerCase() !== "disponível" && maq.status.toLowerCase() !== "disponivel") {
        if (maq.status.toLowerCase() !== "manutenção" && maq.status.toLowerCase() !== "manutencao") {
          cor = styleColor.erro;
        } else {
          cor = styleColor.alerta
        }
      } else {
        cor = styleColor.sucesso;
      }
    };

    return (
      <View style={{ width: 60, height: 60, backgroundColor: cor, borderWidth: 2, borderColor: "grey", borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, borderRadius: br, borderWidth: 2, borderColor: "grey", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styleApp.textSubtitulo}>{maq.numeroLabel}</Text>
        </View>
      </View>
    )
  }
  //fim

  function viewConjunto() {
    return (
      <View style={{alignItems:'center', width:'100%', borderWidth:0}}>
      <View style={{ borderWidth:0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, marginVertical:12 }}>
        {conjunto.map((maq, index) => (
          <TouchableOpacity key={index} activeOpacity={0.7}>
            <View style={{ minWidth: 94, justifyContent: 'center', alignItems: 'center', padding: 6, backgroundColor: styleColor.cinzaClaro, borderRadius: 8 }}>
              {maq[0] !== undefined ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  {txLabelStatusConjuntoY(maq[0])}
                  {desenhoMaquina(maq[0])}
                </View>
                : <></>
              }
              {maq[1] !== undefined ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  {desenhoMaquina(maq[1])}
                  {txLabelStatusConjuntoX(maq[1])}
                </View>
                : <></>
              }
            </View>
          </TouchableOpacity>
        ))
        }
      </View >
      </View>
    )
  }


  function viewLista() {
    return (
      <View style={{marginVertical:12, justifyContent:'flex-start', alignContent:'stretch', width:'90%'}}>
        {mList.map((maq, index) => (
          <TouchableOpacity key={index} activeOpacity={0.7}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 6, backgroundColor: styleColor.cinzaClaro, borderRadius: 8, gap: 6, marginBottom: 4 }}>
              {desenhoMaquina(maq)}
              {txLabelStatusLista(maq)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}