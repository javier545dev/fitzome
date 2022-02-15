import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, } from 'react-native';

import { roboto, colors, } from 'styles';
import { getDayName } from '../actions';

const { width } = Dimensions.get('window');
const itemWidth = (width / 7) - 4;
const calendarDay = itemWidth - 10;

type Props = {
    callback: () => void;
    index: number;
    currentIndex: number;
    item: any[];
    startDate: Date;
}

function Day({ callback, index, startDate, item, currentIndex, }: Props): JSX.Element {

    const dayName = getDayName(startDate, index);
    const tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + index);
    const dateNumber = tempDate.getDate();

    // console.log('RENDER ITEM: ', { index, currentIndex });


    return (
        <TouchableOpacity key={index} onPress={callback}>
            <View style={styles.day}>
                <Text style={styles.label}>{dayName}</Text>
                <Text style={
                    currentIndex === index ? styles.dayLabelSelected :
                        item[0].type === 'rest' ? styles.dayWithoutActivity :
                            item[0].type === 'expired' ? styles.dayExpired :
                                styles.dayWithActivity
                }
                >
                    {`${dateNumber}`}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const areEqual = (prevProps: Props, nextProps: Props) => {
    const { currentIndex: nextCurrentIndex, index: nextIndex } = nextProps;
    const { currentIndex, index } = prevProps;

    // const isSelectedEqual = currentIndex != index;
    //check item was selected
    const wasSelected = currentIndex === index;
    //check if item will be selected
    const willBeSelected = nextCurrentIndex === nextIndex;
    //
    const needRender = !(wasSelected || willBeSelected);
    // console.log('...................')
    // console.log('index:: ', index);
    // console.log({ wasSelected, willBeSelected })
    // console.log('need render: ', !needRender)
    // console.log('...................')
    /*if true i wont update */
    return needRender;
};

export default React.memo(Day, areEqual);

const styles = StyleSheet.create({
    day: {
        width: itemWidth,
        marginLeft: 2,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    label: {
        fontFamily: roboto.regular,
        fontSize: 15,
        color: '#848d9f',
        paddingBottom: 8,
    },
    dayLabelSelected: {
        paddingVertical: 5,
        borderRadius: 8,
        width: calendarDay,
        textAlign: 'center',
        fontFamily: roboto.medium,
        fontSize: 18,
        color: 'white',
        backgroundColor: colors.primary_blue,
    },
    dayWithoutActivity: {
        paddingVertical: 5,
        borderRadius: 8,
        width: calendarDay,
        textAlign: 'center',
        fontFamily: roboto.medium,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#E8EAED',
        color: 'black',
    },
    dayExpired: {
        paddingVertical: 5,
        borderRadius: 8,
        width: calendarDay,
        textAlign: 'center',
        fontFamily: roboto.medium,
        fontSize: 18,
        color: 'black',
        backgroundColor: '#E8EAED',
    },
    dayWithActivity: {
        paddingVertical: 5,
        borderRadius: 8,
        width: calendarDay,
        textAlign: 'center',
        fontFamily: roboto.medium,
        fontSize: 18,
        // color: 'white',
        // backgroundColor: '#5dd092',
        color: colors.primary_blue,
        borderWidth: 1,
        borderColor: colors.primary_blue,// '#E8EAED'
    },
});