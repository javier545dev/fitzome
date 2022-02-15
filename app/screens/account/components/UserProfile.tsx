import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Pressable,
} from 'react-native';

import * as Common from 'common';
import { roboto } from 'styles';
import { getTMR, calculateImc, getGTE } from '../actions';
/**
 * Redux
 */
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { UserState, updateUser } from 'redux/slices/userSlice';
/**
 * Components
 */
import { setStorageValue, getStoragedValue } from 'local_storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';
import Recomendations from './CustomRecomendations';
import Modal from '../../../components/bottom-modal';
import TMBExplanation from './TMBexplanation';
import ImcExplanation from './ImcExplanation';
import FitzomeId from './FitzomeId';
import AddWorkout from 'screens/workouts/components/AddWorkout';

const weightArr = new Array(160).fill(0);
const heightArr = new Array(80).fill(0);
const androidRipple = { color: 'rgba(0,0,0,.1)', borderless: true };

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user);
  const [modal, setModal] = React.useState(false);
  const [message, setMessage] = React.useState({ danger: false, message: '' });
  const [imc, setImc] = React.useState(0);
  const [tmr, setTmr] = React.useState(0);
  const [gte, setGte] = React.useState(0);
  const [explication, showExplication] = React.useState(0);
  const [customWorkout, setCustomWorkout] = React.useState<{
    type: string;
    level: number;
    title: string;
    custom: boolean;
  }>({ type: '', level: 0, title: '', custom: false });

  useFocusEffect(
    React.useCallback(() => {
      getCustomCoachTraining();
    }, []),
  );

  async function getCustomCoachTraining() {
    try {
      const customWorkout = await getStoragedValue('coach_custom_training');
      if (customWorkout) {
        setCustomWorkout(customWorkout);
      }
    } catch (error) { }
  }

  React.useEffect(() => {
    //console.log('init user profile');
    setInfo();
  }, [user]);

  function setInfo() {
    getMessage();
    const tempTmr = getTMR(user);
    const tempGte = getGTE(user);
    setGte(tempGte);
    setTmr(tempTmr);
  }

  function getMessage() {
    let _message = {
      danger: false,
      message: '',
    };
    const idealWeigth = user.height - 100;
    const imc = calculateImc(user);
    /**
     * Get message
     */
    if (imc < 18.5) {
      _message.danger = true;
      _message.message = `Parece que estas ${idealWeigth -
        user.weight} kg debajo de tu peso ideal.`;
    } else if (imc >= 25) {
      _message.danger = true;
      _message.message = `Parece que estas ${user.weight -
        idealWeigth} kg sobre tu peso ideal.`;
    } else {
      _message.danger = false;
      _message.message = `Excelente, tu peso parece normal.`;
    }
    setMessage(_message);
    setImc(imc);
  }

  const showModal = (val: number) => {
    showExplication(val);
    setModal(!modal);
  };

  function updateWeight(val: any) {
    const weight = Number(val);
    const u = { ...user, weight };
    dispatch(updateUser(u));
    saveInfo(u);
  }

  function updateHeight(val: any) {
    const height = Number(val);
    const u = { ...user, height };
    dispatch(updateUser(u));
    saveInfo(u);
  }

  function saveInfo(newUser: UserState) {
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

  function goToCustomWorkout() {
    const { title, type, custom } = customWorkout;
    navigation.navigate('WatchWorkout', {
      title,
      description: 'Entrenamiento creado por tu entrenador personal.',
      type,
      custom,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerGrap}>
        <Text style={styles.pickerLabel}>Peso</Text>
        <>
          <Picker
            selectedValue={`${user.weight}`}
            style={styles.picker}
            onValueChange={(val, i) => updateWeight(val)}>
            {weightArr.map((val, i) => {
              const w = 50 + i;
              return <Picker.Item key={i} label={`${w} kg`} value={`${w}`} />;
            })}
          </Picker>
          <Icon
            name={'chevron-forward-outline'}
            size={22}
            color="rgba(0,0,0,.7)"
          />
        </>
      </View>
      <View style={styles.pickerGrap}>
        <Text style={styles.pickerLabel}>Altura</Text>
        <>
          <Picker
            selectedValue={`${user.height}`}
            style={styles.picker}
            onValueChange={(val, i) => updateHeight(val)}>
            {heightArr.map((val, i) => {
              const w = 150 + i;
              return <Picker.Item key={i} label={`${w} cm`} value={`${w}`} />;
            })}
          </Picker>
          <Icon
            name={'chevron-forward-outline'}
            size={22}
            color="rgba(0,0,0,.7)"
          />
        </>
      </View>
      <View style={{ paddingBottom: 20, paddingTop: 20 }}>
        <View style={styles.moreInfoGrap}>
          <Text style={styles.text}>{`Tmb ${tmr} kcal`}</Text>
          <TouchableNativeFeedback onPress={() => showModal(1)}>
            <View style={{ paddingBottom: 3, paddingLeft: 5 }}>
              <Icon
                name={'ios-information-circle-outline'}
                size={22}
                color="black"
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.moreInfoGrap}>
          <Text
            style={styles.text}>{`Gasto total de energía ${gte} kcal`}</Text>
        </View>
        <View style={styles.moreInfoGrap}>
          <Text style={styles.text}>{`Imc ${imc}`}</Text>
          <TouchableNativeFeedback onPress={() => showModal(2)}>
            <View style={{ paddingTop: 3, paddingLeft: 5 }}>
              <Icon
                name={'ios-information-circle-outline'}
                size={22}
                color="black"
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <View style={styles.messageGrap}>
        <Icon
          name={message.danger ? 'ios-warning-outline' : 'md-heart-outline'}
          size={22}
          color="black"
        />
        <Text style={styles.labelMessage}>{`${message.message}`}</Text>
      </View>
      {/**Custom workout */}
      <Text style={styles.label}>Tus entrenamientos</Text>
      {customWorkout.custom ? (
        <View style={styles.workoutGrap}>
          <Pressable android_ripple={androidRipple} onPress={goToCustomWorkout}>
            <View style={styles.btnGrap}>
              <View style={styles.workoutInfo}>
                <Text style={styles.title}>{customWorkout.title}</Text>
              </View>
              <Icon
                name={'chevron-forward-outline'}
                size={25}
                color={'black'}
              />
            </View>
          </Pressable>
        </View>
      ) : (
        <AddWorkout />
      )}

      <Text style={styles.label}>Recomendaciones:</Text>
      <Recomendations objective={user.preferences.objective} />
      <FitzomeId id={user.id} />

      <Modal visible={modal} showModal={showModal}>
        {explication === 1 ? (
          <TMBExplanation tmr={tmr} name={user.name} />
        ) : (
          <ImcExplanation />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    lineHeight: 26,
    fontFamily: roboto.bold,
    paddingBottom: 20,
    paddingTop: 10,
  },
  smallLabel: {
    color: 'black',
    fontFamily: roboto.regular,
    fontSize: 15,
  },
  pickerGrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  pickerLabel: {
    fontSize: 16,
    lineHeight: 16,
  },
  picker: {
    width: Common.width / 3,
    height: 30,
    color: 'rgba(0,0,0,.7)',
  },
  moreInfoGrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: roboto.regular,
  },
  label: {
    fontSize: 18,
    color: 'black',
    paddingBottom: 20,
    paddingTop: 20,
    fontFamily: roboto.bold,
  },
  messageGrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 20,
    borderBottomColor: '#dbdcd6',
    borderBottomWidth: 1,
  },
  labelMessage: {
    fontFamily: roboto.regular,
    fontSize: 15,
    marginLeft: 10,
  },
  workoutGrap: {
    backgroundColor: '#f0f1f3',
    borderRadius: 8,
  },
  btnGrap: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    width: Common.width - 120,
  },
  title: {
    fontFamily: roboto.bold,
    color: 'black',
    width: Common.width - 80,
    fontSize: 18,
  },
});

/* <Text style={styles.label}>Tu plan para bajar de peso</Text>
            <View>
                <Text>Semana 1</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text>Actividad</Text>
                    <Text>Déficit calórico</Text>
                    <Text>Total</Text>
                </View>
                <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                    <Text>Ejercicio</Text>
                    <Text>150 kcal * día * 6 días</Text>
                    <Text>- 1050 kcal</Text>
                </View>
                <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                    <Text>Dieta</Text>
                    <Text>500 kcal * día * 6 días</Text>
                    <Text>- 3000 kcal</Text>
                </View>
                <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                    <Text></Text>
                    <Text></Text>
                    <Text>- 4050 kcal</Text>
                </View>
            </View>     */

/* <TouchableNativeFeedback
  onPress={() =>
    navigation.navigate('Complete_Account', { user: user })
  }>
  <View
    style={{
      paddingVertical: 20,
      flexDirection: 'row',
      borderBottomColor: '#dbdcd6',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <Text style={{ fontSize: 16, fontFamily: roboto.regular }}>
      Completa tu perfil
    </Text>
    <Icon
      name={'chevron-forward-outline'}
      size={25}
      color="rgba(0,0,0,.7)"
    />
  </View>
</TouchableNativeFeedback> */
