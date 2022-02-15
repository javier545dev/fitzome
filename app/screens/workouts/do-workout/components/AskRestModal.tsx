import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import { roboto, colors } from 'styles';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { eed } from 'common/text-to-speech';
import * as Speech from 'expo-speech';
import * as Common from 'common';

import {
    showRestModal,
    showSelectRestModal,
    updateRest,
    updateTraningHistory,
    TrainingHistoryTypes
} from 'redux/slices/doWorkoutSlice';

import Modal from 'react-native-modal';

interface Props {
    round: number;
    user: string;
}

export default function AskRestModal({ round, user }: Props) {

    React.useEffect(() => {
        setTimeout(() => {
            const n = Common.getRandomNumber(1, 2);
            const name = user.split(' ')[0];
            if (n === 1) {
                startSpeach(`Ronda completa ${name}.. Como te sientes?`);
            } else {
                startSpeach(`Ya terminaste la ronda ${round}.. Como te sientes ${name}?`);
            }
        }, 400);
    }, []);

    const dispatch = useAppDispatch();
    const selectRestModal = useAppSelector(
        state => state.doWorkout.selectRestModal,
    );
    const trainingHistory = useAppSelector(state => state.doWorkout.trainingHistory)

    function setRest(val: 30 | 60 | 90) {
        dispatch(updateRest(val));
        dispatch(showSelectRestModal(false));
        /**
         * Update history
         */
        let tempTraningHistory: TrainingHistoryTypes = [...trainingHistory];
        tempTraningHistory.push({ key: 'rest', value: val, })
        dispatch(updateTraningHistory(tempTraningHistory));
        /**
         * Show modal
         */
        setTimeout(() => {
            dispatch(showRestModal(true));
        }, 500);
    }

    async function startSpeach(phrase: string) {
        try {
            await Speech.speak(phrase, { ...eed });
        } catch (error) {
            Common.logEvent('EXPO_TEXT_SPEACH_FAIL');
        }
    }

    return (
        <Modal
            isVisible={selectRestModal}
            backdropOpacity={0.2}
            style={styles.modal}>
            <View style={styles.header}>
                <Image
                    source={require('../../../../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.scrollView}>
                <Text
                    style={styles.bigLabel}>{`Ya terminaste la ronda ${round},`}</Text>
                <Text style={{ ...styles.bigLabel, marginBottom: 20 }}>
                    Como te sientes?
                </Text>
                <TouchableOpacity onPress={() => setRest(30)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Bien</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRest(60)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Cansado</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRest(90)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Muy cansado</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    logo: {
        width: 584 * 0.2,
        height: 126 * 0.2,
    },
    scrollView: {
        backgroundColor: 'white',
        padding: 20,
    },
    bigLabel: {
        fontSize: 24,
        color: 'black',
        lineHeight: 26,
        fontFamily: roboto.medium,
    },
    btnGrap: {
        backgroundColor: '#f3f3f3',
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    btnLabel: {
        fontSize: 16,
        fontFamily: roboto.medium,
    },
});
