import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import * as Common from 'common';
import { roboto, colors } from '@styles/index';
import { getCoachMessage } from '../../../actions';
import { getDayNameAndNumber } from '../actions';
import { useAppSelector } from 'redux/hooks';
import { WorkoutsTypes } from 'screens/workouts/actions/workout';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Rest from './RestAnimation';
import Workout from './workout';
import ExpiredSession from './expired-session';
import ContactAsesor from './ContactAsesor';

type Props = {
    item: any[];
    index: number;
    startDate: Date;
};

const itemWidth = Common.width;
const androidRipple = { color: 'rgba(0,0,0,.1)', borderless: true };

const stretchingWorkout = {
    title: 'Estiramiento',
    description:
        'Relájate y elimina la tensión de tus músculos, mejora la flexibilidad y prepara tu cuerpo para un buen descanso.',
    type: 'stretching',
};

const Day = ({ item, index, startDate }: Props): JSX.Element => {

    const dayName = getDayNameAndNumber(startDate, index);
    const user = useAppSelector(state => state.user);
    const navigation = useNavigation();

    function goToStretchWorkout() {
        navigation.navigate('WatchWorkout', { ...stretchingWorkout });
    }

    function goToWarmup(type: WorkoutsTypes) {
        const warmup = getWarmup(type);
        navigation.navigate('WatchWorkout', { ...warmup });
    }

    function getWarmup(
        type: WorkoutsTypes,
    ): {
        title: string;
        type: WorkoutsTypes;
        description: string;
    } {
        if (type === 'legs' || type === 'glutes' || type === 'legs_glutes') {
            return {
                title: 'Calentamiento del tren inferior',
                type: 'lower_warmup',
                description: 'Calentamiento del tren inferior',
            };
        } else if (type === 'arms' || type === 'chest') {
            return {
                title: 'Calentamiento del tren superior',
                type: 'upper_warmup',
                description: 'Calentamiento del tren superior',
            };
        } else {
            return {
                title: 'Calentamiento general',
                type: 'general_warmup',
                description: 'Calentamiento general',
            };
        }
    }

    return (
        <View style={styles.dayGrap} key={index}>
            <Text style={styles.dayLabel}>{dayName}</Text>
            {dayName === 'hoy' ? (
                <Text style={styles.message}>{`${getCoachMessage(
                    'greeting',
                    user,
                )}, este es tu entrenamiento para hoy:`}</Text>
            ) : item[0].type === 'expired' ? (
                <Text style={styles.message}>{`Sesión de entrenamiento expirada`}</Text>
            ) : null}
            {item.map((val, i: number) => {
                if (val.type === 'rest') {
                    return <Rest key={i} />;
                } else if (val.type === 'expired') {
                    return <ExpiredSession key={i} />;
                } else {
                    return (
                        <View key={i}>
                            <View style={styles.workoutGrap}>
                                <Pressable
                                    android_ripple={androidRipple}
                                    onPress={() => goToWarmup(val.workout.type)}>
                                    <View style={styles.btnGrap}>
                                        <View style={styles.workoutInfo}>
                                            <Text style={styles.title}>{`${getWarmup(val.workout.type).title
                                                }`}</Text>
                                        </View>
                                        <Icon
                                            name={'chevron-forward-outline'}
                                            size={25}
                                            color={'black'}
                                        />
                                    </View>
                                </Pressable>
                            </View>

                            <Workout val={val} />
                            {/**Entrenamiento de piernas */}

                            <View style={styles.workoutGrap}>
                                <Pressable
                                    android_ripple={androidRipple}
                                    onPress={goToStretchWorkout}>
                                    <View style={styles.btnGrap}>
                                        <View style={styles.workoutInfo}>
                                            <Text style={styles.title}>
                                                {stretchingWorkout.title}
                                            </Text>
                                            {/* <Text style={styles.desc} numberOfLines={1}>
                                                    {stretchingWorkout.description}
                                                </Text> */}
                                        </View>
                                        <Icon
                                            name={'chevron-forward-outline'}
                                            size={25}
                                            color={'black'}
                                        />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    );
                }
            })}
            {dayName === 'hoy' ? <ContactAsesor label={'Necesitas algo?'} text={'Cuéntanos como podemos mejorar la app'} /> : null}

            <View style={styles.bottomSpace} />
        </View>
    );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
    const { index } = nextProps;
    const { index: prevIndex } = prevProps;

    const isSelectedEqual = prevIndex === index;
    return isSelectedEqual;
};

export default React.memo(Day, areEqual);

const styles = StyleSheet.create({
    dayGrap: {
        width: itemWidth,
        padding: 20,
    },
    dayLabel: {
        fontSize: 16,
        fontFamily: roboto.regular,
        color: 'black',
        paddingBottom: 10,
        lineHeight: 18,
    },
    message: {
        fontSize: 26,
        fontFamily: roboto.regular,
        marginBottom: 20,
    },
    warmup: {
        backgroundColor: '#f0f1f3',
        borderRadius: 8,
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontFamily: roboto.bold,
        color: 'black',
        width: Common.width - 80,
        fontSize: 18,
    },
    desc: {
        fontSize: 16,
        color: 'black',
        width: Common.width - 120,
    },
    btnGrap: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bntContentGrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workoutGrap: {
        // borderWidth: 1,
        // borderColor: '#f0f1f3',
        backgroundColor: '#f0f1f3',
        borderRadius: 8,
        marginBottom: 10,
    },
    workoutInfo: {
        width: Common.width - 120,
    },
    bottomSpace: {
        height: 90,
        width: 100,
    }
});
