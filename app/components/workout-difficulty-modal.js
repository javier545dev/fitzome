import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Text, } from 'react-native';

import { helvetica, colors } from '../styles';

import WorkoutContext from '../../android/screens/Workout/context/';

import Modal from "react-native-modal";

export default ({ visible, showModal, }) => {

    const { state, dispatch } = useContext(WorkoutContext);
    const name = state.user.name.split(' ')[0];
   /* const easy = [1,0,0,0,0];
    const veryEasy = [1,1,0,0,0];
    const ok = [1,1,1,0,0];
    const hard = [1,1,1,1,0];
    const veryHard = [1,1,1,1,1];*/

    function onPress(value){
        dispatch({ type: 'update_difficulty', value});
        showModal();
    }
     
    return(
        <Modal 
            isVisible= { visible }
            swipeDirection={['down']}
            coverScreen= { true }
            backdropOpacity= {.7}
            hideModalContentWhileAnimating={true}
            style={styles.modal}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
                {/* <Text>
                    Coach
                </Text> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View  style={styles.scrollView}>
                    <Text style={[styles.bigLabel, { marginBottom: 5, }]}>{`Bien hecho,`}</Text>
                    <Text style={[styles.bigLabel, { marginBottom: 30, }]}>{`Cómo te fue ${name}?`}</Text>
                    <Text style={styles.smallLabel}>El entrenamiento estuvo: </Text>
                    <Pressable onPress={()=> onPress(1)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnLabel}>Muy fácil</Text>
                            {/* <View style={{flexDirection:'row'}}>
                            {
                                easy.map((val, i)=> (
                                    <View key={i} style={val === 1 ? styles.ballActive : styles.ball}/>
                                ))
                            }
                            </View> */}
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> onPress(2)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnLabel}>Fácil</Text>
                            {/* <View style={{flexDirection:'row'}}>
                            {
                                veryEasy.map((val, i)=> (
                                    <View key={i} style={val === 1 ? styles.ballActive : styles.ball}/>
                                ))
                            }
                            </View> */}
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> onPress(3)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnLabel}>Estuvo bien</Text>
                            {/* <View style={{flexDirection:'row'}}>
                            {
                                ok.map((val, i)=> (
                                    <View key={i} style={val === 1 ? styles.ballActive : styles.ball}/>
                                ))
                            }
                            </View> */}
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> onPress(4)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnLabel}>Difícil</Text>
                            {/* <View style={{flexDirection:'row'}}>
                            {
                                hard.map((val, i)=> (
                                    <View key={i} style={val === 1 ? styles.ballActive : styles.ball}/>
                                ))
                            }
                            </View> */}
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> onPress(5)} style={styles.btnGrap} android_ripple={{color: 'black'}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnLabel}>Muy difícil</Text>
                            {/* <View style={{flexDirection:'row', }}>
                            {
                                veryHard.map((val, i)=> (
                                    <View key={i} style={val === 1 ? styles.ballActive : styles.ball}/>
                                ))
                            }
                            </View> */}
                        </View>
                    </Pressable>
                    <Text style={styles.message}>Tu respuesta nos ayudará a adaptar tus entrenamientos.</Text>
                </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor:'white',
    },
    smallLabel:{
        fontFamily: helvetica.bold,
        fontSize: 18,
        color:'black',
        lineHeight:18,
        paddingBottom:8, 
    },
    logo:{
        width: 584 * .16, 
        height: 126 * .16,
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
        fontSize: 26,
        color:'black',
        lineHeight:26,
        fontFamily: helvetica.bold,
    },
    scrollView:{
        backgroundColor:'white',
        padding:20,
        paddingTop:30,
    },
    header:{
        padding:20,
        paddingBottom:10,
        paddingTop:10,
        backgroundColor: 'white',
        borderBottomColor: 'rgba(0, 0, 0, .1)',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
    },
});