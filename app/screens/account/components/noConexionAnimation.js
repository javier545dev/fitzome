import React from 'react';
import { View, Text,  Dimensions, } from 'react-native';

import { roboto } from '../../../styles/';

import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default () => {

    return(
        <View style={{alignItems:'center', justifyContent:'center', }}>
            <LottieView 
                    source={require('../../../../resources/media/lottie/girl-with-phone.json')} 
                    autoPlay 
                    loop 
                    style={{ width, height: width*.7,}}
            />
            <Text style={{ fontSize: 16, fontFamily: roboto.regular, }}>No hay conexión a internet</Text>
        </View>
    );
}