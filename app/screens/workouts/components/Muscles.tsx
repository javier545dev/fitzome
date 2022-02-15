import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { roboto, colors } from 'styles';
import * as Common from 'common';
/**
 * Types
 */
import { TraningHistoryType } from 'screens/workouts/do-workout/components/FinalModal';
import {
    getWorkoutsWithFullExercises,
    getFrontMusclesColorsActivited,
    getBackMusclesColorsActivited,
} from 'screens/account/methods';
/**
 * Components
 */
import FrontBody from 'components/FrontBody';
import BackBody from 'components/BackBody';
import LinearGradient from 'react-native-linear-gradient';

const bodyWidth = (Common.width - 40 - 80) / 2;

interface Props {
    trainingHistory: TraningHistoryType;
}

export default function Muscles({ trainingHistory }: Props) {
    const [frontColors, setFrontColors] = React.useState<any>({});
    const [backColors, setBackColors] = React.useState<any>({});

    React.useEffect(() => {
        if (trainingHistory.length > 0) {
            const workoutsWithFullExercises = getWorkoutsWithFullExercises(
                trainingHistory,
            );
            const frontMusclesColors = getFrontMusclesColorsActivited(
                workoutsWithFullExercises,
            );
            setFrontColors(frontMusclesColors);
            const backMusclesColors = getBackMusclesColorsActivited(
                workoutsWithFullExercises,
            );
            setBackColors(backMusclesColors);
        }
    }, [trainingHistory]);

    return (
        <View style={styles.mainGrap}>
            <View style={styles.bodyGrap}>
                <FrontBody width={bodyWidth} {...frontColors} />
                <BackBody width={bodyWidth} {...backColors} />
            </View>
            <View style={styles.gradientGrap}>
                <View style={styles.labelGrap}>
                    <Text style={styles.smallLabel}>Cansado</Text>
                    <Text style={styles.smallLabel}>Descansado</Text>
                </View>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.primary, '#e9e9e9']}
                    style={styles.gradient}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        padding: 20,
        marginBottom: 20,
    },
    bodyGrap: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    gradientGrap: {
        width: bodyWidth * 2,
        marginLeft: (Common.width - bodyWidth * 2) / 2 - 20,
        marginTop: 10,
    },
    labelGrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gradient: {
        height: 10,
        width: bodyWidth * 2,
    },
    smallLabel: {
        fontSize: 13,
        fontFamily: roboto.regular,
    },
});
