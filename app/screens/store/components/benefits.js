import React from 'react';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';

import { roboto, colors, } from '../../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default () => (
    <View style={{ padding:20, }}>
        <View style={styles.itemGrap}>
            <Icon name={'checkmark-sharp'} size={30} color={'white'}/>
            <Text style={styles.itemLabel}>Asesoría por un entrenador vía WhatsApp.</Text>
        </View>
        <View style={styles.itemGrap}>
            <Icon name={'checkmark-sharp'} size={30} color={'white'}/>
            <Text style={styles.itemLabel}>
            Plan de entrenamiento personalizado de acuerdo a tus objetivos.
            </Text>
        </View>
        <View style={styles.itemGrap}>
            <Icon name={'checkmark-sharp'} size={30} color={'white'}/>
            <Text style={styles.itemLabel}>
            Acceso a tu entrenamiento en la app 24/7.
            </Text>
        </View>
        <View style={styles.itemGrap}>
            <Icon name={'checkmark-sharp'} size={30} color={'white'}/>
            <Text style={styles.itemLabel}>
            Modificaciones a tu plan y asesoría continua durante la duración de tu plan de entrenamiento.
            </Text>
        </View>
  </View>
 );

 const styles = StyleSheet.create({
   itemGrap:{
        flexDirection:'row', 
        paddingTop:10, 
        alignItems:'center', 
   },
    itemLabel:{
        paddingLeft:8, 
        fontSize:18, 
        fontFamily: roboto.regular, 
        width: width-80,
        color:'white',
        textAlign:'left'
    }
  });