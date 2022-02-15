import React from 'react';
import { View, StyleSheet,  Pressable, Text, Dimensions, StatusBar, } from 'react-native';

import { roboto } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default ({ title }) => {

    const navigation = useNavigation();
     
    return(
        <View style={styles.grap}>
            <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                { title }
            </Text>
            <Pressable onPress={()=> navigation.goBack()}>
                <View style={styles.backBtn}>
                    <Icon size={30} color={'black'} name={'close-outline'} />
                </View>
            </Pressable>
        </View>  
    )
}

const styles = StyleSheet.create({
  grap:{
    backgroundColor:'white',
    width,
    height:55, 
    alignItems:'center',
    position:'absolute',
    left:0,
    top: StatusBar.currentHeight,
    zIndex:1,
    flexDirection:'row',
    justifyContent:'space-between', 
  },
  backBtn:{
      height:55,
      width:55,
      justifyContent:'center',
      alignItems:'center',
  },
  title:{
    fontFamily: roboto.medium, 
    fontSize:22, 
    lineHeight: 22,
    marginLeft: 20, 
    width: width - 130,
  },
});