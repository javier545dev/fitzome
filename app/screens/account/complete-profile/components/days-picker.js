import React, { useState, useContext, } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, } from 'react-native';

import { roboto, colors } from '../../../../styles/';
import AccountContext from '../../context';

const daysNames = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá',];

const { width } = Dimensions.get('window');

export default () => {

    const { state, dispatch } = useContext(AccountContext);
    const { days } = state;

    function selectDays(val){
        let temp = [...days];
        //const selectedDays = countSelectedDays();
        for (let i = 0; i < days.length; i++) {
            const e = days[i];
            if(i === val) temp[i] = e === 0 ? 1 : 0;
        }
        dispatch({ type: 'CHANGE_DAYS', value: temp});
    }

    function countSelectedDays(){
        let temp = 0;
        for (let i = 0; i < days.length; i++) {
            const e = days[i];
            if(e === 1) temp += 1;
        }
        return temp;
    }

    return(
        <View style={styles.mainGrap}>
            <Text style={styles.bigLabel}>Cuándo quieres entrenar?</Text>
            <Text style={styles.text}>Selecciona de 2 a 6 días</Text>
            <View style={styles.grap}>
                {
                    days.map((val, index)=>{
                        return(
                            <TouchableOpacity key={index} onPress={()=> selectDays(index)}>
                                <View style={val === 0 ? styles.day : styles.daySelected}>
                                    <View style={val === 0 ? styles.noSelected : styles.selected}/>
                                    <Text style={val === 0 ? styles.label : styles.labelSelected}>{`${daysNames[index]}`}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap:{
        paddingTop:20,
        paddingBottom:20,
    },
    grap:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:15,
    },
    bigLabel:{
        fontFamily: roboto.regular,
        fontSize:22,
        paddingLeft:20,
    },
    text:{
        fontSize:16,
        fontFamily: roboto.regular,
        padding:20,
        paddingTop:10,
        color:'rgba(0,0,0,.7)'
    },
    day:{
        width: ((width/7)-10),
        marginRight:5,
        backgroundColor: '#f3f3f3',
        height:70,
        alignItems:'center',
        borderRadius:4,
    },
    daySelected:{
        width: ((width/7)-10),
        marginRight:5,
        backgroundColor: colors.primary_blue,
        height:70,
        alignItems:'center',
        borderRadius:4,
    },
    selected:{
        width:10,
        height:10,
        borderRadius:10,
        marginBottom:12,
        marginTop:12,
        backgroundColor:'white',
    },
    noSelected:{
        width:10,
        height:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'black',
        marginBottom:12,
        marginTop:12,
    },
    labelSelected:{
        fontFamily: roboto.regular,
        fontSize:15,
        color:'white',
    },
    label:{
        fontFamily: roboto.regular,
        fontSize:15,
        color:'black',
    },
});