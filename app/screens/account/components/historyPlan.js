import React from 'react';
import { View, Text, TouchableNativeFeedback, Dimensions, } from 'react-native';

import { helvetica } from '../../../styles/';

import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default ({ plan }) => {

    const { img, title, key, coach, user_info } = plan;

    const navigation = useNavigation();

    return(
        <TouchableNativeFeedback onPress={() => navigation.navigate('FaceProgram', { key, user: coach, url: img, title, user_info })}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',
            paddingBottom:20, borderBottomColor:'#dbdcd6', borderBottomWidth:1, marginBottom:20, }}>
                <View style={{flexDirection:"row", alignItems:'center'}}>
                    <FastImage
                        style={{width:50, height:50, backgroundColor:'black', marginRight:10, }}
                        source={{
                            uri: img,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    <View>
                        <Text 
                            style={{fontSize:18, fontFamily: helvetica.bold, width: width-170,}}
                            ellipsizeMode={'clip'}
                            numberOfLines={1}
                        >{ title }</Text>
                    </View>
                </View>
                
                <View style={{ height:50, width:50, alignItems:'center', justifyContent:'center'}}>
                    <Icon name={'ios-play-circle'} size={35} color="black" />
                </View>
        </View>
        </TouchableNativeFeedback>
    );
}