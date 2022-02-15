import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { eed } from 'features/Coach/config';
import { logEvent } from 'analitycs';
import { CoachEvents } from 'analitycs/events';
import * as Speech from 'expo-speech';

interface Props {
    thinkToSay: string;
    fixed?: boolean;
}

export default function CoachVoice({ thinkToSay, fixed = false }: Props) {
    const [speaking, setSpeaking] = useState(true);

    useEffect(() => {
        startSpeach(thinkToSay);
        return () => {
            removeSpeaking();
        };
    }, []);

    async function removeSpeaking() {
        try {
            const isSpeaking = await Speech.isSpeakingAsync();
            if (isSpeaking) {
                Speech.stop();
            }
        } catch (error) { }
    }

    async function startSpeach(phrase: string) {
        try {
            await Speech.speak(phrase, {
                ...eed,
                onDone: stopSpeach,
                onError: stopSpeach,
                onStopped: stopSpeach,
            });
        } catch (error) {
            logEvent(CoachEvents.coach_start_speach_fail);
        }
    }

    function stopSpeach() {
        setSpeaking(false);
        Speech.stop();
    }

    return (
        <View style={fixed ? styles.fixed : styles.regular}>
            {speaking ?
                <View style={styles.indicatorGrap}>
                    <ActivityIndicator size={'large'} color={'black'} />
                </View>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    regular: {
        flexDirection: 'row',
    },
    fixed: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 200,
    },
    indicatorGrap: {
        paddingHorizontal: 10,
    },
});
