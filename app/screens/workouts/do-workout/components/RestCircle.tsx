import * as React from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';

import { lightTheme, roboto } from 'styles';
const { width } = Dimensions.get('window');

export default function RestCircle() {

    const [label, setLabel] = React.useState('Inhala');

    const scale = React.useRef(new Animated.Value(0)).current;
    //const scale = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        animateCircle(true);
        return () => {
            scale.stopAnimation(() => { });
        }
    }, [])

    function animateCircle(out: boolean) {
        setLabel(out ? 'Inhala' : 'Exhala')
        Animated.timing(scale, {
            toValue: out ? 1.2 : 1,
            duration: 2500,
            useNativeDriver: true,
        }).start(() => {
            animateCircle(!out);
        });
    }

    return (
        <View style={{
            width: width * .66,
            height: (width * .66) * 1.2,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Animated.View style={{ ...styles.relaxCircle, transform: [{ scale }] }}>
                <Text style={styles.label}>{label}</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    relaxCircle: {
        width: width * .66,
        height: width * .66,
        borderRadius: (width * .66) / 2,
        borderWidth: 2,
        borderColor: lightTheme.blueGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: lightTheme.secondaryText,
        fontFamily: roboto.medium,
        fontSize: 18,
    }
});