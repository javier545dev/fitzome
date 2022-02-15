import * as React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import * as Common from 'common';
import { roboto, colors } from 'styles';

interface Props {
    message: string;
    type: 'user' | 'coach';
}

export default function SentMessage({ message, type }: Props) {

    if (type === 'user') {
        return (
            <View style={styles.grapUser}>
                <Text style={styles.messageUser}>{message}</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.grapCoach}>
                <Text style={styles.messageCoach}>{message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    grapCoach: {
        alignSelf: 'flex-start',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 25,
        backgroundColor: '#f2f3f5',
    },
    grapUser: {
        alignSelf: 'flex-end',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: colors.primary,
    },
    messageUser: {
        fontFamily: roboto.regular,
        color: 'white',
        fontSize: 16,
        lineHeight: 22,
        maxWidth: Common.width - 100,
    },
    messageCoach: {
        fontFamily: roboto.regular,
        color: 'black',
        fontSize: 16,
        lineHeight: 22,
        // fontSize: 18,
        // lineHeight: 24,
        maxWidth: Common.width - 100,
    }
});