import { myStyleColor } from '../styles/stylesColors';
import { myStyleApp } from '../styles/styleApp';
import { View, Text } from "react-native";
import { NewErrorMessage } from '../errors/errorMessage';
import { Picker } from '@react-native-picker/picker';

export default function LojaHandleStatus(statusList, selectedStatus, onSelectNewStatus) {
  var msg = "Pesquisando...";
  var hasStatus = true;

  if (statusList === undefined || statusList === null || Object.keys(statusList).length === 0) {
    error = NewErrorMessage("lj002");
    msg = error.message;
    hasStatus = false;
  }

  return (
    <View style={{ marginLeft: 12, marginRight: 12, marginBottom: 25 }}>
      {!hasStatus ?
        <Picker
          selectedValue={selectedStatus}
          onValueChange={(itemValue, itemIndex) =>
            onSelectNewStatus(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        :
        <Text style={myStyleApp.textoRegular}>
          {msg}
        </Text>
      }
    </View >
  )
}