import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import * as Common from 'common';
import { roboto, colors } from '@styles/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type Props = {
    val: any;
};

const androidRipple = { color: 'rgba(0,0,0,.1)', borderless: true };

export default ({ val }: Props) => {
    const navigation = useNavigation();
    const { workout } = val;
    const { type, title, description } = workout;

    function goToWorkout() {
        Common.logEvent('TO_WORKOUT_FROM_CALENDAR');
        navigation.navigate('WatchWorkout', {
            title,
            description,
            type,
        });
    }

    return (
        <View style={styles.grap}>
            <View style={styles.workout}>
                <Pressable onPress={goToWorkout} android_ripple={androidRipple}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.title}>{title}</Text>
                        <View>
                            <Icon
                                name={'chevron-forward-outline'}
                                size={25}
                                color={'black'}
                            />
                        </View>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    grap: {
        marginBottom: 10,
    },
    btnGrap: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workout: {
        backgroundColor: '#f0f1f3',
        // borderWidth: 1,
        // borderColor: '#f0f1f3',
        borderRadius: 8,
    },
    title: {
        fontFamily: roboto.bold,
        color: 'black',
        fontSize: 18,
    },
});
