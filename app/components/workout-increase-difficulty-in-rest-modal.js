import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Image, Text, } from 'react-native';

import { helvetica, colors } from '../styles';
import WorkoutContext from '../../android/screens/Workout/context/';
import Modal from "react-native-modal";

export default ({ visible, showModal, round}) => {

    const { dispatch } = useContext(WorkoutContext);

    function onPress(value){
        dispatch({ type: 'update_rest', value});
        showModal();
    }
     
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
                <Text style={[styles.bigLabel, { marginBottom: 20, }]}>{`Ronda ${round} completa`}</Text>
                <Text style={styles.smallLabel}>¿Cómo te sientes? </Text>
                <Pressable onPress={()=> onPress(30)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                    <View style={styles.btn}>
                        <Text style={styles.btnLabel}>Bien</Text>
                        
                    </View>
                </Pressable>
                <Pressable onPress={()=> onPress(60)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                    <View style={styles.btn}>
                        <Text style={styles.btnLabel}>Cansado</Text>
                    </View>
                </Pressable>
                <Pressable onPress={()=> onPress(90)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                    <View style={styles.btn}>
                        <Text style={styles.btnLabel}>Muy cansado</Text>
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
        fontFamily: helvetica.bold,
        fontSize: 18,
        color:'black',
        lineHeight:18,
        paddingBottom:8, 
    },
    logo:{
        width: 584 * .2, 
        height: 126 * .2,
    },
    btnGrap:{
        marginBottom:10,
    },
    ballActive:{
        width: 5,
        height: 5,
        borderRadius: 5,
        marginLeft:2,
        backgroundColor:'black',
    },
    ball:{
        width:5, 
        height:5, 
        backgroundColor:'rgba(0,0,0,.2)', 
        marginLeft:2,
        borderRadius:5,
    },
    btn:{
        padding:10,
        paddingBottom:20,
        paddingTop:20,
        borderColor:'black',
        borderWidth:1,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    btnLabel:{
        fontFamily: helvetica.bold,
        fontSize: 16,
        lineHeight: 16,
    },
    message:{
        fontSize:16,
        color:'black',
        lineHeight:16,
        fontFamily: helvetica.regular,
        paddingTop:20,
        paddingBottom:20,
        color:'rgba(0,0,0,.7)',
    },
    bigLabel:{
        fontSize: 24,
        color:'black',
        lineHeight:24,
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