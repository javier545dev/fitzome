// import React,{useEffect } from 'react';
// import {StyleSheet, View, Dimensions, Text} from 'react-native';

// import {colors, fonts} from '../styles';
// import {_DEV_ } from '../../../app/docs';

// import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
// import { BannerAd, TestIds, BannerAdSize, } from '@react-native-firebase/admob';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5757045233881367/3615265390';

// const { width: WIDTH } = Dimensions.get("window");

// export default (props) => {

//     useEffect(()=>{
//       admob().setRequestConfiguration({
//         maxAdContentRating: MaxAdContentRating.T,
//         tagForChildDirectedTreatment: false,
//         tagForUnderAgeOfConsent: false,
//       })
//       .then(() => {});
//     },[])

//     return(
//       <View style={styles.mainContainer}>
//            <BannerAd unitId={adUnitId} size={BannerAdSize.SMART_BANNER}/>
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     height:60,
//     backgroundColor:'#fafafa',
//     width: WIDTH,
//     justifyContent:'center',
//     alignItems:'center',
//   },
// });
