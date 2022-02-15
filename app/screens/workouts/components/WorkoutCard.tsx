import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable, } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';
import { getWorkoutImageUrl, getWorkoutDescription } from '../actions';
import { workoutsUrls } from '../../../../resources/data/images';
import { WorkoutsTypes } from '../actions/workout';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const width = Common.width * 0.8;
const height = width * 0.56;

import { UserState } from 'redux/slices/userSlice';

interface Props {
    user: UserState;
    item: {
        type: WorkoutsTypes;
        level: number;
        title: string;
    };
}

export default function WorkoutCard({ user, item }: Props) {
    const { title, type } = item;
    const navigation = useNavigation();
    const imageUrl = getWorkoutImageUrl(item, user.gender);
    const description = getWorkoutDescription(item);

    function goToWorkout() {
        navigation.navigate('WatchWorkout', { title, description, type });
    }

    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={goToWorkout}>
                <Image style={styles.image} source={workoutsUrls[imageUrl]} />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.8)']}
                    style={styles.titleGrap}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode={'clip'}>
                        {title}
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginRight: 5,
        elevation: 2,
        borderRadius: 8,
        width,
        height,
    },
    image: {
        width,
        height,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    title: {
        color: 'white',
        fontFamily: roboto.bold,
        fontSize: 22,
        textAlign: 'left',
        lineHeight: 32,
        letterSpacing: -0.5,
        textTransform: 'uppercase',
    },
    titleGrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 20,
        width,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
});
