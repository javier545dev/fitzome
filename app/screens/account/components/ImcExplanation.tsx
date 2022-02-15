import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { roboto } from 'styles';

export default function ImcExplanation() {
    return (
        <View>
            <Text style={styles.label}>Índice de masa corporal</Text>
            <Text style={styles.text}>
                El índice de masa corporal (IMC), es un índice utilizado frecuentemente
                para clasificar el sobrepeso y la obesidad en adultos. La Organización
                Mundial de la Salud (OMS) define el sobrepeso como un IMC igual o
                superior a 25, y la obesidad como un IMC igual o superior a 30. Y un
                peso insuficiente o desnutrición como un IMC menor a 18.5.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: roboto.regular,
        color: 'black',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: 'black',
        paddingBottom: 20,
        fontFamily: roboto.bold,
    },
});
