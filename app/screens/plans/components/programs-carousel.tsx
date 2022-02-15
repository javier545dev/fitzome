import * as React from 'react';
import { View, FlatList } from 'react-native';

import { PlansInterface } from '../plans';
import Plan from './plan-item-carousel';
import * as Common from 'common';

const itemHeight = Common.height * 0.25;

interface Props {
    plans: PlansInterface[];
}

interface ItemProps {
    index: number;
    item: PlansInterface;
}

export default function PlansCarousel({ plans }: Props): JSX.Element {
    const renderPlan = ({ item, index }: ItemProps) => <Plan {...{ item, index }} />;

    return (
        <FlatList
            style={{ marginBottom: 20 }}
            data={plans}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            removeClippedSubviews={true}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            scrollEventThrottle={16}
            renderItem={renderPlan}
            onEndReachedThreshold={0.1}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => (
                <View style={{ height: itemHeight, width: 20 }} />
            )}
            ListFooterComponent={() => (
                <View style={{ height: itemHeight, width: 20 }} />
            )}
        />
    );
}
