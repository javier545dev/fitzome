import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text, Dimensions, Linking} from 'react-native';

import { helvetica, colors } from '../styles';

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

export default ({ visible, showModal, }) => {
     
    return(
        <Modal 
            isVisible= { visible }
            swipeDirection={['down']}
            coverScreen= { true }
            backdropOpacity= {0}
            onBackdropPress={showModal}
            onBackButtonPress={showModal}
            onSwipeComplete={showModal}
            hideModalContentWhileAnimating={true}
            style={styles.modal}
        >
            <View style={styles.grabBotton}>
                <TouchableOpacity onPress={showModal}>
                    <View style={styles.topBotton}>
                        <Icon name={'close-circle-outline'} size={35} color='black' />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['rgba(250,250,250,0)', 'rgba(250,250,250,.6)', 'rgba(250,250,250,1)']} style={styles.gradient}/>
                <Image
                        source={require('../../resources/media/images/5-stars.jpg')}
                        style={styles.image}
                />
                <Text style={styles.header}>Entrena en donde sea, Cuando sea</Text>
                <Text style={styles.text}>Fitzome es gratis, pero necesitamos de tu apoyo para mejorar. </Text>
                <View style={styles.itemGrap}>
                    <Icon name={'checkmark'} size={20} color={colors.primary} />
                    <Text style={styles.label}>Regálanos 5 estrellas para poder llegar a más personas.</Text>
                </View>
                <View style={styles.itemGrap}>
                    <Icon name={'checkmark'} size={20} color={colors.primary} />
                    <Text style={styles.label}>Manda la captura de pantalla a un asesor. </Text>
                </View>
                <View style={styles.itemGrap}>
                    <Icon name={'checkmark'} size={20} color={colors.primary} />
                    <Text style={styles.label}>El asesor activará tus planes. </Text>
                </View>
                <View style={styles.itemGrap}>
                    <Icon name={'checkmark'} size={20} color={colors.primary} />
                    <Text style={styles.label}>Y listo, accede a todos nuestros planes de entrenamiento sin costo.</Text>
                </View>
                <TouchableOpacity onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.app_fitzome')}>
                    <View style={styles.button}>
                        <Text style={styles.label_btn}>Evaluar app</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> Linking.openURL('https://api.whatsapp.com/send?phone=523328151666')}>
                    <View style={[styles.button, { backgroundColor:'white', marginTop:10, height:30, }]}>
                        <Text style={[styles.label_btn, { color:'black', }]}>Contactar un asesor</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'flex-end',
         margin:0, 
    },
    label_btn:{
        fontFamily: helvetica.bold,
        fontSize:16,
        color:'white',
    },
    button:{
        height:40,
        borderRadius:30,
        justifyContent:'center',
        backgroundColor:'black',
        alignItems:'center',
        marginTop:30, 
        width: width-40,
        marginLeft:20, 
    },
    gradient:{
        width, 
        height: height*.25,
        position:'absolute',
        top:0,
        left:0,
        zIndex:1,
    },
    label:{
        fontSize:18,
        fontFamily: helvetica.regular,
        paddingLeft:10, 
        width: width-80,
    },
    itemGrap:{
        padding:20,
        paddingBottom:10,
        paddingTop:0,
        flexDirection:'row',
        alignItems:'center',
    },
    header:{
        fontSize:28,
        padding:20, 
        lineHeight: 28,
        fontFamily: helvetica.bold,
    },
    text:{
        fontSize:18,
        padding:20, 
        fontFamily: helvetica.regular,
        paddingTop:0,
    },
    image:{
        width,
        height: height * .25, 
    },
    scrollview:{
        backgroundColor:'white',
    },
    grabBotton:{
        position: 'absolute', 
        right:10, 
        top:10, 
        zIndex:10, 
    },
    topBotton:{ 
        width:40,
        height:40, 
        borderRadius:40, 
        justifyContent:'center', 
        alignItems:'center',
    },
});