import React from 'react';
import { View, StyleSheet } from 'react-native';

import * as Common from 'common';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function DownloadExercisesCarousel() {
    return (
        <SkeletonPlaceholder backgroundColor={'#F4F4F4'} highlightColor={'#ffffff'}>
            <View style={styles.imageGrap}>
                <View style={styles.image} />
                <View style={styles.image} />
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    imageGrap: {
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
    },
    image: {
        width: Common.width * 0.6,
        height: Common.width * 0.6,
        borderRadius: 8,
        marginRight: 10,
    },
});
