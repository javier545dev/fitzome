import React from 'react';
import { View, StyleSheet, Text, Image, Linking, TouchableOpacity } from 'react-native';

import { roboto, helvetica } from '../../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

export default () => { 

    return(
       <View style={styles.mainGrap}>
           <Image
                source={require('../../../../resources/media/branding/fitzome.png')}
                style={styles.logo}
           />
           <Text style={{...styles.text, paddingBottom:8, }}>No te pierdas de nada,</Text>
           <Text style={styles.text}>Siguenos en:</Text>
           <View style={{ flexDirection:'row', paddingTop: 20, }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/fitzome/')}>
                    <View style={styles.btnGrap}>
                            <Icon size={34} color={'black'} name={'logo-instagram'}/>
                    </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UCYANfahFXryZnN4nu9jCbwA')}>
                    <View style={styles.btnGrap}>
                            <Icon size={34} color={'black'} name={'logo-youtube'}/>
                    </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/fitzome')}>
                    <View style={styles.btnGrap}>
                            <Icon size={34} color={'black'} name={'logo-facebook'}/>
                    </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/fitzome')}>
                    <View style={styles.btnGrap}>
                            <Icon size={34} color={'black'} name={'logo-twitter'}/>
                    </View>
               </TouchableOpacity>
           </View>
       </View>
    );
}

const styles = StyleSheet.create({
    mainGrap:{
        backgroundColor:'#f7f7f7',
        padding:20,
        paddingBottom:40,
        paddingTop:40, 
    },
    text:{
        fontFamily: roboto.medium,
        fontSize: 24,
        lineHeight:24,
    },
    logo:{
        width: 584 * .23, 
        height: 126 * .23,
        marginBottom: 30, 
    },
    btnGrap:{
        width:60,
        height:50,
        justifyContent:'center',
        alignItems:'center', 
    },
  
  });
  
  