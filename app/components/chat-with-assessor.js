import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, Linking, Image, } from 'react-native';

import { helvetica } from '../styles/';

import Icon from 'react-native-vector-icons/Ionicons';

export default () => {

    return(
    <View style={styles.container}>
        {/* <Image
            style={{width:30, height:30, marginBottom:30, }}
            source={require('../../resources/media/branding/circle-black.png')}
        /> */}
        <Text style={styles.label}>
            ¿Tienes problemas?
        </Text> 
        <TouchableNativeFeedback onPress={()=> Linking.openURL('https://wa.me/5213322448662')}>
            <View style={styles.button}>
                <Icon name={"ios-logo-whatsapp"} size={18} color="white" />
                <Text style={{color:'white', fontSize:15, marginLeft:10,  }}>
                Habla con un asesor
                </Text>
            </View>
        </TouchableNativeFeedback> 
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:20, 
        paddingTop: 40,
        paddingBottom: 40,
        marginTop:20, 
        backgroundColor:'#f7f7f7',
    },
    button:{
        flexDirection:'row', 
        backgroundColor:'black',
        alignSelf:'flex-start', 
        padding:20, 
        paddingTop:15,
        paddingBottom:15,
        borderRadius:50, 
        marginTop:30, 
    },
    label:{
        fontSize:20,
        color:'black', 
        fontFamily: helvetica.bold,
        textAlign: 'left',
    },
});