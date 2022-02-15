import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Common from 'common';
import FrontBodySvg from 'components/FrontBody';
import BackBodySvg from 'components/BackBody';
import { WorkoutInterface } from 'screens/workouts/actions/workout';
import { getMusclesActivatedInWorkout } from 'screens/workouts/actions';
import { musclesDirectory } from 'locales';
import { MusclesType } from '../../resources/data/exercises';

interface Props {
    rounds: WorkoutInterface['rounds'];
}

type Muscle = {
    intensity: number;
    name: MusclesType;
    quantity: number;
};

// thermo human colors => #96c9d7 #ec5c15 #208db9

const bodyImageWidth = (Common.width - 60) / 3;
export const primaryColor = '#2583FD';
export const secondaryColor = '#85BAFE';
export const ternaryColor = '#C2DCFE';

export default function BodyMuscles({ rounds }: Props) {

    const [muscles, setMuscles] = React.useState<any>([]);
    const [frontColors, setFrontColors] = React.useState<any>({});
    const [backColors, setBackColors] = React.useState<any>({});

    React.useEffect(() => {
        const musclesActivated = getMusclesActivatedInWorkout(rounds);
        const musclesMapped = Object.entries(musclesActivated).map(
            muscle => muscle[1],
        );
        musclesMapped.sort(function (a, b) {
            return b.quantity - a.quantity;
        });
        /**
         * Get muscles colors
         */
        const frontMusclesColors = getFrontMusclesColors(musclesMapped);
        const backMusclesColors = getBackMusclesColors(musclesMapped);
        setMuscles(musclesMapped);
        setFrontColors(frontMusclesColors);
        setBackColors(backMusclesColors);
    }, []);


    function getFrontMusclesColors(musclesMapped: Muscle[]) {
        let musclesColors: {
            [key: string]: string;
        } = {};
        musclesMapped.forEach((muscle, i) => {
            const color =
                i <= 1 ? primaryColor : i === 2 ? secondaryColor : ternaryColor;
            if (muscle.name === 'leg') {
                musclesColors = {
                    ...musclesColors,
                    quadriceps: color,
                };
            } else if (muscle.name === 'groin') {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (muscle.name === 'arm') {
                musclesColors = {
                    ...musclesColors,
                    biceps: color,
                };
            } else if (muscle.name === 'ankle') {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if (muscle.name === 'lower_abs' || muscle.name === 'upper_abs') {
                musclesColors = {
                    ...musclesColors,
                    abs: color,
                };
            } else if (muscle.name === 'obliques') {
                musclesColors = {
                    ...musclesColors,
                    obliques: color,
                };
            } else if (muscle.name === 'shoulder') {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            } else if (muscle.name === 'chest') {
                musclesColors = {
                    ...musclesColors,
                    chest: color,
                };
            }
        });
        return musclesColors;
    }

    function getBackMusclesColors(musclesMapped: Muscle[]) {
        let musclesColors: {
            [key: string]: string;
        } = {};
        musclesMapped.forEach((muscle, i) => {
            const color =
                i <= 1 ? primaryColor : i === 2 ? secondaryColor : ternaryColor;
            if (muscle.name === 'leg') {
                musclesColors = {
                    ...musclesColors,
                    hamstrings: color,
                };
            } else if (muscle.name === 'groin') {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (muscle.name === 'glute') {
                musclesColors = {
                    ...musclesColors,
                    glute: color,
                };
            } else if (muscle.name === 'arm') {
                musclesColors = {
                    ...musclesColors,
                    triceps: color,
                };
            } else if (muscle.name === 'ankle') {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if (muscle.name === 'back') {
                musclesColors = {
                    ...musclesColors,
                    back: color,
                };
            } else if (muscle.name === 'shoulder') {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            }
        });

        return musclesColors;
    }

    return (
        <View>
            {muscles.length > 0 ? (
                <View style={styles.grap}>
                    <View>
                        {muscles.map((muscle: Muscle, index: number) => {
                            return (
                                <View key={index} style={styles.muscleInfo}>
                                    <View
                                        style={
                                            index <= 1
                                                ? styles.circle1
                                                : index === 2
                                                    ? styles.circle2
                                                    : styles.circle3
                                        }
                                    />
                                    <Text style={styles.muscleName} numberOfLines={1}>
                                        {musclesDirectory[muscle.name]}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <FrontBodySvg width={bodyImageWidth} {...frontColors} />
                    <BackBodySvg width={bodyImageWidth} {...backColors} />
                </View>
            ) : null}
            {/* <View>
                <Text>Esta es una representación aproximada, se recomienda discreción.</Text>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    grap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    muscleInfo: {
        width: bodyImageWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    muscleName: {
        fontSize: 15,
        textTransform: 'capitalize',
        width: bodyImageWidth - 14,
    },
    circle1: {
        width: 9,
        height: 9,
        backgroundColor: primaryColor,
        marginRight: 5,
        borderRadius: 3,
    },
    circle2: {
        width: 9,
        height: 9,
        backgroundColor: secondaryColor,
        marginRight: 5,
        borderRadius: 3,
    },
    circle3: {
        width: 9,
        height: 9,
        backgroundColor: ternaryColor,
        marginRight: 5,
        borderRadius: 3,
    },
});
