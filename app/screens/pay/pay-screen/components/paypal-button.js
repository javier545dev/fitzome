import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

import { roboto, } from '../../../../styles';

export default () => {

    return(
        <View style={styles.paymentGrap}>
            <View style={styles.circle}/>
            <Image 
            source={require('../../../../../resources/media/payments_methods/paypal.png')}
            style={styles.paypalImage}
            />
            <Text style={styles.paymentLabel}>Paypal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    paypalImage:{
        width: 3840*.024,
        height: 2160*.024,
    },
    paymentGrap:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20, 
      },
      circle:{
        height:15,
        width:15,
        borderWidth:1,
        borderColor: 'rgba(0,0,0,.3)', 
        borderRadius:15,
        marginRight:10, 
      },
      paymentLabel:{
        paddingLeft:10,
        fontSize:15,
        fontFamily: roboto.regular, 
        color:'rgba(0,0,0,.7)',
      },
  });