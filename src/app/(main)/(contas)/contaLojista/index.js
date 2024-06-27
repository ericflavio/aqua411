import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../../styles/styleApp';
import { styleColor } from "../../../../styles/styleColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../../componentes/gradienteFill';
import { AuthContext } from "../../../../contexts/auth";
import { router } from 'expo-router';
import { consultaExistenciaLojaEmCriacao } from '../../../../services/lojaService';
import { ShowErrorMessage } from '../../../../errors/errorMessage';
import { schemaLojaDadosMinimos } from '../../../../schemas/lojaSchema';
import ModalSimples from '../../../../componentes/modalSimples';

//Tela principal HOME
export function ViewContaLojista() {
  const { user, logOut } = useContext(AuthContext);
  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: false });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [lojaDados, setLojaDados] = useState(null);

  var name = "Olá!";
  user.name ? name = user.name : name = user.idLogin;

  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    //Verifica se existe loja sendo criada (status = criando)
    try {
      res = await consultaExistenciaLojaEmCriacao("n"); //Verifica se já possui alguma sendo criada
    } catch {
      res = null; //Erro na pesquisad de Loja em estágio de criação para continuar.
      ShowErrorMessage("lj008");
    };
    if (res !== null) {
      setLojaDados(res);
    };
    setProcessing({ ...processing, isLoading: false });
  }

  //Funções auxiliares 
  function handleShowModal() {
    setflagShowModal(!flagShowModal);
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }

  function vazia() {
  }

  //Lojas
  function adicionarLoja() {
    //Vai pro menu de edição, se existir loja já sendo criada, ou inicia um cadastro básico.
    if (lojaDados !== null) {
      router.push({
        pathname: "/lojaMenu",
        params: {
          navigateParmLoja: JSON.stringify(lojaDados), naviateParmOnlyConsulta: false
        }
      })
    } else {
      router.push({
        pathname: "/lojaCadastroBasico",
        params: {
          navigateParmLoja: null, naviateParmOnlyConsulta: false
        }
      })
    }
  }
  function listarLojas() {
    router.push('/lojaUnidades');
  }
  //Franquias
  function adicionarFranquia() {
    router.push({
      pathname: "/franquiaCadastroBasico",
      params: {
        navigateParmLoja: null, naviateParmOnlyConsulta: false
      }
    })
  }
  function listarFranquias() {
    router.push('/franquiasUnidades');
  }

  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>

        <View style={styles.containerHeader}>
          <Text style={styleApp.textTitulo}>
            Espaço empreendedor
          </Text>
          {ModalSimples(flagShowModal, handleShowModal, "Informações atualizadas!", "TipoMsg", "Título", processing)}
        </View>

        <View style={styles.containerBasics}>
          <View style={{ flexShrink: 1 }}>
            <TouchableOpacity style={styleApp.buttonFlatV} disabled={!isEditavel} onPress={vazia} >
              <MaterialIcons name="help-outline" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
              <Text style={styleApp.textButtonFlat}>Ajuda</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexShrink: 1 }}>
            <TouchableOpacity style={styleApp.buttonFlatV} disabled={!isEditavel} onPress={vazia} >
              <MaterialIcons name="payment" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
              <Text style={styleApp.textButtonFlat}>Pagamentos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerOthers}>
          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={adicionarLoja} >
            <MaterialIcons name="add-business" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Cadastrar uma loja que possuo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={listarLojas} >
            <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Gerenciar minhas lojas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={adicionarFranquia} >
            <MaterialIcons name="business" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textRegular} />
            <Text style={styleApp.textButtonFlat}>Cadastrar uma franquia </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={listarFranquias} >
            <MaterialIcons name="business-center" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Gerenciar minhas franquias</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}