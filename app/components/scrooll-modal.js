import React from 'react';
import { View, StyleSheet,  Pressable, Image, Text, } from 'react-native';

import { helvetica, colors } from '../styles';

import Modal from "react-native-modal";

export default ({ visible, showModal, }) => {
     
    return(
        <Modal 
            isVisible= { visible }
            swipeDirection={['down']}
            coverScreen= { false }
            backdropOpacity= {.2}
            hideModalContentWhileAnimating={true}
            style={styles.modal}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
            </View>
            <View  style={styles.scrollView}>
                <Text style={[styles.bigLabel, { marginBottom: 20, }]}>{`Actualizamos tu entrenamiento!`}</Text>
                
                <Text style={{...styles.smallLabel, marginBottom:20, }}>Incrementamos la intesidad un poco desde tu última sesión, cuentanos como te va!</Text>
                <Pressable onPress={()=> showModal()} android_ripple={{color: 'white'}}>
                    <View style={styles.btn}>
                        <Text style={styles.btnLabel}>Ok</Text>
                    </View>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor:'rgba(0,0,0,0)',
    },
    smallLabel:{
        fontFamily: helvetica.regular,
        fontSize: 18,
        color:'rgba(0,0,0,.6)',
        lineHeight:18,
        paddingBottom:8, 
    },
    btn:{
        backgroundColor: 'black',  
        borderRadius:30,
        height:60, 
        alignItems:'center', 
        justifyContent:'center',
    },
    btnLabel:{
        color:'white', 
        fontSize:18, 
        fontFamily: helvetica.bold,
    },
    logo:{
        width: 584 * .2, 
        height: 126 * .2,
    },
    message:{
        fontSize:16,
        color:'black',
        lineHeight:16,
        fontFamily: helvetica.regular,
        paddingTop:20,
        paddingBottom:20,
        color:'rgba(0,0,0,.6)',
    },
    bigLabel:{
        fontSize: 26,
        color:'black',
        lineHeight:26,
        fontFamily: helvetica.bold,
    },
    scrollView:{
        backgroundColor:'white',
        padding:20,
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
});