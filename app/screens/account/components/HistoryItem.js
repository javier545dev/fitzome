import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

import { getDate } from '../../Home/actions';

import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../../components/styles';
import { colors } from '../../../../app/styles/';

export default ({ width, title, img, description, date, id, coach, screen, user_info }) => {

    const navigation = useNavigation();
    const imgWidth = width/3 - 30;
    const imgHeight = imgWidth + 20 ;
    const viewWidth = width - imgWidth - 20;
    const _date = getDate(new Date(date));
    
    return(
      <TouchableNativeFeedback onPress={() => navigation.navigate(screen, { key: id, user: coach, url:img, title, user_info })}>
      <View style={[styles.mainContainer,{width}]}>
            <FastImage
                style={{ width: imgWidth, height: imgHeight}}
                source={{
                    uri: img,
                    priority: FastImage.priority.normal,
                }}
                onError={()=> console.log('error')}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={[styles.infoGrap, { width: viewWidth }]}>
                <Text style={styles.title} numberOfLines={1}>{ title }</Text>
                { description ?
                    <Text style={styles.description} numberOfLines={2} >
                      {description}
                    </Text>
                : null }
                
                <Text style={styles.date}>{ _date }</Text>
            </View>
      </View>
      </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection:'row',
    marginBottom:5,
  },
  infoGrap:{
      padding:10,
      justifyContent:'center',
  },
  title:{
      color: colors.black,
      fontSize:15, 
      fontFamily: fonts.medium,
      marginBottom:5,
  },
  description:{
    color: colors.black,
    fontSize:15, 
    fontFamily: fonts.regular,
    marginBottom:5,
  },
  date:{
    fontSize:11,
    color: colors.black,
    fontFamily: fonts.regular,
  },
});


