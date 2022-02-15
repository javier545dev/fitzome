import * as React from 'react';
import { FlatList, View, Text, } from 'react-native';

import * as Common from 'common';
import CoachContext from '../context';
import Day from './DayActivities';

const itemWidth = Common.width;

type Props = {
    startDate: Date,
    days: any[],
}

export default function ActivitiesCarousel({ days, startDate, }: Props) {

    const { state, } = React.useContext(CoachContext);
    const { currentIndex, } = state;
    const flatList = React.useRef<FlatList>(null);

    React.useEffect(() => {
        if (flatList.current) {
            flatList.current.scrollToIndex({ index: currentIndex });
        }
    }, [currentIndex]);

    function renderDay(item: any[], index: number, startDate: Date): JSX.Element {
        return (
            <View key={index}>
                <Day {...{ item, index, startDate, }} />
            </View>
        )
    }

    return (
        <FlatList
            ref={flatList}
            // style={styles.flatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pagingEnabled={true}
            data={days}
            initialNumToRender={7}
            maxToRenderPerBatch={7}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => renderDay(item, index, startDate)}
            onEndReachedThreshold={.1}
            keyExtractor={(item, index) => index.toString()}
            // onScrollToIndexFailed={() => console.log('fail')}
            getItemLayout={(data, index) => (
                { length: itemWidth, offset: itemWidth * index, index }
            )}
        />
    );
}