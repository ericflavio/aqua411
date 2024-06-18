import { Modal, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { styleApp } from '../styles/styleApp';

export default function ModalSimples(flagShowModal, onClose, msg, msgTipo, msgTitulo, processing) {
  if (!processing) {
    processing = { isLoading: false, isExecuting: false }
  }
  if (flagShowModal === undefined) {
    flagShowModal = true
  };
  if (processing.isLoading || processing.isExecuting) {
    flagShowModal = true
    motion = "fade"
  } else {
    motion = "slide"
  }
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
        animationType={motion} //fade slide none
        transparent={true}
        visible={flagShowModal}
        onRequestClose={() => { }}>
        {processing.isLoading || processing.isExecuting ?
          <View style={stylesLocal.centeredView}>
            <View style={[stylesLocal.modalViewProcessing, { borderColor: borderModal }]}>
              <ActivityIndicator size={"large"} color={styleApp.color.activityIndicatorCollor} />
            </View>
          </View>
          :
          <View style={stylesLocal.bottomView}>

            <View style={[stylesLocal.modalView, { borderColor: borderModal }]}>

              <View style={{ marginBottom: 16, alignSelf: "flex-end" }}>
                <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={false} onPress={onClose} >
                  <MaterialIcons name="close" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
                </TouchableOpacity>
              </View>

              {msgTitulo !== "" ? <Text style={styleApp.textRegular}>{msg}</Text> : <></>}
              <Text style={styleApp.textSubtitulo}>{msg}</Text>

            </View>
          </View>
        }
      </Modal>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
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
    paddingTop: 0,
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
  modalViewProcessing: {
    margin: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
});
