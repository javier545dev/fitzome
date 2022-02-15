import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

import { roboto, colors } from '../../../../styles';

export default ({ token }) => {

    const label = token.tokenId ? `${token.card.brand} ..${token.card.last4}`
                  : 'Tarjeta de débito/crédito';

    return(
        <View style={styles.paymentGrap}>
            <View style={{...styles.circle, backgroundColor: token.tokenId ? colors.primary_blue : 'white' }}/>
            <Image 
                source={require('../../../../../resources/media/payments_methods/visa_american_mastercard.png')}
                style={styles.cardImage}
            />
            <Text style={styles.paymentLabel}>{`${ label }`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardImage:{
        width: 2489*.04,
        height: 585*.04,
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