import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styleApp } from '../styles/styleApp';
import { styleColor } from '../styles/styleColors';
import { styleSize } from '../styles/styleSize';
import * as Animatable from 'react-native-animatable';
import { schemaTipoViewMaquinario, schemaStatusMaquinario } from '../schemas/lojaSchema';

export function MontaMaquinario(maquinarioList, tipoVisualizacaoMaquinario, flagVisualizarStatus) {
  if (!maquinarioList || maquinarioList === null || maquinarioList.length === 0) {
    return (
      <View style={stylesLocal.containerSemMaquinario}>
        <Animatable.Image
          animation="rubberBand"
          style={{ resizeMode: "contain" }}
          source={require('../assets/outros/img_ovelha_vazio.png')}
        />
        <Text style={styleApp.textSmallItalico}>
          Esta loja ainda não dispõe de máquinas
        </Text>
      </View>
    )
  };

  var conjunto = []; //Montagem dos conjuntos (bidimensional: Cada ocorrência contém outro array [lava][seca])
  var verStatus = false;
  var tipoExibicao = schemaTipoViewMaquinario.conjunto;
  flagVisualizarStatus === undefined ? verStatus = false : verStatus = flagVisualizarStatus;
  tipoVisualizacaoMaquinario === undefined ? tipoExibicao = schemaTipoViewMaquinario.conjunto : tipoExibicao = tipoVisualizacaoMaquinario; //Tipos = conjunto, lista,

  //Ordena: primeiro as Secas, depois as Lavas.
  maquinarioList.sort((a, b) => {
    ka = a.tipo;
    kb = b.tipo;
    if (ka < kb) return 1;
    if (ka > kb) return -1;
    return 0;
  })

  if (tipoExibicao === schemaTipoViewMaquinario.conjunto) {
    try {
      encontraeMontaConjuntos();
      return viewConjunto();
    } catch {
      return (
        <View>
          <Text style={styleApp.textSmallItalico}>
            Oops! Estamos com dificuldades para montar o maquinário. Tente novamente mais tarde.
          </Text>
        </View>
      )
    }
  } else {
    return viewLista();
  }

  async function encontraeMontaConjuntos() {
    var maquinas = []; //Cada maquina do conjunto
    var indiceConjunto = 0;
    var cj = 0 //conjunto a ser tratado
    var flagConjuntoJaTratado = Array.from({ length: maquinarioList.length }, () => 0); //Todas as ocorrências como zero (nrConjunto) 

    for (var i = 0; i < maquinarioList.length; i++) {
      cj = maquinarioList[i].nrConjunto
      if (flagConjuntoJaTratado.indexOf(cj) < 0) { //Conjunto ainda não foi montado
        flagConjuntoJaTratado[indiceConjunto] = cj //Guarda nr do conjunto já montado
        maquinas = maquinarioList.filter((maq) => maq.nrConjunto === cj); //Encontra o par

        conjunto[indiceConjunto] = maquinas;
        indiceConjunto++;
      }
    }
  }
  function txLabelStatusConjuntoY(maq) {
    verStatus ? txStatus = maq.status : txStatus = "";
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styleApp.textSmallItalico}>{txStatus}</Text>
        <Text style={styleApp.textSubtitulo}>{maq.nomeLabel}</Text>
      </View>
    )
  }
  function txLabelStatusConjuntoX(maq) {
    verStatus ? txStatus = maq.status : txStatus = "";
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styleApp.textSubtitulo}>{maq.nomeLabel}</Text>
        <Text style={styleApp.textSmallItalico}>{txStatus}</Text>
      </View>
    )
  }
  function txLabelStatusLista(maq) {
    verStatus ? txStatus = maq.status : txStatus = "";
    return (
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={styleApp.textSubtitulo}>{maq.nomeLabel}</Text>
        <Text style={styleApp.textSmallItalico}>{txStatus}</Text>
      </View>
    )
  }
  function desenhoMaquina(maq) {
    maq.tipo === 'l' ? br = 24 : br = 4;
    var cor = 'white';
    if (verStatus) {
      if (maq.status.toLowerCase() !== schemaStatusMaquinario.disponivel.toLowerCase()) {
        if (maq.status.toLowerCase() !== schemaStatusMaquinario.manutencao.toLowerCase()) {
          cor = styleColor.erro;
        } else {
          cor = styleColor.alerta
        }
      } else {
        cor = styleColor.sucesso;
      }
    };

    return (
      <View style={[stylesLocal.containerDesenhoMaquinaExterno, { backgroundColor: cor }]}>
        <View style={[stylesLocal.containerDesenhoMAquinaInterno, { borderRadius: br }]}>
          <Text style={styleApp.textSubtitulo}>{maq.numeroLabel}</Text>
        </View>
      </View>
    )
  }

  function viewConjunto() {
    return (
      <View style={stylesLocal.containerConjunto}>
        {conjunto.map((maq, index) => (
          <TouchableOpacity key={index} activeOpacity={0.5}>
            <View style={stylesLocal.containerLavaSecaConjunto}>
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
      </View>
    )
  }

  function viewLista() {
    return (
      <View style={stylesLocal.containerLista}>
        {maquinarioList.map((maq, index) => (
          <TouchableOpacity key={index} activeOpacity={0.5}>
            <View style={stylesLocal.containerLavaSecaLista}>
              {desenhoMaquina(maq)}
              {txLabelStatusLista(maq)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
};

const stylesLocal = StyleSheet.create({
  containerSemMaquinario: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 16
  },
  containerDesenhoMaquinaExterno: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerDesenhoMAquinaInterno: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerConjunto: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 4,
    marginVertical: 12
  },
  containerLavaSecaConjunto: {
    minWidth: 94,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    backgroundColor: styleColor.cinzaClaro,
    borderRadius: 8
  },
  containerLista: {
    marginVertical: 12,
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    width: '90%'
  },
  containerLavaSecaLista: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 6,
    backgroundColor: styleColor.cinzaClaro,
    borderRadius: 8,
    gap: 6,
    marginBottom: 4
  }
});