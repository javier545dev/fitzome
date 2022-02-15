import React from 'react';
import { View, StyleSheet,  Pressable, Text, ScrollView } from 'react-native';

import { helvetica, } from '../styles';

import Modal from "react-native-modal";

export default ({ visible, showModal, }) => {
     
    return(
        <Modal 
            isVisible= { visible }
            swipeDirection={['down']}
            coverScreen= { false }
            backdropOpacity= {.2}
            onBackdropPress={showModal}
            onBackButtonPress={showModal}
            onSwipeComplete={showModal}
            hideModalContentWhileAnimating={true}
            style={styles.modal}
        >
            <View style={styles.header}>
               <View style={styles.lineHeader}/>
            </View>

            <View style={styles.scrollView}>
                <Text style={styles.label}>{`Antes de comenzar:`}</Text>
                <Text style={styles.smallLabel}>
                1.- Asegúrate de haber calentado apropiadamente.
                </Text>
                <Text style={styles.smallLabel}>
                2.- No comas demasiado. 
                </Text>
                <Text style={styles.smallLabel}>
                3.- Mantente siempre hidratado. 
                </Text>
                <Text style={{...styles.label, paddingTop:15, }}>{`Esta rutina de entrenamiento no es para ti, si:`}</Text>
                <Text style={styles.smallLabel}>
                1.- Tienes mas de 65 años de edad o estas embarazada.
                </Text>
                <Text style={styles.smallLabel}>
                2.- Tienes diabetes, enfermedades cardiovasculares, pulmonares o metabólicas. 
                </Text>
                <Text style={styles.smallLabel}>
                3.- Tienes alguna condición ortopédica o lesión que todavía no haya sanado.
                </Text>
                <Text style={{...styles.smallLabel, paddingBottom: 20}}>
                4.- Un médico te recomendó no realizar actividad física. 
                </Text>
                <Pressable onPress={()=> showModal()} android_ripple={{color: 'white'}}>
                    <View style={styles.btn}>
                        <Text style={styles.btnLabel}>Cerrar</Text>
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
    scrollView:{
        backgroundColor:'white',
        padding:20,
    },
    header:{
        padding:20,
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    lineHeader:{
        width:50,
        height:5, 
        backgroundColor:'#c3c3c3',
        borderRadius:20, 
    },
    label:{
        fontSize:18,
        lineHeight: 18, 
        color:'black', 
        paddingBottom:20, 
        fontFamily: helvetica.bold,
    },
    smallLabel:{
        fontSize:16,
        color:'black', 
        fontFamily: helvetica.regular,
        paddingBottom:5, 
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
});