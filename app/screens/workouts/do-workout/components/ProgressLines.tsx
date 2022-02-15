import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from 'styles';
import * as Common from 'common';

interface Props {
    totalOfExercises: number[];
    current: number;
}

export default function ProgressLines({ totalOfExercises, current }: Props) {
    const totalLength = totalOfExercises.length;
    const barWidth = (Common.width - 40 - totalLength) / totalLength;
    return (
        <View style={styles.grap}>
            {totalOfExercises.map((val, i) => {
                if (val === 1) {
                    return (
                        <View
                            key={i}
                            style={{
                                ...styles.bar,
                                width: barWidth,
                                backgroundColor:
                                    current >= i ? colors.primary_blue : 'rgba(0,0,0,.1)',
                            }}
                        />
                    );
                }
                if (val === 0) {
                    return <View key={i} style={{ ...styles.emptyBar, width: barWidth }} />;
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    grap: {
        flexDirection: 'row',
    },
    bar: {
        height: 6,
        marginRight: 1,
    },
    emptyBar: {
        height: 6,
        backgroundColor: 'rgba(0,0,0,.0)',
        marginRight: 1,
    },
});
