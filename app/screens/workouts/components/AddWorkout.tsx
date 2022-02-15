import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function AddWorkout() {
    const navigation = useNavigation();

    function goToCoach() {
        navigation.navigate('Chat');
    }

    return (
        <TouchableOpacity onPress={goToCoach}>
            <View style={styles.grap}>
                <Icon name={'add-circle-outline'} size={26} color={'black'} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnGrap: {
        margin: 20,
        marginTop: 10,
    },
    grap: {
        width: 60,
        height: 60,
        borderRadius: 16,
        borderColor: 'rgba(0,0,0,.4)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
