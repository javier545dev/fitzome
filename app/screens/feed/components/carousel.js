import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableNativeFeedback, Dimensions, Image } from 'react-native';

import { helvetica } from '../../../styles';
import { recipesUrls } from '../../../../resources/data/images';
import { useNavigation } from '@react-navigation/native';

const { width: _WIDTH, height:HEIGHT } = Dimensions.get("window");
const width = _WIDTH * .4;
const height = HEIGHT * .25;

export default ({ data, label, }) => {

    const navigation = useNavigation();
   
    const Workout = ({ item, i }) => {
        const imageId = `_${item.url.split('--')[1]}_`;   

        return(
        <TouchableNativeFeedback 
            key={i} 
            onPress={()=> navigation.navigate('FaceRecipe',{ key: item.key, imageId: imageId})}
        >
            <View  style={styles.mainContainer} >
                <Image
                    style={{ width, height, backgroundColor: 'white', borderRadius: 8, }}
                    source={recipesUrls[imageId]}
                />
                <Text style={styles.title} numberOfLines={1}>{ item.title }</Text>
            </View>
        </TouchableNativeFeedback>
    )};

    return(
       <>
        <Text style={styles.label}>{ label }</Text>
        <FlatList
            horizontal={true}
            style={{ marginBottom:30, }}
            showsHorizontalScrollIndicator={false}
            data={data}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            scrollEventThrottle={16}
            renderItem={Workout}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={()=>( <View style={{height, width:20, }}/>)}
            ListFooterComponent={()=>( <View style={{height, width:20, }}/>)}
        />
        </> 
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        marginRight:5,
        backgroundColor: 'white',
    },
    label:{
        fontFamily: helvetica.bold,
        fontSize: 18,
        color:'black',
        lineHeight:18,
        paddingBottom:20, 
        paddingLeft:20,
    },
    title: {
        width,
        fontSize:15,
        fontFamily: helvetica.regular,
        paddingTop:5,

    }
  });
  
  