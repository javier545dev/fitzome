import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';
import { getWorkoutImageUrl, getWorkoutDescription } from '../actions';
import { workoutsUrls } from '../../../../resources/data/images';
import { WorkoutsTypes } from '../actions/workout';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { UserState } from 'redux/slices/userSlice';

interface Props {
    user: UserState;
    item: {
        type: WorkoutsTypes;
        level: number;
        title: string;
    };
}

const cardWidth = 95;

export default function WorkoutMuscleCard({ user, item }: Props) {
    const { title, type } = item;
    const navigation = useNavigation();
    const imageUrl = getWorkoutImageUrl(item, user.gender);
    const description = getWorkoutDescription(item);

    function goToWorkout() {
        Common.logEvent('TO_WORKOUT_FROM_WORKOUTS');
        navigation.navigate('WatchWorkout', { title, description, type });
    }

    const cardio = type.includes('cardio');

    return (
        <Pressable onPress={goToWorkout}>
            <View style={styles.mainGrap}>
                <View style={cardio ? styles.imgGrapCardio : styles.imgGrap}>
                    <Image style={styles.img} source={workoutsUrls[imageUrl]} />
                </View>
                {/* {
                    cardio ?

                        <Text style={styles.cardio}>
                            cardio
                        </Text>

                        : null
                } */}
                <Text style={styles.title} numberOfLines={2}>
                    {`${title}`}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        marginRight: 16,
    },
    imgGrap: {
        width: cardWidth,
        height: cardWidth,
        elevation: 2,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 8,
    },
    imgGrapCardio: {
        width: cardWidth,
        height: cardWidth,
        elevation: 2,
        borderRadius: 20,
        backgroundColor: '#7FDC8E',
        marginBottom: 8,
    },
    img: {
        width: cardWidth,
        height: cardWidth,
        borderRadius: 20,
    },
    title: {
        width: cardWidth,
        fontSize: 14,
        fontFamily: roboto.regular,
    },
    cardio: {
        fontSize: 14,
        fontFamily: roboto.black,
        alignSelf: 'flex-end',
        color: '#51cf66',
        textTransform: 'uppercase',
        letterSpacing: -.5,
    }
});
