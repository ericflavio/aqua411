import { myStyleColor } from '../styles/stylesColors';
import { myStyleApp } from '../styles/styleApp';
import { View, Text, StyleSheet } from "react-native";
import { NewErrorMessage } from '../errors/errorMessage';
import { Picker } from '@react-native-picker/picker';

export default function LojaHandleStatus(statusList, currentStatus, selectedStatus, onSelectNewStatus) {
  var msg = "LojaHandleStatus...";
  var hasStatus = false;
  var arrayPicker = [];

  if (statusList === undefined || statusList === null || Object.keys(statusList).length === 0) {
    error = NewErrorMessage("lj002");
    msg = error.message;
  } else {
    //Monta a lista de Status que podem ser assumidos a partir do status atual
    for (var i = 0; i < statusList.length; i++) {
      if (statusList[i].id.toUpperCase() === currentStatus) {
        arrayPicker = statusList[i].dfs
        hasStatus = true;
        break;
      }
    }
  }

  console.log("hasSTatus: ", hasStatus, " arrayPicker: ", arrayPicker);

  return (
    <View style={styles.containerPicker}>
      {hasStatus && Object.keys(arrayPicker).length > 0 ?
        <Picker
          selectedValue={selectedStatus}
          onValueChange={(itemValue, itemIndex) =>
            onSelectNewStatus(itemValue)
          }>
          {/*<Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
          {arrayPicker.map((item, index) => {
            return (< Picker.Item label={item} value={item} key={index} />);
          })}
        </Picker>
        :
        <Text style={myStyleApp.textoRegular}>
          "Nenhum novo Status está disponível"
        </Text>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  containerPicker: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 25
  },
});