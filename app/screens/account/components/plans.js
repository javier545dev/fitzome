import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

import {helvetica} from '../../../../app/styles/';
import {showToast} from 'common';

import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import Plan from './custom-plan-summary';
import NoConexion from './noConexionAnimation';

export default () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [conexion, setConexion] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem(`@user_info`);
      if (value) {
        const result = JSON.parse(value);
        setUser({...result});
        checkInternetConexion(result.id);
        //checkInternetConexion(3846729508730120);
      }
    } catch (error) {
      showToast(`${error}`);
    }
  };

  function checkInternetConexion(id) {
    NetInfo.fetch().then(s => {
      if (s.isConnected && s.isInternetReachable) {
        getPlans(id);
        setConexion(true);
      }
    });
  }

  function getPlans(id) {
    const ref = database().ref(`_users_/${id}/custom_training/plans/`);
    ref.once('value').then(snapshot => {
      const result = snapshot.val();
      if (result) {
        let customPlans = [];
        for (const i in result) {
          if (result.hasOwnProperty(i)) {
            const w = result[i];
            customPlans.push(w);
          }
        }
        setPlans(customPlans);
      }
      setLoading(false);
    });
  }

  return (
    <View style={styles.container}>
      {conexion ? (
        <View>
          {loading ? (
            <ActivityIndicator size={'large'} color={'black'} />
          ) : plans.length > 0 ? (
            <Plan plans={plans} />
          ) : (
            <Text
              style={{
                padding: 20,
                fontFamily: helvetica.regular,
                fontSize: 16,
              }}>
              No has comenzado ningun plan
            </Text>
          )}
        </View>
      ) : (
        <NoConexion />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: helvetica.regular,
  },
  label: {
    fontSize: 18,
    color: 'black',
    paddingBottom: 20,
    paddingTop: 20,
    fontFamily: helvetica.bold,
  },
});
