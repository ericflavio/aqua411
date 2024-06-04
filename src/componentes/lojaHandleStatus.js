import React from 'react';
import { myStyleColor } from '../styles/stylesColors';
import { myStyleApp } from '../styles/styleApp';
import { TextInput, View, Text } from "react-native";
import { NewErrorMessage } from '../errors/errorMessage';

export default function LojaHandleStatus(statusList) {
  var msg = "Pesquisando...";
  var hasStatus = true;

  if (statusList === undefined || statusList === null || Object.keys(statusList).length === 0) {
    error = NewErrorMessage("lj002");
    msg = error.message;
    hasStatus = false;
  }

  return (
    <View>
      {hasStatus ?
        <Text>{msg}</Text >
        :
        <Text>{msg}</Text>
      }

    </View >
  )
}