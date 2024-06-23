import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styleApp } from '../../../styles/styleApp';

export function ModalEditarMaquinario(handleSelectedFranquia) {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState(null);

  return (
    <View style={{ marginTop: 8, marginBottom: 20}}>
      <View style={{ marginBottom: 8 }}>
        <Text>TEXTO</Text>
      </View>
    </View>
  );
};
