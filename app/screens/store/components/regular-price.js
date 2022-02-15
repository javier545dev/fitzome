import React from 'react';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';

import { roboto, colors, } from '../../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default ({ price, weeks}) => {

    const finalPrice = price.toFixed(2);
    const finalPricePerWeek = (finalPrice/weeks).toFixed(2);

    return (
    <View style={styles.grap}>
        <Text style={styles.label}>Plan de entrenamiento</Text>
        <View style={{ alignItems:'flex-end'}}>
            <View style={styles.priceGrap}>
                <Text style={styles.bigPrice}>{`$${finalPricePerWeek} MXN`}</Text>
                <Text style={styles.smallPrice}>{` /semana`}</Text>
            </View>
            <View style={styles.priceGrap}>
                <Text style={styles.bigPrice}>{`$${finalPrice} MXN`}</Text>
                <Text style={styles.smallPrice}>{` ${weeks}/semanas`}</Text>
            </View>
        </View>
    </View>
    )
};

 const styles = StyleSheet.create({
    grap:{
        backgroundColor:'#2a2a2a',
        paddingHorizontal:20,
        paddingVertical:10,
        marginLeft:20,
        width: width-40,
        borderRadius:8,
        marginBottom:20, 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    priceGrap:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
    },
    bigPrice:{
        fontSize:18,
        fontFamily: roboto.medium,
        color:'rgba(250,250,250,.7)',
    },
    smallPrice:{
        fontSize:14,
        fontFamily: roboto.regular,
        color:'rgba(250,250,250,.7)',
    },
    label:{
        fontSize:18, 
        fontFamily: roboto.medium, 
        color:'rgba(250,250,250,.7)',
        width: (width/2)-60,
    }
  });