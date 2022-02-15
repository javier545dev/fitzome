import React, { useEffect, useState, } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,  } from 'react-native';

import { roboto } from '../../../../styles/';
import { createWarmup } from '../../actions';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({ type }) => {

    const [warmup, setWarmup] = useState([]);
    const navigation = useNavigation();
    const title = 'Calentamiento';

    useEffect(()=>{
        const _warmup = createWarmup(type);
        setWarmup(_warmup); 
    },[]);

    return (
        <TouchableOpacity onPress={()=> navigation.push('WatchWorkout', { sets: JSON.stringify(warmup), title, })}>
            <View style={styles.grap}>
                <Text style={styles.label}>{ title }</Text>
                <Icon name={'chevron-forward'} size={25} color={'black'}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    grap:{
        padding:20, 
        paddingTop:0, 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center',
    },
    label:{
        fontFamily: roboto.medium, 
        fontSize: 18,
        lineHeight: 18, 
    },
});