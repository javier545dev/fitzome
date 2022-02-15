import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView,} from 'react-native';

import { roboto, colors } from '../../../../styles/';

import Modal from "react-native-modal";

const cardNumber = [4152, 3135, 5836, 2096];

export default ({ show, visible, price }) => {

    const priceFixed = price.toFixed(2);

    return(
        <Modal 
            isVisible= { visible }
            backdropOpacity= {.2}
            onBackButtonPress={()=> show()}
            onBackdropPress={()=> show()}
            //onSwipeComplete={()=> show()}
            //swipeDirection={'down'}
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
                        source={require('../../../../../resources/media/payments_methods/oxxopay.png')}
                        style={styles.cardImage}
                    />
                </View>
                <View>
                    <Text style={{paddingBottom:5, fontSize:15, fontFamily: roboto.regular, }}>{`Número de cuenta`}</Text>
                    <View style={styles.cardNumberGrap}>
                        <Text style={styles.cardNumberLabel}>{`${cardNumber[0]}`}</Text>
                        <Text style={styles.cardNumberLabel}>{`${cardNumber[1]}`}</Text>
                        <Text style={styles.cardNumberLabel}>{`${cardNumber[2]}`}</Text>
                        <Text style={styles.cardNumberLabel}>{`${cardNumber[3]}`}</Text>
                    </View>
                </View>
                <View style={{ marginBottom:40, }}>
                    <Text style={{ fontSize:18, fontFamily: roboto.medium, paddingBottom:20, }}>Instrucciones</Text>
                    <Text style={styles.intructionLabel}>{`1. Acude a la tienda OXXO más cercana.`}</Text>
                    <Text style={styles.intructionLabel}>{`2. Indica en caja que quieres realizar un depósito.`}</Text>
                    <Text style={styles.intructionLabel}>{`3. Dicta al cajero el número de cuenta ${cardNumber[0]} - ${cardNumber[1]} - ${cardNumber[2]} - ${cardNumber[3]} e indícale que es una cuenta BBVA o Bancomer.`}</Text>
                    <Text style={styles.intructionLabel}>{`4. Realiza el pago correspondiente de $${priceFixed} MXN con dinero en efectivo.`}</Text>
                    <Text style={styles.intructionLabel}>{`5. Al confirmar tu pago, el cajero te entregará un comprobante impreso. En el podrás verificar que la información sea correcta.`}</Text>
                    <Text style={styles.intructionLabel}>{`6. Conserva el comprobante, toma una fotografía y mándala a un asesor de Fitzome vía WhatsApp.`}</Text>
                    <Text style={styles.intructionLabel}>{`7. Listo, un entrenador te contactara para comenzar con tu plan de entrenamiento.`}</Text>
                </View>
                <TouchableOpacity onPress={()=> show()}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>{'Cerrar'}</Text>
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
        color: '#e40595',
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