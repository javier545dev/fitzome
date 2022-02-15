import React from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions, StatusBar, } from 'react-native';

import { roboto, colors, } from 'styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Props {
    title: string;
}

export default ({ title }: Props) => {

    const navigation = useNavigation();

    const goBack = () => navigation.goBack();

    return (
        <View style={styles.grap}>
            <Pressable onPress={goBack} testID='sub-header-back-btn'>
                <View style={styles.backBtn}>
                    <Icon size={30} color={'black'} name={'arrow-back-outline'} />
                </View>
            </Pressable>
            <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    grap: {
        backgroundColor: 'white',
        width,
        height: 55,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: StatusBar.currentHeight ?? 0,
        zIndex: 1,
        flexDirection: 'row',
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth: 1,
    },
    backBtn: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: roboto.medium,
        fontSize: 22,
        lineHeight: 22,
        marginLeft: 10,
        width: width - 130,
    },
});