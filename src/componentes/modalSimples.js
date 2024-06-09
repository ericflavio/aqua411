import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { styleApp } from '../styles/styleApp';
import { GradienteFill } from '../componentes/gradienteFill';

export default function modalSimples(flagShowModal, onClose, msg, msgTipo, msgTitulo,) {
  if (flagShowModal === undefined) {
    flagShowModal = true
  };
  if (msg === undefined || msg === null || msg === "") {
    msg = "Concluído ok!"
  };
  if (msgTipo === undefined || msgTipo === null || msgTipo === "") {
    msgTipo = "Sucesso"
  };
  if (msgTitulo === undefined || msgTitulo === null || msgTitulo === "Título") {
    msgTitulo = ""
  };

  var borderModal = styleApp.color.cinzaMedio;
  switch (msgTipo) {
    case "Sucesso": borderModal = styleApp.color.sucesso; break;
    case "Alerta": borderModal = styleApp.color.alerta; break;
    case "Aviso": borderModal = styleApp.color.aviso; break;
    case "Erro": borderModal = styleApp.color.erro; break;
    default: borderModal = styleApp.color.sucesso; break;
  };

  return (
    <View style={stylesLocal.centeredView}>
      <Modal
        animationType="slide" //fade slide none
        transparent={true}
        visible={flagShowModal}
        onRequestClose={() => { }}>
        <View style={stylesLocal.centeredView}>
          <View style={[stylesLocal.modalView, { borderColor: borderModal }]}>
            <Text style={[styleApp.textSubtitulo, { color: borderModal }]}>{msgTitulo}</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    margin: 0,
    minHeight: 240,
    minWidth: "92%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 3,
    borderColor: "grey",
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  modalView2: {
    margin: 20,
    minHeight: 160,
    minWidth: 200,
    borderWidth: 2,
    borderBottomWidth: 12,
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
