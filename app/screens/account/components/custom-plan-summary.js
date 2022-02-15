import React from 'react';
import { View, Text, TouchableNativeFeedback, Dimensions, StyleSheet, } from 'react-native';

import { roboto, } from '../../../styles/';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default ({ plans,  }) => {

    const navigation = useNavigation();

    return(
        <>
            {
                plans.map(({ key, title, weeks, }, i) => {
                    const d = new Date(key);
                    const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
                    return(
                        <TouchableNativeFeedback key={i} onPress={()=> navigation.navigate('Watch_Plan', { type: 'custom', title, key, weeks, })}>
                            <View style={styles.mainGrap}>
                                <View>
                                    <Text style={styles.title}>{title}</Text>
                                    <Text style={styles.weeks}>{`${weeks} semanas`}</Text>
                                    <Text style={styles.date}>{ date }</Text>
                                </View>
                                <Icon name={'chevron-forward-outline'} size={30} color={'rgba(0,0,0,.7)'}/>
                            </View>
                        </TouchableNativeFeedback>
                    )
                })
            }
        </>
    );
}

const styles = StyleSheet.create({
    mainGrap:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        padding:20, 
    },
    title:{
        fontSize:20, 
        fontFamily: roboto.bold,
        width: width - 100,
    },
    weeks:{
        fontSize:18, 
        fontFamily: roboto.regular, 
        color:'rgba(0,0,0,.7)', 
    },
    date:{
        fontSize:14, 
        fontFamily: roboto.regular, 
        color:'rgba(0,0,0,.7)',
    },
});