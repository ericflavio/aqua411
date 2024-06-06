import { styleColor } from '../styles/styleColors';
import { styleApp } from '../styles/styleApp';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { NewErrorMessage } from '../errors/errorMessage';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from "@expo/vector-icons";

export default function LojaHandleStatus(statusListToChange, statusList, currentStatus, selectedStatus, onSelectNewStatus) {
  var msg = "Pesquisando status...";
  var showModal = false;

  if (statusListToChange === undefined || statusListToChange === null || Object.keys(statusListToChange).length === 0) {
    error = NewErrorMessage("lj002");
    msg = error.message;
  }

  return (
    <View style={styleLocal.containerPicker}>
      {statusListToChange !== null && Object.keys(statusListToChange).length > 0 ?
        <Picker
          selectedValue={selectedStatus}
          onValueChange={(itemValue, itemIndex) =>
            onSelectNewStatus(itemValue)
          }>

          {/*<Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
          <Picker.Item label="Selecione um status" value="vazio" />
          {statusListToChange.map((item, index) => {
            return (< Picker.Item label={item} value={item} key={index} />);
          })}
        </Picker>
        :
        <Text style={styleApp.textRegular}>
          {msg}
        </Text>
      }
    </View >
  )
}

const styleLocal = StyleSheet.create({
  containerPicker: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: styleColor.tema10A,
    borderRadius: 4
  },
});