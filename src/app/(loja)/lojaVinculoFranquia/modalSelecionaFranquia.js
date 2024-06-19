import React, { useState } from 'react';
import { FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { schemaFranquiaDadosLista } from '../../../schemas/franquiaSchema';
import { consultaListaFranquias } from '../../../services/franquiaService';
import { styleApp } from '../../../styles/styleApp';
import { InputText } from '../../../componentes/inputText';

export function ModalSelecionaFranquia() {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState([
    {
      idFranquia: '001',
      nome: 'AquaMagic',
      frasePrincipal: 'Sua lavanderia fora de casa',
      fraseSecundaria: 'Lavanderia serlf-service',
      uriLogotipo: 'https://imagem/logo/aquamagic',
    }
    ,
    {
      idFranquia: '002',
      nome: '60 Minutos',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '003',
      nome: 'Lavô',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '004',
      nome: 'Boble Box',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '005',
      nome: 'Laundromat',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '006',
      nome: 'Lavanderia da MAria',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '007',
      nome: 'Tia lavadeira',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '008',
      nome: 'Lavateria',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '009',
      nome: 'Super limpo',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '010',
      nome: 'Novinho',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '011',
      nome: 'Branco de novo',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '012',
      nome: 'Agua sanitaria',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '013',
      nome: 'Lava-lava',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    },
    {
      idFranquia: '014',
      nome: 'Exsujo',
      frasePrincipal: 'Lava e seca rápido',
      fraseSecundaria: 'Lavanderia inteligente',
      uriLogotipo: 'https://imagem/logo/60minutos',
    }
  ]);

  const filteredData = data.filter(item => {
    // substitua 'property' pela propriedade que você deseja filtrar
    //return item.property.toLowerCase().includes(filter.toLowerCase());
    return item.nome.toLowerCase().includes(filter.toLowerCase());
  });

  //Componente visual de cada Unidade (card)
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} >
      <View style={{
        padding: 4,
        borderWidth: 0,
        borderColor: "white",
        borderRadius: styleApp.size.containerBorderRadius,
        marginBottom: 0,
        minHeight: 40,
        width: '90%',
        backgroundColor: "white",
      }}>
        <Text style={styleApp.textSubtitulo}>{item.nome}</Text>
      </View >
    </TouchableOpacity>
  )
  //Renderização do componente acima
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => handleItem(item)}
      />
    );
  };

  function onChangeFilter(text) {
    setFilter(text)
  }

  return (
    <View style={{ marginTop: 8, marginBottom: 40 }}>
      <View style={{ marginBottom: 8 }}>
        {InputText("Digite para filtrar...", onChangeFilter, "", 1, 8, "default", isEditavel, filter, false)}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.idFranquia}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
      />
    </View>
  );
};
// renderItem={({ item }) => <Text>{item.nome}</Text>}
