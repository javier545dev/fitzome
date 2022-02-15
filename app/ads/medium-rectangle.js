// import React,{ useEffect } from 'react';
// import { StyleSheet, View, Dimensions, } from 'react-native';

// import { _DEV_ } from '../docs';
// import * as Common from 'common';

// import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
// import { BannerAd, TestIds, BannerAdSize, } from '@react-native-firebase/admob';
//import Config from "react-native-config";

//const adUnitId = __DEV__ ? TestIds.BANNER : Config.GOOGLE_CA_APP_PUB;

// export default () => {

//     useEffect(()=>{
//       admob().setRequestConfiguration({
//         maxAdContentRating: MaxAdContentRating.T,
//         tagForChildDirectedTreatment: false,
//         tagForUnderAgeOfConsent: false,
//       })
//       .then(() => {});
//     },[])

//     return(
//         <View style={styles.adGrap}>
//            <BannerAd unitId={adUnitId} size={BannerAdSize.MEDIUM_RECTANGLE}/>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   adGrap:{
//     height: 250,
//     width: 320,
//   },
// });
