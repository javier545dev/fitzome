import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import * as Common from 'common'
import { setStorageValue, getStoragedValue } from '@storage/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default () => {

    const [point, setPoint] = React.useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        checkIfButtonWasPressed();
    }, [])

    async function checkIfButtonWasPressed() {
        try {
            const value = await getStoragedValue('chat_pressed');
            if (!value) setPoint(true);
        } catch (error) { }
    }

    async function _onPress() {
        try {
            Common.logEvent('COACH_CHAT_PRESSED')
            if (point) {
                await setStorageValue('chat_pressed', 'pressed');
            }
            navigation.navigate('Chat');
        } catch (error) {

        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => _onPress()}>
                <View style={styles.button}>
                    <Icon name={"mail-outline"} size={26} color={'black'} />
                </View>
                {
                    point ? <View style={styles.point}>
                        <Text style={styles.messages}>1</Text>
                    </View> : null
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    point: {
        height: 15,
        width: 15,
        borderRadius: 50,
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        top: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messages: {
        fontSize: 9,
        color: 'white'
    }
});
