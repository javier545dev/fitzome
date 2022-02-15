import React from 'react';
import { View, Dimensions, } from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, } = Dimensions.get('window');

export default () => (
    <View style={{ padding:20,}}>
        <SkeletonPlaceholder  backgroundColor={'#F4F4F4'} highlightColor={'#ffffff'}>
            <View style={{ height:20, width: 90, marginBottom:10, }} />
            <View style={{ flexDirection:'row', marginBottom:20, }}>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
            </View>
            <View style={{ height:20, width: 90, marginBottom:10, }} />
            <View style={{ flexDirection:'row', marginBottom:20, }}>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
            </View>
            <View style={{ height:20, width: 90, marginBottom:10, }} />
            <View style={{ flexDirection:'row', marginBottom:20, }}>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
            </View>
            <View style={{ height:20, width: 90, marginBottom:10, }} />
            <View style={{ flexDirection:'row', marginBottom:20, }}>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
                <View style={{ width: width/2, height: 60, marginRight:10, borderRadius:8,}}/>
            </View>
        </SkeletonPlaceholder>
    </View> 
);