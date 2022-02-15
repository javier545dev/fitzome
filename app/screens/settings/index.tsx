import * as React from 'react';
import { StyleSheet, View, ScrollView, Switch, Text } from 'react-native';

import { roboto, colors } from 'styles';
import * as Common from 'common';
/**
 * Redux
 */
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { updateUser, UserState } from 'redux/slices/userSlice';
/**
 * External libraries
 */
import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import { setStorageValue, } from 'local_storage';
import { Picker } from '@react-native-picker/picker';
/**
 * Componenets
 */
import SubHeader from 'components/subHeader';
import TransparentStatusBar from 'components/CustomStatusbar';
import Label from 'components/Label';

const crunchesArr = new Array(50).fill(0);
const pushupsArr = new Array(50).fill(0);

export default function SettingsScreen() {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    //console.log(`%c ♻ render was called on page ${page}`, 'color: green');

    function updateJumps() {
        const newUser = {
            ...user,
            training_info: {
                ...user.training_info,
                jumps: !user.training_info.jumps,
            }
        }
        saveUser(newUser);
    }

    function updateCrunch() {
        const newUser = {
            ...user,
            training_info: {
                ...user.training_info,
                crunch: !user.training_info.crunch,
            }
        }
        saveUser(newUser);
    }

    function updateNumberOfPushups(pushUps: any) {
        const newUser = {
            ...user,
            training_info: {
                ...user.training_info,
                pushUps: Number(pushUps),
            }
        }
        saveUser(newUser);
    }

    function updateNumberOfCrunches(crunches: any) {
        const newUser = {
            ...user,
            training_info: {
                ...user.training_info,
                crunches: Number(crunches),
            }
        }
        saveUser(newUser);
    }

    function saveUser(newUser: UserState) {
        dispatch(updateUser(newUser));
        NetInfo.fetch().then(s => {
            if (s.isConnected && s.isInternetReachable) {
                saveOnline(newUser);
            } else {
                Common.showToast('No hay conexión a internet');
                saveLocally(newUser);
            }
        });
    }

    function saveOnline(newUser: UserState) {
        const ref = database().ref();
        let updates: any = {};
        updates[`_users_/${newUser.id}/account/`] = newUser;
        ref
            .update(updates)
            .then(responde => { })
            .catch(e => {
                Common.showToast(`${e}`);
            });
        saveLocally(newUser);
    }

    async function saveLocally(newUser: UserState) {
        try {
            await setStorageValue('user_info', newUser);
            Common.showToast('Tu información se guardó exitosamente');
        } catch (error) { }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TransparentStatusBar color={'white'} />
                <SubHeader title={'Configuración'} />
                <View style={{ height: 80 }} />
                <Label label={'Entrenamiento'} />
                <Text style={styles.label}>Incluir</Text>
                <View style={styles.switchGrap}>
                    <Text style={styles.switchLabel}>Saltos</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={user.training_info?.jumps ? colors.primary : "#f4f3f4"}
                        onValueChange={updateJumps}
                        value={user.training_info.jumps}
                    />
                </View>
                <View style={styles.switchGrap}>
                    <Text style={styles.switchLabel}>Flexiones abdominales</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={user.training_info?.crunch ? colors.primary : "#f4f3f4"}
                        onValueChange={updateCrunch}
                        value={user.training_info?.crunch}
                    />
                </View>
                <Text style={styles.label}>Forma física</Text>
                <View style={styles.switchGrap}>
                    <Text style={styles.switchLabel}>Cuántas flexiones puedes hacer?</Text>
                    <Picker
                        selectedValue={`${user.training_info.pushUps}`}
                        style={styles.picker}
                        onValueChange={(val, i) => updateNumberOfPushups(val)}
                        itemStyle={{ fontSize: 18, width: 100, }}
                    >
                        {pushupsArr.map((val, i) => {
                            return <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />;
                        })}
                    </Picker>
                </View>
                <View style={styles.switchGrap}>
                    <Text style={styles.switchLabel}>Cuántas abdominales puedes hacer?</Text>
                    <Picker
                        selectedValue={`${user.training_info.crunches}`}
                        style={styles.picker}
                        onValueChange={(val, i) => updateNumberOfCrunches(val)}
                        itemStyle={{ fontSize: 18, width: 100, }}
                    >
                        {crunchesArr.map((val, i) => {
                            return <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />;
                        })}
                    </Picker>
                </View>
                <View style={styles.blankSpace} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 16,
        fontFamily: roboto.bold,
        padding: 20,
        paddingBottom: 0,
        color: 'rgba(0,0,0,.7)',
    },
    switchGrap: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchLabel: {
        fontSize: 18,
        fontFamily: roboto.regular,
        width: (Common.width / 2),
    },
    picker: {
        width: 100,
    },
    blankSpace: {
        width: Common.width,
        height: 100,
    },
});
