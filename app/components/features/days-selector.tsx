import * as React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';

import { colors, roboto } from '@styles/index';

import { shortDaysNames } from '../../actions';
import PlanContext from '../../screens/plans/context/';

import { BlankSpace } from '@components/spacing';

const { width } = Dimensions.get('window');

/**
 * TO DO:
 * Check consecutive days
 */

interface Props {
    sessionsPerWeek: number;
}

export const coundDaysSelected = (arr: number[]): number => {
    let x = 0;
    arr.forEach(val => {
        if (val === 1) x += 1;
    });
    return x;
};

export default function DaysSelector({ sessionsPerWeek }: Props) {
    const { state, dispatch } = React.useContext(PlanContext);
    const { days } = state;

    function selectDays(index: number): void {
        let temp = [...days];

        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const daysSelected = coundDaysSelected(temp);

            if (i === index) {
                if (day === 0) {
                    if (daysSelected < sessionsPerWeek) {
                        temp[i] = 1;
                    }
                } else {
                    temp[i] = 0;
                }
            }
        }

        dispatch({ type: 'UPDATE_DAYS', payload: temp });
    }

    return (
        <View>
            <BlankSpace size={'m'} />
            <View style={styles.grap}>
                {days.map((val, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => selectDays(index)}>
                            <View style={val === 0 ? styles.day : styles.daySelected}>
                                <View style={val === 0 ? styles.noSelected : styles.selected} />
                                <Text
                                    style={val === 0 ? styles.label : styles.labelSelected}>{`${shortDaysNames[index]
                                        }`}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    grap: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 15,
    },
    day: {
        width: width / 7 - 10,
        marginRight: 5,
        backgroundColor: '#f3f3f3',
        height: 70,
        alignItems: 'center',
        borderRadius: 4,
    },
    daySelected: {
        width: width / 7 - 10,
        marginRight: 5,
        backgroundColor: colors.primary_blue,
        height: 70,
        alignItems: 'center',
        borderRadius: 4,
    },
    selected: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginBottom: 12,
        marginTop: 12,
        backgroundColor: 'white',
    },
    noSelected: {
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 12,
        marginTop: 12,
    },
    labelSelected: {
        fontFamily: roboto.regular,
        fontSize: 15,
        color: 'white',
    },
    label: {
        fontFamily: roboto.regular,
        fontSize: 15,
        color: 'black',
    },
});
