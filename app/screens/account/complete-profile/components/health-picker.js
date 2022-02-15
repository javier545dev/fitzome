import React, { useContext, } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, } from 'react-native';

import { roboto, colors } from '../../../../styles/';
import AccountContext from '../../context';

const { width } = Dimensions.get('window');

export default () => {

    const { state, dispatch } = useContext(AccountContext);
    const { ableToDoPhysicalActivity } = state;

    const onPress = value => dispatch({ type: 'CHANGE_ABLE_TO_DO', value });

    return(
        <View style={styles.mainGrap}>
            <Text style={styles.bigLabel}>Puedes realizar actividad física de forma segura?</Text>
            <Text style={styles.text}>Tienes o has tenido alguna enfermedad o lesión que te impida realizar actividad física?</Text>
            <View style={styles.grap}>
                <TouchableOpacity onPress={()=> onPress(1)}>
                    <View style={ 
                        ableToDoPhysicalActivity === 0 || ableToDoPhysicalActivity === 2 ? styles.day : styles.daySelected
                    }>
                        <Text style={
                            ableToDoPhysicalActivity === 0 || ableToDoPhysicalActivity === 2 ?  styles.label : styles.labelSelected
                        }>Si</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> onPress(2)}>
                    <View style={
                         ableToDoPhysicalActivity === 0 || ableToDoPhysicalActivity === 1 ? styles.day : styles.daySelected
                    }>
                        <Text style={
                            ableToDoPhysicalActivity === 0 || ableToDoPhysicalActivity === 1 ? styles.label : styles.labelSelected
                        }>No</Text>
                    </View>
                </TouchableOpacity>
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
        width: width-40,
    },
    text:{
        fontSize:16,
        fontFamily: roboto.regular,
        padding:20,
        paddingTop:10,
        color:'rgba(0,0,0,.7)'
    },
    day:{
        width: ((width/2)-20),
        marginRight:5,
        backgroundColor: '#f3f3f3',
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
    },
    daySelected:{
        width: ((width/2)-20),
        marginRight:5,
        backgroundColor: colors.primary_blue,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
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