import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { roboto } from 'styles';

interface Props {
    name: string;
    tmr: number;
}

export default function TMBExplanation({ tmr, name }: Props) {

    const customText = `Por ejemplo ${name}, tu tasa metabólica basal es ${tmr} kcal esto quiere decir que necesitas ${tmr} kcal para mantener las funciones básicas de tu cuerpo (Como la respiración).
    Si realizas una actividad física que requiere 200 kcal, tu tasa metabólica aumentará a ${tmr + 200} kcal, más la energía necesaria para realizar otras actividades, como caminar o trabajar.  `

    return (
        <View>
            <Text style={styles.label}>Tasa metabólica basal</Text>
            <Text style={styles.text}>
                La tasa metabólica basal (TMB) es la cantidad de energía que se gasta cuando una persona se encuentra en reposo físico completo (es decir, acostada). La TMB suministra la energía para
                mantener las funciones vitales del cuerpo.
            </Text>
            <Text style={styles.text}>
                {customText.replace('    ', '')}
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