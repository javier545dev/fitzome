import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';

import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  id: string;
}

export default function copyIdToClipboard({ id }: Props) {
  const copyToClipboard = () => {
    Clipboard.setString(`fitzome id: ${id}`);
    Common.showToast(`Id copiado exitosamente`);
  };

  return (
    <View style={styles.grap}>
      <Text style={styles.id}>{`fitzome id: ${id}`}</Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <View style={styles.iconGrap}>
          <Text style={styles.label}>Copiar</Text>
          <Icon name={'copy-outline'} size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  id: {
    fontFamily: roboto.regular,
    fontSize: 16,
  },
  iconGrap: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
