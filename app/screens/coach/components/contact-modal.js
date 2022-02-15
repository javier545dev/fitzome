import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Linking,
} from 'react-native';

import {roboto, colors} from '../../../styles';

import Modal from 'react-native-modal';

export default ({visible, type, hideModal}) => {
  const coachMessage =
    type === 'custom'
      ? 'Tienes preguntas sobre tu entrenamiento? Contacta tu coach.'
      : 'Tienes problemas o necesitas ayuda con la app?';

  const btnLabel =
    type === 'custom'
      ? 'Habla con tu coach en Whatsapp'
      : 'Habla con un asesor en Whatsapp';

  function action() {
    Linking.openURL(`https://api.whatsapp.com/send?phone=523328151666`);
  }

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.05}
      onBackButtonPress={() => hideModal()}
      onBackdropPress={() => hideModal()}
      onSwipeComplete={() => hideModal()}
      swipeDirection={'down'}
      style={styles.modal}>
      <View style={styles.header}>
        <Image
          source={require('../../../../resources/media/branding/fitzome.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.scrollView}>
        <Text style={styles.bigLabel}>{'Hey,'}</Text>
        <Text style={styles.messageLabel}>{coachMessage}</Text>
        {/* <Text style={styles.smallMessageLabel}>{ 'mallMessage' }</Text>     */}
        <TouchableOpacity onPress={() => action()}>
          <View style={styles.btnGrap}>
            <Text style={styles.btnLabel}>{btnLabel}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: colors.backgroundGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logo: {
    width: 584 * 0.2,
    height: 126 * 0.2,
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 20,
  },
  bigLabel: {
    fontSize: 24,
    color: 'black',
    lineHeight: 26,
    fontFamily: roboto.medium,
    marginBottom: 10,
  },
  messageLabel: {
    fontSize: 20,
    color: 'black',
    fontFamily: roboto.regular,
    marginBottom: 30,
  },
  smallMessageLabel: {
    fontSize: 16,
    color: 'rgba(0,0,0,.7)',
    fontFamily: roboto.regular,
    paddingBottom: 30,
  },
  btnGrap: {
    backgroundColor: colors.primary_blue,
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    fontSize: 16,
    fontFamily: roboto.medium,
    color: 'white',
  },
});
