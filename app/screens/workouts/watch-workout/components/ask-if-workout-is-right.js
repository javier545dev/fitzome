import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, } from 'react-native';

import { roboto, colors, } from '../../../../styles/';

import database from '@react-native-firebase/database';
import NetInfo from "@react-native-community/netinfo";
import { setStorageValue, } from '../../../../local_storage'

export default ({ level, sets, user, workoutKey, }) => { 

    const [loading, setLoading] = useState(false);
    const [feedbackCompleted, setFeedbackCompleted] = useState(false);

    const question = level === 1 ? 'Este entrenamiento es fácil para ti?' :
                     level === 2 ? 'Este entrenamiento es adecuado para ti?' : 'Este entrenamiento es avanzado para ti?'
    
    function sendFeedback(feedback){
        setLoading(true);
        const workout = cleanWorkout(sets);
        const userId = user.id ? user.id : 2222;
        const itemToSave = { workout, feedback, date: new Date().valueOf(), };
        const dataRef = `feedback/v1/workouts/${userId}/${workoutKey}/`;
        NetInfo.fetch().then(s => {
            if(s.isConnected && s.isInternetReachable){
                const ref = database().ref(dataRef);
                ref.push(itemToSave);
                setStorageValue(`fb_${workoutKey}`, true);
                setFeedbackCompleted(true);
            }else{
                setStorageValue(`fb_${workoutKey}`, true);
                setFeedbackCompleted(true);
            }
        });
    }

    function cleanWorkout(rounds){
        let cleanedWorkout = [];
        for (let i = 0; i < rounds.length; i++) {
            const round = rounds[i];
            cleanedWorkout.push([]);
            for (let z = 0; z < round.length; z++) {
                const exercise = round[z];
                const { key, volume_amount} = exercise;
                cleanedWorkout[i].push({ key, volume_amount, });
            }
        }
        return cleanedWorkout; 
    }
    

    return(
        <>
            {
                feedbackCompleted ?
                    <View style={{padding:20, marginBottom:20, justifyContent:'center', alignItems:'center', }}>
                        <Text style={{ fontFamily: roboto.regular, fontSize:16, }}>Gracias 👍</Text>
                    </View>
                :
                loading ? 
                    <View style={{marginBottom:20, }}>
                        <ActivityIndicator size={'large'} color={colors.primary_blue}/>
                    </View>
                :
                <View style={styles.mainGrap}>
                    <Text style={styles.bigLabel}>Ayudanos a mejorar</Text>
                    <Text style={styles.text}>{ question }</Text>
                    <View>
                    <View style={styles.btnsGrap}>
                        <TouchableOpacity onPress={()=> sendFeedback(1)}>
                            <View style={styles.btnGrap}>
                                <Text style={styles.btnLabel}>Si 👍</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> sendFeedback(2)}>
                            <View style={styles.btnGrap}>
                                <Text style={styles.btnLabel}>No 👎</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            }
        </>
    )
};

const styles = StyleSheet.create({
    mainGrap:{
        padding:20, 
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth:1,
        borderTopColor: colors.backgroundGray,
        borderTopWidth:1,
        marginBottom:20, 
    },
    bigLabel:{
        fontSize:20, 
        fontFamily: roboto.medium,
        marginBottom:10,
    },
    text:{
        fontSize:16, 
        fontFamily: roboto.regular,
        marginBottom:10,
    },
    btnsGrap:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10,
    },
    btnGrap:{
        backgroundColor: '#f3f3f3',
        padding:20, 
        borderRadius:8, 
    },
    btnLabel:{
        fontSize: 16,
        fontFamily: roboto.medium,
        color:'black',
    },
});