import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';
/**
 * Redux
 */
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TrainingHistoryTypes } from 'redux/slices/doWorkoutSlice';
import { setStorageValue, getStoragedValue } from 'local_storage';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import PrimaryButton from './MainButton';

export interface WorkoutHistoryInterface {
    title: string;
    key: string;
    start_date: number;
    end_date: number;
    feedback: 1 | 2 | 3 | 4 | 5;
    training_history: TrainingHistoryTypes;
}

export type TraningHistoryType = WorkoutHistoryInterface[];

export default function FinalModal() {
    const [loading, setLoading] = React.useState(false);
    const navigation = useNavigation();
    const finalModal = useAppSelector(state => state.doWorkout.finalModal);
    /**
     * Workout info
     */
    const trainingHistory = useAppSelector(
        state => state.doWorkout.trainingHistory,
    );
    const startTime = useAppSelector(state => state.doWorkout.startTime);
    const endTime = useAppSelector(state => state.doWorkout.endTime);
    const workoutFeedback = useAppSelector(
        state => state.doWorkout.workoutFeedback,
    );
    const user = useAppSelector(state => state.user);
    const key = useAppSelector(state => state.doWorkout.key);
    const title = useAppSelector(state => state.doWorkout.title);

    /**
     * Save the workout to history workout (locally or in the cloud)
     */
    function endWorkout() {
        Common.logEvent('WORKOUT_COMPLETED');
        setLoading(true);
        const workout: WorkoutHistoryInterface = {
            title,
            key,
            start_date: startTime,
            end_date: endTime,
            feedback: workoutFeedback,
            training_history: trainingHistory,
        };
        getSaveWorkouts(workout);
    }

    async function getSaveWorkouts(workout: WorkoutHistoryInterface) {
        try {
            const result = await getStoragedValue('training_history');
            let newTraningHistory: TrainingHistoryTypes = [];
            if (result) {
                /**
                 * Update
                 */
                newTraningHistory = [...result];
            }
            newTraningHistory.push(workout);
            /**
             * Save traning
             */
            NetInfo.fetch().then(s => {
                if (s.isConnected && s.isInternetReachable) {
                    saveOnline(workout, newTraningHistory);
                } else {
                    saveLocally(newTraningHistory);
                }
            });
        } catch (error) {
            navigation.goBack();
        }
    }

    function saveOnline(
        workout: WorkoutHistoryInterface,
        newTraningHistory: TrainingHistoryTypes,
    ) {
        const storeRef = `training_history/${user.id}/`;
        database()
            .ref(storeRef)
            .push(workout);
        saveLocally(newTraningHistory);
    }

    async function saveLocally(newTraningHistory: TrainingHistoryTypes) {
        try {
            await setStorageValue('training_history', newTraningHistory);
            navigation.goBack();
        } catch (error) {
            navigation.goBack();
        }
    }

    return (
        <Modal
            isVisible={finalModal}
            backdropOpacity={0.2}
            propagateSwipe={true}
            style={styles.modal}>
            <View style={styles.mainGrap}>
                <Text style={styles.message}>
                    {'¡Felicidades! Completaste este entrenamiento'}
                </Text>
                <PrimaryButton
                    label={'Continuar'}
                    callback={endWorkout}
                    loading={loading}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: 'white',
    },
    mainGrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 38,
        fontFamily: roboto.bold,
        marginBottom: 100,
        textAlign: 'center',
    },
});
