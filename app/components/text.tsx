import React from 'react';
import { StyleSheet, Text, } from 'react-native';

import { roboto, } from 'styles';

type TextProps = {
    children: React.ReactNode;
    variant?: 'h1' | 'label' | 'small-p';
    color?: string;
}

const CustomText: React.FC<TextProps> = ({ children, variant = 'p', color = 'black' }) => (
    <Text
        style={
            variant === 'h1' ? { ...styles.title, color } :
                variant === 'label' ? { ...styles.label, color } :
                    variant === 'small-p' ? { ...styles.bodySmall, color } :
                        { ...styles.body, color }
        }
    >
        {children}
    </Text>
);

export default CustomText;


const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 20,
        fontSize: 18,
        lineHeight: 24,
        fontFamily: roboto.regular,
    },
    bodySmall: {
        fontSize: 15,
        fontFamily: roboto.regular,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        //lineHeight: 42,
        paddingHorizontal: 20,
        fontFamily: roboto.medium,
    },
    label: {
        fontSize: 24,
        paddingHorizontal: 20,
        fontFamily: roboto.medium,
    },
})