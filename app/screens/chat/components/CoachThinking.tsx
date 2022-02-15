import * as React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

export default function CoachThinking() {
    return (
        <View style={styles.grapCoach}>
            <ActivityIndicator size={'small'} color={'black'} />
        </View>
    )
}

const styles = StyleSheet.create({
    grapCoach: {
        alignSelf: 'flex-start',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 20,
        backgroundColor: '#f2f3f5',
    },
});