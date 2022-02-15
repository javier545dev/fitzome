import * as React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import { colors } from 'styles';
//import * as Common from 'common';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatHeader() {
    const navigation = useNavigation();

    function goBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={goBack}>
                <View style={styles.backBtn}>
                    <Icon size={30} color={'black'} name={'arrow-back-outline'} />
                </View>
            </Pressable>
            <Image
                source={require('../../../../resources/media/branding/fitzome.png')}
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingRight: 20,
        backgroundColor: 'white',
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 584 * 0.2,
        height: 126 * 0.2,
    },
    backBtn: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
