import React from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get('window');

export default () => (
    <SkeletonPlaceholder backgroundColor={'#F4F4F4'} highlightColor={'#ffffff'}>
        <View>
            <View style={styles.grap}>
                <View style={styles.images}/>
                <View style={{width:200, height:20, marginLeft:10, }}/>
            </View>
            <View style={styles.grap}>
                <View style={styles.images}/>
                <View style={{width:100, height:20, marginLeft:10, }}/>
            </View>
            <View style={styles.grap}>
                <View style={styles.images}/>
                <View style={{width:140, height:20, marginLeft:10, }}/>
            </View>
        </View>
    </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
    grap:{
        marginBottom: 10,
        flexDirection:'row', 
        alignItems:'center', 
    },
    images:{
        width: width*.18, 
        height: width*.18, 
        borderRadius:4,
    },
});