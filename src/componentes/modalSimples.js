import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { styleApp } from '../styles/styleApp';

export default function modalSimples(flagShow, onClose, msg, msgTitulo, msgTipo) {
  if (flagShow === undefined) {
    flagShow = true
  };
  if (msgTitulo === undefined || msgTitulo === null) { //Obrigatório (com default)
    msgTitulo = "Concluído!"
  };
  if (msg === undefined || msg === null) { //Não obrigatório.
    msg = ""
  };
  if (msgTipo === undefined || msgTipo === null) {
    msgTipo = "Sucesso"
  };

  var borderModal = styleApp.color.cinzaMedio;
  switch (msgTipo) {
    case "Sucesso": borderModal = styleApp.color.sucesso; break;
    case "Alerta": borderModal = styleApp.color.alerta; break;
    case "Aviso": borderModal = styleApp.color.aviso; break;
    case "Erro": borderModal = styleApp.color.erro; break;
    default: borderModal = styleApp.color.sucesso; break;
  };
  console.log("cor ", borderModal, styleApp.color.aviso);

  return (
    <View style={stylesLocal.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={flagShow}
        onRequestClose={() => { }}>
        <View style={stylesLocal.centeredView}>
          <View style={[stylesLocal.modalView, { borderColor: borderModal }]}>
            <Text style={[styleApp.textSubtitulo, {color:borderModal }]}>{msgTitulo}</Text>
            {msg !== "" ? <Text style={styleApp.textRegular}>{msg}</Text> : <></>}
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={false} onPress={onClose} >
                <MaterialIcons name="close" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    minHeight: 160,
    minWidth: 200,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  }
});
