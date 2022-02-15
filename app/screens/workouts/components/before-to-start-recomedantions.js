import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { helvetica } from '../../../styles';

export default () => (
    <>
        <Text style={[styles.text,{paddingBottom:5}]}>
        - Asegúrate de haber calentado apropiadamente.
        </Text>
        <Text style={[styles.text,{paddingBottom:5}]}>
        - No comas demasiado. 
        </Text>
        <Text style={[styles.text,{paddingBottom:5}]}>
        - Mantente siempre hidratado. 
        </Text>
    </>
);

const styles = StyleSheet.create({
    text:{
      color:'black',
      fontSize:16, 
      fontFamily: helvetica.regular,
      textAlign: 'left',
    },
  });