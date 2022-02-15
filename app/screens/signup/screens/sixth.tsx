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

export default function SignupSixthScreen({ numberOfPages, callback }: Props) {
    const dispath = useAppDispatch();

    function updateUserProfile(physical_activity_level: number) {
        dispath(
            updateUser({
                physical_activity_level,
            }),
        );
        callback();
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 40 }}>
                <Text style={styles.paginationLabel}>{`5/${numberOfPages}`}</Text>
            </View>
            <Text style={styles.bigLabel}>Que tan activo eres?</Text>
            <TouchableOpacity onPress={() => updateUserProfile(1)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Poco activo</Text>
                    <Text style={styles.smallLabel}>
                        Empleado de oficina, estudiante, conductor, médico
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(2)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Moderadamente activo</Text>
                    <Text style={styles.smallLabel}>
                        Cajero, Barista, jardinero, ama de casa, mecánico
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(3)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Muy activo</Text>
                    <Text style={styles.smallLabel}>
                        Trabajador agrícola, obrero, policía, minero, camarero
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateUserProfile(4)}>
                <View style={styles.button}>
                    <Text style={styles.label}>Altamente activo</Text>
                    <Text style={styles.smallLabel}>
                        Leñador, herrero, cargador, atleta
                    </Text>
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
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    smallLabel: {
        fontSize: 13,
        fontFamily: roboto.regular,
        color: 'rgba(0,0,0,.5)',
        textAlign: 'center',
    },
});
