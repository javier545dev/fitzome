import * as React from 'react';
import {View, StyleSheet, Text, Linking, TouchableOpacity} from 'react-native';

import {roboto} from 'styles';
import * as Common from 'common';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  label?: string;
  text?: string;
}

export default function ContactAsesor({
  label = 'Necesitas ayuda?',
  text = 'Habla con un asesor en Whatsapp',
}: Props) {
  function openWhatsapp() {
    Linking.openURL(`https://api.whatsapp.com/send?phone=523328151666`);
  }

  return (
    <View style={styles.mainGrap}>
      <Text style={styles.actLabel}>{label}</Text>
      <TouchableOpacity onPress={openWhatsapp}>
        <View style={styles.btnGrap}>
          <Icon name={'logo-whatsapp'} size={20} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    marginTop: 40,
  },
  actLabel: {
    fontSize: 16,
    fontFamily: roboto.medium,
    color: 'black',
  },
  text: {
    fontSize: 16,
    fontFamily: roboto.regular,
    marginLeft: 10,
    width: Common.width - 120,
  },
  btnGrap: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
