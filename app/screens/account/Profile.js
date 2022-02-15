
import React from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';

import CalorieCounter from './CalorieCounter';

import {colors, fonts} from '../../components/styles';

export default (props) => {

    const {width} = props;

    return(
      <View style={styles.mainContainer}>
          <ScrollView>
            <View style={{padding:20, paddingTop:70, paddingBottom:60,}}>
               <CalorieCounter width={width} user={props.user}/>
            </View>
          </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});


