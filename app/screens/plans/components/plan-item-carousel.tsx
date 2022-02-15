import * as React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';

import * as Common from 'common';
import { PlansInterface } from '../plans';
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from 'redux/hooks';
import { colors, roboto } from 'styles';
import { plansUrls } from '../../../../resources/data/images';

const itemWidth = Common.width * 0.75;
const itemHeight = Common.height * 0.25;
const androidRipple = { color: colors.ripple_color };

interface Props {
    index: number;
    item: PlansInterface;
}

export default function PlanItemCarusel({ item, index }: Props): JSX.Element {
    const user = useAppSelector(state => state.user);
    const navigation = useNavigation();

    const imagePath = user.gender === 2 ? `${item.key}_w` : `${item.key}_m`;
    const image = plansUrls[imagePath];
    const title = getPlanTitle(user.gender, item.key);

    function goToPlanScreen() {
        navigation.navigate('Watch_Plan_AI', { ...item, title });
    }

    function getPlanTitle(gender: number, type: typeof item.key) {
        let title = '';
        /**
         * Is a woman
         */
        if (gender === 2) {
            if (type === 'leg_1') {
                title = 'Tonificar piernas y glúteos';
            } else if (type === 'abs_1') {
                title = 'Tonificar abdomen';
            } else if (type === 'arms_1') {
                title = 'Tonificar brazos';
            } else if (type === 'cardio_1') {
                title = 'Quema grasa y basa de peso';
            } else if (type === 'cardio_2') {
                title = 'Quema grasa y tonifica piernas';
            } else if (type === 'cardio_3') {
                title = 'Quema grasa y tonifica abdomen';
            }
        } else {
            /**
             * Is a man
             */
            if (type === 'leg_1') {
                title = 'Fortalecer piernas';
            } else if (type === 'abs_1') {
                title = 'Fortalecimiento abdominal';
            } else if (type === 'arms_1') {
                title = 'Fortalecer brazos';
            } else if (type === 'cardio_1') {
                title = 'Quema grasa y basa de peso';
            } else if (type === 'cardio_2') {
                title = 'Quema grasa y fortalece piernas';
            } else if (type === 'cardio_3') {
                title = 'Quema grasa y fortalece abdomen';
            }
        }
        /** */
        return title;
    }

    return (
        <Pressable
            key={index}
            onPress={goToPlanScreen}
            android_ripple={androidRipple}>
            <View>
                <Image source={image} style={styles.itemGrap} borderRadius={16} />
                <Text style={styles.title} numberOfLines={1}>{`${title}`}</Text>
                <Text style={styles.sessions}>{`${item.weeks} semanas`}</Text>
                <Text style={styles.sessions}>{`${item.sessionsPerWeek
                    } sesiones por semana`}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemGrap: {
        width: itemWidth,
        height: itemHeight,
        marginRight: 5,
        flexDirection: 'column-reverse',
    },
    title: {
        fontFamily: roboto.medium,
        fontSize: 20,
        marginTop: 10,
        width: itemWidth - 10,
    },
    sessions: {
        fontFamily: roboto.regular,
        fontSize: 16,
        color: colors.text.secondary,
    },
});
