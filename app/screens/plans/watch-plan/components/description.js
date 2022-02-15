import React from 'react';
import { StyleSheet, View, Text, Dimensions} from 'react-native';

import { roboto } from '../../../../styles';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, } = Dimensions.get('window');

export default ({ text, loading }) => (
    <View style={{ padding:20, paddingTop:0, paddingBottom:40, }}>
        {
            loading ?
                <SkeletonPlaceholder  backgroundColor={'#F4F4F4'} highlightColor={'#ffffff'}>
                    <View style={styles.mainGrap}>
                        <View>
                            <View style={{ height:18, width: width-40, marginBottom:5, }} />
                            <View style={{ height:18, width:280, marginBottom:5, }} />
                            <View style={{ height:18, width:200, }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            :
            <Text style={styles.description}> { text }</Text>
        }
    </View> 
);


const styles = StyleSheet.create({
    description:{
        fontSize:18, 
        lineHeight:24, 
        fontFamily: roboto.regular, 
        width: width-40,
    },
});