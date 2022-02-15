import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Image, FlatList} from 'react-native';

import { exercisesUrls } from '../../../resources/data/images';

const page = 'EJERCICIOS';

export default () => {

    const Exercise = ({ item, i }) => {
        const url = item.url.split('exercises%2F')[1].split('.mp4')[0];
        return(
                
            <Image key={i}
                style={styles.image}
                source={exercisesUrls[url]}
            />

    )};
    


    useEffect(()=>{
      console.log(`%c 🏁init ${page}`, 'color: blue');

      return () => {
        console.log(`%c 🚀Quit ${page}`, 'color: blue');
      }

    },[]); 

    
    console.log(`%c ♻ render was called on page ${page}`, 'color: green');

    return(
      <View style={styles.mainContainer}>
          <FlatList
                style={{ marginBottom:20, }}
                data={exercisesUrls}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                scrollEventThrottle={16}
                scrollEnabled={true}
                removeClippedSubviews={true}
                renderItem={Exercise}
                onEndReachedThreshold={.1}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={()=>( <View style={{height:10, width:20, }}/>)}
                ListFooterComponent={()=>(<View style={{height:10, width:20, }}/>)}
            />
      </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image:{
      width:100,
      height:100, 
  },
});