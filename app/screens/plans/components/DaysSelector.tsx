import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import * as Common from 'common';
import { colors, roboto } from '@styles/index';
import { shortDaysNames } from '../../../actions';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { updateTrainingDays } from 'redux/slices/plansSlice';
import { BlankSpace } from '@components/spacing';

// revisar que no se seleccionen dias consecutivos
type Props = {
    sessionsPerWeek: number;
};

const dayWidth = Common.width / 7 - 10;

export default function DaysSelector({ sessionsPerWeek }: Props) {
    const dispath = useAppDispatch();
    const days = useAppSelector(state => state.plans.planConfig.days);

    const coundDaysSelected = (arr: number[]): number => {
        let x = 0;
        /**
         * Cound selected days
         */
        arr.forEach(val => {
            if (val === 1) x += 1;
        });
        return x;
    };

    function selectDays(index: number): void {
        /** */
        let temp = [...days];
        /**
         * Loop days
         */
        for (let i = 0; i < temp.length; i++) {
            /**
             * Get day
             */
            const day = temp[i];
            const daysSelected = coundDaysSelected(temp);
            /**
             * Check if day was selected
             */
            if (i === index) {
                /**
                 * Check if day was no selected => [1]
                 */
                if (day === 0) {
                    /**
                     * Check if still no pass the limit of
                     * training days
                     */
                    if (daysSelected < sessionsPerWeek) {
                        /***
                         * Select days
                         */
                        temp[i] = 1;
                    }
                } else {
                    /**
                     * Unselect days
                     */
                    temp[i] = 0;
                }
            }
        }
        /**
         * updateTraingDays
         */
        dispath(updateTrainingDays(temp));
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
        width: dayWidth,
        marginRight: 5,
        backgroundColor: '#f3f3f3',
        height: 70,
        alignItems: 'center',
        borderRadius: 4,
    },
    daySelected: {
        width: dayWidth,
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
