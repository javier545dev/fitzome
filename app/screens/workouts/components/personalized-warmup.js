import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, } from 'react-native';

import { helvetica, colors } from '../../../styles';
import { createWarmup } from '../actions';
import { workoutsUrls } from '../../../../resources/data/images';

import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

export default ({ type }) => { 

    const [warmup, setWarmup] = useState([]);
    const navigation = useNavigation();
    const warmupName = type === 'full' ? 'Calentamiento general' :
                       type === 'lower' ? 'Calentamiento de miembros inferiores' : 'Calentamiento de miembros superiores';

    useEffect(()=>{
        const _warmup = createWarmup(type);
        setWarmup(_warmup); 
    },[]);
    
    return(
        <View style={styles.mainGrap}>
            <View style={styles.contentGrap}>
                <Text style={styles.label}>Calentamiento recomendado</Text>
                <Pressable onPress={()=> navigation.navigate('WatchWorkout', { sets: JSON.stringify(warmup), title: warmupName, })}>
                    <Image
                        style={styles.image}
                        source={workoutsUrls['_1612809376482_']}
                    />
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.3)']} style={styles.titleGrap}>
                        <Text 
                            style={styles.title} numberOfLines={2} ellipsizeMode={'clip'}
                        >
                            { warmupName }
                        </Text>
                        
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    mainGrap:{
        backgroundColor: colors.backgroundGray,
    },
    contentGrap:{
        marginTop: 20,
        padding:20,
        backgroundColor:'white',
    },
    label:{
        fontSize:18,
        lineHeight: 18, 
        color:'black', 
        paddingBottom:10,  
        fontFamily: helvetica.bold,
    },
    image:{
        width: width-40, 
        height: height/5, 
        borderRadius:8,
    },
    title:{
        color:'white',
        fontFamily: helvetica.extra_bold, 
        fontSize:18,
        textAlign:'left',
        letterSpacing: -1, 
        lineHeight: 18, 
        textTransform: 'uppercase',
    },
    titleGrap:{
        position:'absolute',
        bottom:0,
        left:0,
        padding:20,
        paddingRight:50,
        width: width-40,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },
});