import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import { roboto, colors } from 'styles';
/**
 * Redux
 */
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
    updateWorkoutFeedback,
    workoutFeedbackModal,
    showFinalModal,
} from 'redux/slices/doWorkoutSlice';
import Modal from 'react-native-modal';

export default function GiveWorkoutFeedback() {
    const dispatch = useAppDispatch();
    const giveFeedbackModal = useAppSelector(
        state => state.doWorkout.giveFeedbackModal,
    );

    function setDificulty(value: 1 | 2 | 3 | 4 | 5) {
        dispatch(updateWorkoutFeedback(value));
        dispatch(workoutFeedbackModal(false));
        setTimeout(() => {
            dispatch(showFinalModal(true));
        }, 500);
    }

    return (
        <Modal
            isVisible={giveFeedbackModal}
            backdropOpacity={0.2}
            style={styles.modal}
            propagateSwipe={true}>
            {/* <ScrollView> */}
            <View style={styles.header}>
                <Image
                    source={require('../../../../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.scrollView}>
                <Text style={{ ...styles.bigLabel, marginBottom: 20 }}>
                    {`Bien hecho, Como estuvo el entrenamiento?`}
                </Text>
                <TouchableOpacity onPress={() => setDificulty(1)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Muy fácil</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={styles.activeBall} />
                            <View style={styles.inactiveBall} />
                            <View style={styles.inactiveBall} />
                            <View style={styles.inactiveBall} />
                            <View style={styles.inactiveBall} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDificulty(2)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Fácil</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.inactiveBall} />
                            <View style={styles.inactiveBall} />
                            <View style={styles.inactiveBall} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDificulty(3)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Estuvo bien</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.inactiveBall} />
                            <View style={styles.inactiveBall} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDificulty(4)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Difícil</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.inactiveBall} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDificulty(5)}>
                    <View style={styles.btnGrap}>
                        <Text style={styles.btnLabel}>Muy Difícil</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                            <View style={styles.activeBall} />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.smallLabel,
                        color: 'rgba(0,0,0,.7)',
                        paddingTop: 20,
                    }}>
                    Tu respuesta nos ayudará a adaptar tus entrenamientos.
                </Text>
            </View>
            {/* </ScrollView> */}
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomColor: colors.backgroundGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    logo: {
        width: 584 * 0.2,
        height: 126 * 0.2,
    },
    scrollView: {
        backgroundColor: 'white',
        padding: 20,
    },
    bigLabel: {
        fontSize: 24,
        color: 'black',
        lineHeight: 26,
        fontFamily: roboto.medium,
    },
    smallLabel: {
        fontSize: 16,
        color: 'black',
        fontFamily: roboto.regular,
        paddingBottom: 10,
        paddingTop: 10,
    },
    btnGrap: {
        backgroundColor: '#f3f3f3',
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    btnLabel: {
        fontSize: 16,
        fontFamily: roboto.medium,
    },
    activeBall: {
        width: 7,
        height: 7,
        borderRadius: 7,
        marginRight: 2,
        backgroundColor: 'black',
    },
    inactiveBall: {
        width: 7,
        height: 7,
        borderRadius: 7,
        marginRight: 2,
        backgroundColor: 'rgba(0,0,0,.2)',
    },
});
