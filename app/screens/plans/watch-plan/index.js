import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';

import {roboto} from '../../../styles';
import {showToast} from 'common';
import {setStorageValue} from '../../../local_storage';

import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';

import SubHeader from '../../../components/subHeader';
import PrimaryButton from '../../workouts/components/primary-button';
import Description from './components/description';
import WeekSummary from './components/plan-summary';
import WeekSummarySkeleton from './components/weeks-summary-skeleton';

const {width} = Dimensions.get('window');

export default ({route}) => {
  const {type, title, key, weeks} = route.params;

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [fullweeks, setFullWeeks] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState({id: 2525});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem(`@user_info`);
      if (value) {
        const _u = JSON.parse(value);
        setUser({..._u});
        checkInternetConexion(_u.id);
        //checkInternetConexion(3846729508730120);
      }
    } catch (error) {
      showToast(`${error}`);
    }
  };

  function checkInternetConexion(id) {
    NetInfo.fetch().then(s => {
      if (s.isConnected && s.isInternetReachable) {
        getFullPlan(id);
      } else {
        showToast('No hay conexión a internet');
      }
    });
  }

  function getFullPlan(id) {
    const ref = database().ref(`custom_training/${id}/plans/${key}/`);
    ref.once('value').then(snapshot => {
      const result = snapshot.val();
      if (result) {
        setDescription(result.description);
        setWorkouts([...result.workouts]);
        setFullWeeks([...result.weeks]);
        setLoading(false);
        console.log(result);
      } else {
        showToast('No hay planes de entrenamiento');
      }
    });
  }

  function getWorkouts(val) {
    let tempWorkouts = [];
    let tempKeys = [];
    for (let i = 0; i < val.length; i++) {
      const day = val[i];
      for (let z = 0; z < day.length; z++) {
        const act = day[z];
        if (act.type != 'rest') {
          if (!tempKeys.includes(act.key)) {
            tempKeys.push(act.key);
            for (let w = 0; w < workouts.length; w++) {
              const _workout = workouts[w];
              if (String(_workout.key) === act.key) {
                tempWorkouts.push({..._workout});
              }
            }
          }
        }
      }
    }
    return tempWorkouts;
  }

  const _onPress = () => getPlanStartDate();

  async function getPlanStartDate() {
    let sDate = '4/28/2021';
    const d = new Date();
    //const d = new Date('5/19/2021');
    sDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    try {
      const value = await AsyncStorage.getItem(`@plan_start_date`);
      if (value) {
        sDate = JSON.parse(value);
      } else {
        setStorageValue('plan_start_date', sDate);
      }
      navigation.navigate('Coach2', {
        type: 'custom',
        weeks: fullweeks,
        sDate,
        key,
        workouts,
        title,
        user,
      });
    } catch (error) {
      navigation.navigate('Coach2', {
        type: 'custom',
        weeks: fullweeks,
        sDate,
        key,
        workouts,
        title,
        user,
      });
    }
  }

  return (
    <View style={styles.mainGrap}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.statusbarSubGrap} />
      <SubHeader title={title} />
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={1}>
        <View style={{padding: 20}}>
          <Text style={styles.weeks}>{`${weeks} semanas`}</Text>
          <Text style={styles.title}>{`${title}`}</Text>
        </View>
        <Description text={description} loading={loading} />
        <Text
          style={{fontFamily: roboto.medium, fontSize: 20, paddingLeft: 20}}>
          Resumen
        </Text>
        {loading ? (
          <WeekSummarySkeleton />
        ) : (
          fullweeks.map((val, i) => {
            const w = getWorkouts(val);
            return <WeekSummary key={i} workouts={w} i={i} user={user} />;
          })
        )}
        <View style={{height: 100, width: 100}} />
      </ScrollView>
      <PrimaryButton label={'Comenzar plan'} action={() => _onPress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainGrap: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: roboto.medium,
  },
  weeks: {
    fontSize: 18,
    fontFamily: roboto.medium,
  },
  statusbarSubGrap: {
    width,
    height: StatusBar.currentHeight + 55,
  },
});
