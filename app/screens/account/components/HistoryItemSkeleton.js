import React from 'react';
import {View, Dimensions} from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const { width } = Dimensions.get('window');

export default () => (
    <SkeletonPlaceholder  backgroundColor={'#333333'} highlightColor={'#000'}>
        <View style={{ flexDirection: 'row', width}}>
            <View style={{width: width/3 - 30, height: (width/3 - 30) + 20 }}>

            </View>
            <View style={{widht: width - (width/3 - 30) - 20, padding:10, justifyContent:'center',}}>
                <View style={{width: width/4, height: 18, marginBottom: 5}}></View>
                <View style={{width: width/4*2, height: 50, marginBottom: 5}}></View>
                <View style={{width: width/10, height: 15,}}></View>
            </View>
        </View>
    </SkeletonPlaceholder>
);