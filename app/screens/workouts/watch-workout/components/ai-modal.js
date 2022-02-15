import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, } from 'react-native';

import { roboto, colors } from '../../../../styles/';

import Modal from "react-native-modal";

export default ({ message, show, visible, smallMessage, btnLabel, }) => {

    return(
        <Modal 
            isVisible= { visible }
            backdropOpacity= {.2}
            onBackButtonPress={()=> show()}
            onBackdropPress={()=> show()}
            onSwipeComplete={()=> show()}
            swipeDirection={'down'}
            style={styles.modal}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../../../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
            </View>
            <View  style={styles.scrollView}>
                <Text style={styles.bigLabel}>{ 'Hey,'}</Text>
                <Text style={styles.messageLabel}>{ message }</Text>
                {
                    smallMessage != '' ?
                    <Text style={styles.smallMessageLabel}>{ smallMessage }</Text>    
                    : null
                }
                <TouchableOpacity onPress={()=> show()}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>{btnLabel}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
       justifyContent: 'flex-end',
       margin: 0, 
    },
    header:{
        padding:20,
        backgroundColor: 'white',
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    logo:{
        width: 584 * .2, 
        height: 126 * .2,
    },
    scrollView:{
        backgroundColor:'white',
        padding:20,
    },
    bigLabel:{
        fontSize: 24,
        color:'black',
        lineHeight:26,
        fontFamily: roboto.medium, 
        marginBottom:10, 
    },
    messageLabel:{
        fontSize: 20,
        color:'black',
        fontFamily: roboto.regular, 
        marginBottom:30, 
    },
    smallMessageLabel:{
        fontSize: 16,
        color: 'rgba(0,0,0,.7)',
        fontFamily: roboto.regular, 
        paddingBottom:30,  
    },
    btnGrap:{
        backgroundColor: colors.primary_blue,
        padding:20, 
        borderRadius:8, 
        marginBottom:10, 
        alignItems:'center',
        justifyContent:'center',
    },
    btnLabel:{
        fontSize:16,
        fontFamily: roboto.medium, 
        color:'white',
    },
});