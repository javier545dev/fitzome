import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { roboto, colors } from 'styles';
import * as Common from 'common';
import { WorkoutHistoryInterface } from 'screens/workouts/do-workout/components/FinalModal';

export default function HistoryWorkouts({
    title,
    start_date,
}: WorkoutHistoryInterface) {
    const d = new Date(start_date);
    const traningDate = `${d.getMonth() + 1}-${d.getDate()}`;

    function shoeMessage() {
        Common.showToast(`${title}`);
        Common.logEvent('HISTORY_WORKOUT_PRESSED');
    }

    return (
        <Pressable onPress={shoeMessage}>
            <View style={styles.mainGrap}>
                <Text style={styles.title}>{`${title}`}</Text>
                <Text style={styles.date}>{`${traningDate}`}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: roboto.regular,
    },
    date: {
        fontSize: 13,
        fontFamily: roboto.regular,
        color: 'rgba(0,0,0,0.7)',
    },
});
