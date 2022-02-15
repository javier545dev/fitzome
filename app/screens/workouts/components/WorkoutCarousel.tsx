import React from 'react';
import { View, FlatList, StyleSheet, } from 'react-native';

import { roboto } from 'styles';
import { WorkoutsTypes } from '../actions/workout';
import { useAppSelector } from 'redux/hooks';
import WorkoutCard from './WorkoutMuscleCard';
import Label from 'components/Label'

interface Props {
    items: Array<{
        type: WorkoutsTypes,
        level: number,
        title: string
    }>;
    label: string;
}

interface ItemProps {
    index: number,
    item: {
        type: WorkoutsTypes,
        level: number,
        title: string
    }
}

export default function WorkoutCarousel({ items, label }: Props) {

    const user = useAppSelector(state => state.user)

    const Workout = ({ item, index }: ItemProps) => <WorkoutCard key={index} {...{ user, item }} />;

    // const labelCorrected = correctLabel(label, user.gender);

    // function correctLabel(txt: string, gender: number): string {
    //     if (txt === 'Pecho y brazos') {
    //         if (gender === 1) {
    //             return txt;
    //         } else {
    //             return 'Tonificar brazos';
    //         }
    //     } else {
    //         return txt;
    //     }
    // }

    return (
        <>
            <Label label={label} />
            <FlatList
                horizontal={true}
                style={styles.flatlist}
                showsHorizontalScrollIndicator={false}
                data={items}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                scrollEventThrottle={16}
                scrollEnabled={true}
                removeClippedSubviews={true}
                renderItem={Workout}
                onEndReachedThreshold={.1}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (<View style={styles.emptySpace} />)}
                ListFooterComponent={() => (<View style={styles.emptySpace} />)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    flatlist:{
        marginBottom: 20, 
        marginTop: 20,
    },
    label: {
        padding: 20,
        fontSize: 18,
        fontFamily: roboto.medium,
        lineHeight: 18,
    },
    emptySpace:{
        height: 30, 
        width: 20,
    },
});

