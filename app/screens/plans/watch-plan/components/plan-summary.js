import React from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import { roboto } from '../../../../styles';
import { exercises } from '../../../../../resources/data/exercises';

import { useNavigation } from '@react-navigation/native';

const { width, } = Dimensions.get('window');

export default ({ workouts, i, user }) =>{

    const navigation = useNavigation();

    function getSets(val){
        let tempSets = [];
        for (let i = 0; i < val.length; i++) {
            const round = val[i];
            let tempRound = [];
            for (let z = 0; z < round.length; z++) {
                const e = round[z];
                const exercise = findExerciseById(e.key);
                tempRound.push({...exercise, volume_amount: e.volume });
            }
            tempSets.push(tempRound);
        }
        return tempSets;
    }

    function findExerciseById(key){
        for (let i = 0; i < exercises.length; i++) {
            const exercise = exercises[i];
            if(key === exercise.key){
                return exercise;
            }
        }
    }

    /* REVISAR QUE ES EL TYPE */
    const Workout = ({ item, i }) => {
        const sets = getSets(item.rounds);
        //console.log(sets);
        return (
            <TouchableOpacity key={i}
                onPress={()=> navigation.navigate('WatchWorkout', { 
                    sets: JSON.stringify(sets), title: item.title, 
                    workout_description: item.description, type: item.type, workoutKey: item.date,
                    level: 2,
                })}
            >
                <View style={styles.workout}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };
    
    return(
        <View style={{ paddingBottom:0, paddingTop:20, }}>
            <Text style={styles.label}>{`Semana ${i+1}`}</Text>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={workouts}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                scrollEventThrottle={16}
                scrollEnabled={true}
                removeClippedSubviews={true}
                renderItem={Workout}
                onEndReachedThreshold={.1}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={()=>( <View style={{height: 30, width:20, }}/>)}
                ListFooterComponent={()=>(<View style={{height:30, width:20, }}/>)}
            />
        </View> 
    );
}


const styles = StyleSheet.create({
    label:{
        paddingLeft:20,
        paddingBottom:10, 
        fontFamily: roboto.medium, 
        fontSize: 16, 
    },
    workout:{
        width: width/2,
        marginRight:10, 
        backgroundColor: '#f3f3f3',
        padding:20, 
        borderRadius:8, 
    },
    title:{
        fontSize: 16,
        fontFamily: roboto.medium,
        color:'black',
    },
});