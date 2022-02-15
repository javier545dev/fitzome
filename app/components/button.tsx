import * as React from 'react';
import {
    StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableNativeFeedback
} from 'react-native';

import { roboto, colors } from '@styles/index';
import * as Common from 'common';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type ButtonProps = {
    label: string;
    callback: () => void;
    disabledCallback: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, callback, disabledCallback, disabled = false, loading = false }) => {

    return (
        <LinearGradient
            colors={['rgba(250,250,250,0)', 'rgba(250,250,250,1)', 'white']}
            style={styles.buttonGradientGrap}
        >
            <TouchableNativeFeedback onPress={disabled ? disabledCallback : callback} disabled={loading}>
                <View style={{
                    ...styles.buttonGrap,
                    backgroundColor: disabled ? colors.secondary : colors.primary_blue,
                }}>
                    {
                        loading
                            ?
                            <ActivityIndicator color={disabled ? 'black' : 'white'} size={'large'} />
                            :
                            <Text
                                style={{
                                    ...
                                    styles.buttonLabel,
                                    color: disabled ? 'rgba(0,0,0,.4)' : 'white',
                                }}
                            >
                                {label}
                            </Text>
                    }
                </View>
            </TouchableNativeFeedback>
        </LinearGradient>
    );
}

export const BackButton: React.FC = () => {

    const navigation = useNavigation();
    function goBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.backButtonGrap}>
            <TouchableNativeFeedback onPress={goBack}>
                <View style={styles.backButton}>
                    <Icon size={25} color={'black'} name={'arrow-back-outline'} />
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonGradientGrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Common.width,
        height: 70,
        alignItems: 'center',
        paddingBottom: 10,
    },
    buttonGrap: {
        backgroundColor: colors.primary_blue,
        borderRadius: 50,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        width: Common.width - 40,
    },
    buttonLabel: {
        fontSize: 18,
        color: 'white',
        fontFamily: roboto.bold,
    },
    backButtonGrap: {
        position: 'absolute',
        left: 20,
        top: (StatusBar.currentHeight ?? 30) + 10,
        zIndex: 100,
    },
    backButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
    },
})