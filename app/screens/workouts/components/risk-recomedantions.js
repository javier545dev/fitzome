import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { helvetica } from '../../../styles';

export default () => (
    <>
        <Text style={styles.label}>Esta rutina de entrenamiento no es para ti, si:</Text>
        <Text style={[styles.text,{paddingBottom:5}]}>
            - Tienes mas de 65 años de edad o estas embarazada.
        </Text>
        <Text style={[styles.text,{paddingBottom:5}]}>
             - Tienes diabetes, enfermedades cardiovasculares, pulmonares o metabólicas. 
        </Text>
        <Text style={[styles.text,{paddingBottom:5}]}>
            - Tienes alguna condición ortopédica o lesión que todavía no haya sanado.
        </Text>
        <Text style={[styles.text,{paddingBottom:10}]}>
            - Un médico te recomendó no realizar actividad física. 
        </Text>
        <Text style={styles.label}>Antes de comenzar:</Text>
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
    label:{
        fontSize:18,
        color:'black', 
        fontFamily: helvetica.bold,
        paddingBottom:10, 
    },
  });