import * as React from 'react';
import { StyleSheet, Text, } from 'react-native';

import { colors, roboto } from 'styles';

interface Props {
    label: string;
}

export default function Label({ label }: Props) {
    return (
        <Text style={styles.text}>{label}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: roboto.medium,
        paddingLeft: 20,
        color: 'black'
    }
});
