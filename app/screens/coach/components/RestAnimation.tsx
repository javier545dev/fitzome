import * as React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';

import { roboto, } from 'styles';


import LottieView from 'lottie-react-native';

const { width: _width } = Dimensions.get('window');
const width = _width*.6;

export default function RestAnimation(){

    return(
        <View>
            <Text style={styles.actLabel}>{'Descanso'}</Text>
            <View style={{ width: _width-40, justifyContent:'center', alignItems:'center' }}>
                <LottieView 
                    source={require('../../../../resources/media/lottie/warm-up-guy.json')} 
                    autoPlay 
                    loop 
                    style={{ width, height: width,}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    actLabel:{
        fontSize:16,
        fontFamily: roboto.medium,
        color:'black',
    },
});
