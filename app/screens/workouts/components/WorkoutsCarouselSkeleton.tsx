import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width, height } = Dimensions.get('window');

export default function WorkoutsCarouselSkeleton() {
    return (
        <SkeletonPlaceholder backgroundColor={'#F4F4F4'} highlightColor={'#ffffff'}>
            <View style={{ height: 25, width: 100, margin: 20 }} />
            <View style={{ paddingBottom: 20, paddingLeft: 20, flexDirection: 'row' }}>
                <View style={styles.iamge} />
                <View style={styles.iamge} />
            </View>
            <View style={{ height: 25, width: 100, margin: 20 }} />
            <View style={{ paddingBottom: 20, paddingLeft: 20, flexDirection: 'row' }}>
                <View style={styles.iamge} />
                <View style={styles.iamge} />
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    iamge: {
        width: width * 0.85,
        height: height * 0.25,
        borderRadius: 8,
        marginRight: 10,
    },
});
