import React from 'react';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';

import { roboto, colors, } from '../../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default ({ price, discount, weeks }) => {

    const finalPrice = (price * (discount/100)).toFixed(2);
    const finalPricePerWeek = (finalPrice/weeks).toFixed(2);

    return (
    <View style={styles.grap}>
        <View style={styles.discountGrap}>
            <Text style={styles.discountLabel}>{`-${discount}%`}</Text>
        </View>
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
        backgroundColor:'white',
        padding:20, 
        marginLeft:20,
        width: width-40,
        borderRadius:8,
        marginBottom:40, 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    discountGrap:{
        backgroundColor:'orange',
        position:'absolute',
        top:-5,
        right:-2,
        padding:2,
        borderRadius:2,
    },
    discountLabel:{
        fontSize:14,
        fontFamily: roboto.medium,
        color:'white',
    },
    priceGrap:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
    },
    bigPrice:{
        fontSize:18,
        fontFamily: roboto.medium,
    },
    smallPrice:{
        fontSize:14,
        fontFamily: roboto.regular,
    },
    label:{
        fontSize:18, 
        fontFamily: roboto.medium, 
        color:'black',
        width: (width/2)-60,
    }
  });