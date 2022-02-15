import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableNativeFeedback, Dimensions, Image } from 'react-native';

import { helvetica, roboto } from '../../../styles';
import { articlesUrls } from '../../../../resources/data/images';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width: _WIDTH, height:HEIGHT } = Dimensions.get("window");
// const width = _WIDTH * .7;
// const height = HEIGHT * .5;
const width = _WIDTH * .75;
const height = HEIGHT * .45;

export default ({ data, label, }) => { 

    const navigation = useNavigation();
   
    const Workout = ({ item, i }) => {
        const imageId = `_${item.img.split('--post-')[1].split('--')[0]}_`;   
        return(
        <TouchableNativeFeedback 
            key={i} 
            onPress={()=> navigation.navigate('Article',{ key: item.key, imageId: imageId})}
        >
            <View  style={styles.mainContainer} >
                <Image
                    style={{ width, height, backgroundColor: 'white', borderRadius: 16, }}
                    source={articlesUrls[imageId]}
                />
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.4)']} style={styles.titleGrap}>
                    <Text 
                        style={styles.title}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {item.title}
                    </Text>
                </LinearGradient>
            </View>
        </TouchableNativeFeedback>
    )};

    return(
       <View style={styles.mainGrap}>
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
            ListFooterComponent={()=>( <View style={{height, width:10, }}/>)}
        />
       </View>
    );
}

const styles = StyleSheet.create({
    mainGrap:{
        backgroundColor:'white',
        paddingBottom:20,
       // paddingTop:20, 
    },
    mainContainer:{
        marginRight:10,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 16,
    },
    title:{
        color:'white',
        fontSize:26,
        fontFamily: roboto.black,
        lineHeight: 26,
        letterSpacing: -1.2, 
        textTransform: 'uppercase', 
    },
    label:{
        fontFamily: helvetica.bold,
        fontSize: 18,
        color:'black',
        lineHeight:18,
        paddingBottom:20, 
        paddingLeft:20,
    },
    titleGrap:{
        position:'absolute',
        bottom:0,
        left:0,
        padding:20,
        paddingRight:50,
        width,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius:16,
    },
  });
  
  