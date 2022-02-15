import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, } from 'react-native';

import { roboto, colors } from '../../../../styles';
import { plansUrls } from '../../../../../resources/data/images';

const {  width } = Dimensions.get('window');

export default ({ weeks, name, price, user, }) => {

    const imageUrl = user.gender === 1 ? 'custom_plan_m' : 'custom_plan_w';

    return(
        <View style={styles.mainGrap}>
            <View style={{marginBottom:30, alignItems:'center',  }}>
                <Image
                    source={plansUrls[imageUrl]} 
                    style={styles.image}
                />
                <Text style={styles.weeks}>{`${weeks} semanas`}</Text>
            </View>
            <Text style={styles.name}>{`${name}`}</Text>
            <Text style={styles.price}>{`$${price.toFixed(2)} MXN`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        justifyContent:'center',
        alignItems:'center',
        padding:30, 
    },
    image:{
        width: width/2,
        height: width/2,
        backgroundColor:'red', 
        borderRadius:16, 
    },
    name:{
        fontSize:16,
        fontFamily: roboto.regular,
        color: 'rgba(0,0,0,.7)',
        marginBottom:10, 
    },  
    price:{
        fontSize:34,
        fontFamily: roboto.medium,
        color: 'black',
    },  
    weeks:{
        backgroundColor:'white',
        color:'black',
        fontSize:16,
        fontFamily: roboto.medium,
        position:'absolute',
        bottom:-8, 
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:25, 
        elevation:1,
    },
  });