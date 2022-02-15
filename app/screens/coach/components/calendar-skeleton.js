import React from 'react';
import { View, Dimensions, } from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, } = Dimensions.get('window');

export default () => (
    <View style={{ padding:20,}}>
        <SkeletonPlaceholder  backgroundColor={'#F4F4F4'} highlightColor={'#ffffff'}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', }}>
                <View style={{ height:60, width: width/9, }} />
                <View style={{ height:60, width: width/9, }} />
                <View style={{ height:60, width: width/9, }} />
                <View style={{ height:60, width: width/9, }} />
                <View style={{ height:60, width: width/9, }} />
                <View style={{ height:60, width: width/9, }} />
                <View style={{ height:60, width: width/9, }} />
            </View>
            <View style={{ padding:20, paddingLeft:0,}}>
                <View style={{ height:20, width: 100, marginBottom:20, }} />
                <View style={{   width: width -40,height: (width-40)*.8, borderRadius:16, marginBottom:20, }}/>
                <View style={{   width: width -40,height: (width-40)*.8, borderRadius:16,}}/>
            </View>
        </SkeletonPlaceholder>
    </View> 
);