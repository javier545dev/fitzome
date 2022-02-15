import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateUser } from 'redux/slices/userSlice';

interface Props {
    numberOfPages: number;
    callback: () => void;
}

export default function SignupFifthScreen({ numberOfPages, callback }: Props) {
    const dispath = useAppDispatch();
    const user = useAppSelector(state => state.user);

    function updateUserProfile(objective: number) {
        dispath(
            updateUser({
                preferences: {
                    ...user.preferences,
                    objective,
                },
            }),
        );
        callback();
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 40 }}>
                <Text style={styles.paginationLabel}>{`4/${numberOfPages}`}</Text>
            </View>
            <Text style={styles.bigLabel}>Cuál es tu objetivo?</Text>
            <TouchableOpacity onPress={() => updateUserProfile(1)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Bajar de peso</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(2)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Ganar músculo y tonificar</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(3)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Mejorar la salud en general</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        width: Common.width,
    },
    paginationLabel: {
        fontSize: 16,
        fontFamily: roboto.bold,
        textAlign: 'center',
    },
    bigLabel: {
        fontSize: 22,
        fontFamily: roboto.bold,
        color: 'black',
        marginBottom: 40,
    },
    button: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: roboto.bold,
        color: 'black',
    },
});
