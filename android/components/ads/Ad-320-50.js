// import React,{useEffect } from 'react';
// import { View, Dimensions, } from 'react-native';

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
//         <View
//           style={{
//             backgroundColor: 'black', width:WIDTH, justifyContent:'center',
//             alignItems:'center', height: 250, marginTop:10,
//           }}
//         >
//            <BannerAd unitId={adUnitId} size={BannerAdSize.MEDIUM_RECTANGLE}/>
//         </View>
//     );
// }
