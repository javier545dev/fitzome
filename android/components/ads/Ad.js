// import React,{ useEffect } from 'react';
// import { StyleSheet, View, Dimensions, } from 'react-native';

// import { _DEV_ } from '../../../app/docs';

// import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
// import { BannerAd, TestIds, BannerAdSize, } from '@react-native-firebase/admob';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5757045233881367/3615265390';

// const { width: WIDTH } = Dimensions.get("window");

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
//       <View style={styles.mainContainer}>
//         <View style={[styles.adGrap, { width: WIDTH,  }]}>
//            <BannerAd unitId={adUnitId} size={BannerAdSize.MEDIUM_RECTANGLE}/>
//         </View>
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#fafafa',
//     marginBottom:1,
//   },
//   adGrap:{
//     backgroundColor: 'black',
//     justifyContent:'center',
//     alignItems:'center',
//     height: 55 + 250,
//   },
// });
