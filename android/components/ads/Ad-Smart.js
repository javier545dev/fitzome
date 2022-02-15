import React from 'react';
import {View, StyleSheet} from 'react-native';

// import firebase from 'react-native-firebase';

// const Banner = firebase.admob.Banner;
// const AdRequest = firebase.admob.AdRequest;
// const request = new AdRequest();
// request.addKeyword('workouts');

export default (props) => {

    const {width, height} = props;

    return( 
        <View style={[styles.mainContainer, {width, height}]}>
          {/* <Banner
            size={"SMART_BANNER"}
            unitId={'ca-app-pub-5757045233881367/3615265390'}
            request={request.build()}
            onAdFailedToLoad={(e)=>console.log(e)}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
          /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: 'white',  
        alignItems:'center', 
        justifyContent:'center', 
    }
});