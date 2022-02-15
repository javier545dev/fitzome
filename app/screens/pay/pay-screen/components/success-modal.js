import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Linking, } from 'react-native';

import { roboto, colors } from '../../../../styles/';

import Modal from "react-native-modal";

export default ({ show, visible, info, user, }) => {

    const userName = user.name.split(' ')[0];
    const recipeNuber = info.id ? info.id : '2525';
    const recipeUrl = info.receipt.url ? info.receipt.url : 'https://pay.stripe.com/receipts/acct_1GvQvRGBPceZjnHd/ch_1IwWtlGBPceZjnHd2n69o6QP/rcpt_JZgGT200s9T0iCeGJFwzcp8WBVo16zB';

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
                <View style={{backgroundColor:'#48ae64', padding:20, alignItems:'center', paddingVertical:40,
                justifyContent:'center', }}>
                    <Text style={styles.bigLabel}>{'Tu pago se realizo con éxito'}</Text>
                    <TouchableOpacity onPress={()=> Linking.openURL(`${recipeUrl}`)}>
                        <View style={styles.btnRecipeGrap}>
                            <Text style={styles.btnRecipeLabel}>{'Ver recibo'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{padding:20, }}>
                    <Text style={styles.messageLabel}>Ponte en contacto con un asesor para comenzar con tu entrenamiento.</Text>
                    <TouchableOpacity onPress={()=> Linking.openURL(`https://api.whatsapp.com/send?phone=523328151666&text=Hola,%20soy%20${userName}!%20Me%20gustaria%20comenzar%20mi%20plan%20de%20entrenamiento%20este%20es%20mi%20código%20${recipeNuber}`)}>
                        <View style={styles.btnGrap}>
                            <Text style={styles.btnLabel}>{'Contactar asesor'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    },
    bigLabel:{
        fontSize: 24,
        color:'white',
        lineHeight:26,
        fontFamily: roboto.medium, 
    },
    btnGrap:{
        backgroundColor: colors.primary_blue,
        padding:20, 
        borderRadius:8, 
        marginBottom:10, 
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
    },
    btnLabel:{
        fontSize:16,
        fontFamily: roboto.medium, 
        color:'white',
    },
    btnRecipeGrap:{
    },
    btnRecipeLabel:{
        fontSize:16,
        fontFamily: roboto.medium, 
        color:'white',
        textDecorationLine:'underline',
        paddingTop:10,
    },
    messageLabel:{
        fontSize: 20,
        color:'black',
        fontFamily: roboto.regular, 
        paddingTop:20,
        paddingBottom:40, 
    },
});