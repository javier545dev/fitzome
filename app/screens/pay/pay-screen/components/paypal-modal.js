import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Linking, } from 'react-native';

import { roboto, colors } from '../../../../styles/';

import Modal from "react-native-modal";

export default ({ show, visible, price }) => {

    const priceFixed = price.toFixed(2);

    return(
        <Modal 
            isVisible= { visible }
            backdropOpacity= {0}
            onBackButtonPress={()=> show()}
            onBackdropPress={()=> show()}
            swipeDirection={['down',]}
            onSwipeComplete={()=> show()}
            style={styles.modal}
            propagateSwipe={true}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
            <View style={styles.header}>
                <Image
                    source={require('../../../../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
            </View>
            <View  style={styles.scrollView}>
                <Text style={styles.bigLabel}>{'Tu pedido fue realizado de manera exitosa'}</Text>
                <View style={{ marginBottom: 40, }}>
                    <View style={{ flexDirection:'row', alignItems:'center', }}>
                        <Text style={styles.price}>{`$${priceFixed}`}</Text>
                        <Text style={styles.priceCurrency}>{`MXN`}</Text>
                    </View>
                    <Image
                        source={require('../../../../../resources/media/payments_methods/paypal.png')}
                        style={styles.cardImage}
                    />
                </View>
                <View style={{ marginBottom:40, }}>
                    <Text style={{ fontSize:18, fontFamily: roboto.medium, paddingBottom:20, }}>Instrucciones</Text>
                    <Text style={styles.intructionLabel}>{`1. Presiona el botón pagar con PayPal.`}</Text>
                    <Text style={styles.intructionLabel}>{`2. Te redireccionaremos a PayPal.`}</Text>
                    <Text style={styles.intructionLabel}>{`3. Completa la información solicitada y realiza tu pago.`}</Text>
                    <Text style={styles.intructionLabel}>{`4. Al completar tu pago, PayPal te dará un comprobante de compra (quizás te lo envíen a tu correo electrónico).`}</Text>
                    <Text style={styles.intructionLabel}>{`5. Manda una captura de pantalla o fotografía de tu comprobante a un asesor de Fitzome vía WhatsApp.`}</Text>
                    <Text style={styles.intructionLabel}>{`6. Listo, un entrenador te contactara para comenzar con tu plan de entrenamiento.`}</Text>
                </View>
                <TouchableOpacity onPress={()=> Linking.openURL('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RQ8HPXC5WKHD2')}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>{'Pagar con Paypal'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
      justifyContent: 'flex-end',
       margin: 0, 
    },
    scrollableModal: {
        height: 300,
      },
    header:{
        padding:20,
        backgroundColor: 'white',
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
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
        marginBottom:40, 
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
        marginBottom:40,
    },
    btnLabel:{
        fontSize:16,
        fontFamily: roboto.medium, 
        color:'white',
    },
    price:{
        fontSize: 28,
        color: '#0070ba',
        lineHeight:28,
        fontFamily: roboto.medium, 
    },
    priceCurrency:{
        fontSize:16, 
        fontFamily: roboto.regular,
        color: 'rgba(0,0,0,.5)',
        paddingLeft:10, 
    },
    cardImage:{
        width: 364*.2,
        height: 118*.2,
    },  
    cardNumberGrap:{
        backgroundColor:'#f4f4f4', 
        borderRadius:4, 
        flexDirection:'row',
        padding:15, 
        justifyContent:'space-between',
        marginBottom: 30,
    },
    cardNumberLabel:{
        fontSize: 26,
        color: 'black',
        lineHeight:26,
        fontFamily: roboto.medium, 
    },
    intructionLabel:{
        fontSize: 16,
        color: 'black',
        fontFamily: roboto.regular, 
        paddingBottom:10, 
    },
});