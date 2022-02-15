import React from 'react';
import { TouchableOpacity, Linking, Text, StyleSheet, View } from 'react-native';

import { roboto } from 'styles';
import locales from 'locales';

const { screens } = locales();

export default function PrivacyAndTerms() {

    const goToPrivacyTerms = () => Linking.openURL('https://www.fitzome.com.mx/privacy-policy/');

    return (
        <View style={styles.policyGrap}>
            <Text testID='terms1-label' style={styles.text}>{screens.initialScreen.terms1} </Text>
            <TouchableOpacity onPress={goToPrivacyTerms}>
                <Text testID='terms2-label' style={styles.textUnderline}>{screens.initialScreen.terms2}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    policyGrap: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 13,
        color: 'black',
        fontFamily: roboto.regular,
    },
    textUnderline: {
        fontSize: 13,
        color: 'black',
        fontFamily: roboto.regular,
        textDecorationLine: 'underline',
    },
});
