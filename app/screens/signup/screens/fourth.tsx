import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';
import { useAppDispatch } from 'redux/hooks';
import { updateUser } from 'redux/slices/userSlice';

interface Props {
    numberOfPages: number;
    callback: () => void;
}

export default function SignupFourthScreen({ numberOfPages, callback }: Props) {
    const dispath = useAppDispatch();

    function updateUserProfile(current_physical_activity: number) {
        dispath(
            updateUser({
                current_physical_activity,
            }),
        );
        callback();
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 40 }}>
                <Text style={styles.paginationLabel}>{`3/${numberOfPages}`}</Text>
            </View>
            <Text style={styles.bigLabel}>Cuantos días entrenas por semana?</Text>
            <TouchableOpacity onPress={() => updateUserProfile(1)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Ninguno</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(2)}>
                <View style={styles.button}>
                    <Text style={styles.label}>1 - 2 días</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(3)}>
                <View style={styles.button}>
                    <Text style={styles.label}>3 - 4 días</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(4)}>
                <View style={styles.button}>
                    <Text style={styles.label}>5 o más días</Text>
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
