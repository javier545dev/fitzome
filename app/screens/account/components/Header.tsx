import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { roboto, colors } from 'styles';
/**
 * Redux
 */
import { useAppSelector } from 'redux/hooks';
/**
 * Components
 */
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props { }

const androidRipple = { color: 'rgba(0,0,0,.1)', borderless: true };

export default function UserHeader({ }: Props) {
  const user = useAppSelector(state => state.user);
  const navigation = useNavigation();
  const joinDate = getJoinDate();

  function getJoinDate(): string {
    const d = new Date(user.time_stamp);
    return `${d.getFullYear()}`;
  }

  function goToSettings() {
    navigation.navigate('Settings');
  }

  return (
    <View style={styles.mainGrap}>
      <View style={styles.contentGrap}>
        <View style={styles.userImg}>
          <Text style={styles.userLetter}>{`${user.name.split('')[0]}`}</Text>
        </View>
        {/* <FastImage
          style={styles.userImg}
          source={{
            uri: user.img,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onError={() => console.log('error')}
        /> */}
        <View style={styles.nameGrap}>
          <Text style={styles.name}>{`${user.name}`}</Text>
          <View style={styles.dateGrap}>
            <Icon size={16} name={'time'} color={colors.darkOpacity} />
            <Text style={styles.date}>{`${joinDate}`}</Text>
          </View>
        </View>
      </View>

      <Pressable onPress={goToSettings} android_ripple={androidRipple}>
        <View style={styles.btn}>
          <Icon name={'ios-settings-outline'} size={26} color={'black'} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentGrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameGrap: {
    paddingLeft: 20,
  },
  userImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userLetter: {
    color: 'white',
    fontSize: 24,
    fontFamily: roboto.bold,
  },
  name: {
    fontSize: 22,
    fontFamily: roboto.bold,
  },
  dateGrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    fontFamily: roboto.regular,
    marginLeft: 5,
  },
  btn: {
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
