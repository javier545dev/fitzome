import React, { useEffect, useRef, useContext, useState, } from 'react';
import { Dimensions, FlatList, } from 'react-native';

import { colors } from 'styles';
import CoachContext from '../context';

import Day from './calendar-day';

const { width, } = Dimensions.get('window');
const itemWidth = width / 7;

type Props = {
    days: any[],
    startDate: Date,
}

export default ({ days, startDate, }: Props) => {

    const { dispatch, } = useContext(CoachContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const flatList = useRef<FlatList>(null);
    useEffect(() => {
        scrollToToday()
    }, [])

    function scrollToToday() {
        /** DATE NEED TO BE ISO FORMAT '2015-03-25'*/
        const b = new Date();
        const d = new Date(startDate);
        const oneDay = 1000 * 60 * 60 * 24;
        //today label
        const todayDate = `${b.getFullYear()}-${b.getMonth()}-${b.getDate()}`;
        //user start label
        const _startDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        //set dates
        const today = new Date(todayDate).valueOf();
        const start = new Date(_startDate).valueOf();
        //get day differences
        if (todayDate != _startDate) {
            const daysFromStartDate = today - start;
            const daysToScroll = Math.round(daysFromStartDate / oneDay);
            onPressDay(daysToScroll);
        }
    }

    function onPressDay(i: number) {
        const daysLength = days.length - 1; //revisar el index no sea mayor a 27;
        const index = i > daysLength ? daysLength : i < 0 ? 0 : i;
        const indexVal = index ? index : 0;
        if (flatList.current) {
            flatList.current.scrollToIndex({ index: indexVal });
            setCurrentIndex(indexVal);
            setTimeout(() => {
                dispatch({ type: 'UPDATE_INDEX', payload: indexVal })
            }, 50);
        }
    }

    function renderDay(item: any[], index: number,): JSX.Element {
        return (
            <Day
                {...{ item, index, currentIndex, startDate, callback: () => onPressDay(index) }}
            />
        )
    }

    //console.log(`******** render on carousel********`)

    return (
        <FlatList
            ref={flatList}
            style={{
                borderBottomColor: colors.backgroundGray,
                borderBottomWidth: 1,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={days}
            initialNumToRender={7}
            maxToRenderPerBatch={7}
            scrollEventThrottle={16}
            scrollEnabled={true}
            removeClippedSubviews={true}
            renderItem={({ item, index }) => renderDay(item, index)}
            onEndReachedThreshold={.1}
            keyExtractor={(item, index) => index.toString()}
            //onScrollToIndexFailed={() => console.log('fail')}
            pagingEnabled={true}
            getItemLayout={(data, index) => (
                { length: itemWidth, offset: itemWidth * index, index }
            )}
        />
    );
}