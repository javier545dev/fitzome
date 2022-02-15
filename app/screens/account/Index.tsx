import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
/**
 * Components
 */
import Profile from './components/UserProfile';
import BottomNav from 'components/main-nav';
import UserHeader from './components/Header';

export default function AccountScreen() {


  React.useEffect(() => {
    //console.log(`%c 🏁init ${page}`, 'color: blue');
    return () => {
      // console.log(`%c 🚀Quit ${page}`, 'color: blue');
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        backgroundColor="white"
        barStyle={'dark-content'}
      />
      <View style={styles.subGrap} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserHeader /> 
        <Profile />
        <View style={styles.emptyGrap} />
      </ScrollView>
      <BottomNav active={5} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  subGrap: {
    height: StatusBar.currentHeight ?? 0,
    width: 100,
  },
  emptyGrap: {
    width: 100,
    height: 70,
  }
});
