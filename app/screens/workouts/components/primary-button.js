import React from 'react';
import { View, Pressable, Text, Dimensions, StyleSheet } from 'react-native';

import { roboto, colors } from '../../../../app/styles/';

import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default ({ label, action }) => {
     
    return(
        <LinearGradient 
            colors={['rgba(250,250,250,0)','rgba(250,250,250,1)', 'white']}
            style={styles.gradientGrap}
        >
            <Pressable onPress={() => action()}>
              <View style={styles.btnGrap}>
                  <Text style={styles.btnLabel}>
                    { label } 
                  </Text>
              </View>
            </Pressable>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    btnGrap:{
        backgroundColor: colors.primary_blue,  
        borderRadius:50,
        height:60, 
        alignItems:'center', 
        justifyContent:'center', 
        width: width-40,
    },
    btnLabel:{
        fontSize:18,
        lineHeight:18,
        color:'white',
        fontFamily: roboto.bold, 
    },
    gradientGrap:{
        position:'absolute', 
        bottom:0, 
        left:0, 
        width, 
        height:70, 
        alignItems:'center',
        paddingBottom:10, 
    },
});