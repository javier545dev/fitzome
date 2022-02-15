import React from 'react';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';

import { roboto, colors, } from '../../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default () => {

    return (
        <View style={styles.grap}>
              <Text style={styles.howWorks}>Como funciona: </Text>
              <View style={styles.itemGrap}>
                <View style={{  width:20, borderLeftWidth:4, borderLeftColor:'#9ac5fe'}}/>
                <Icon name={'logo-whatsapp'} size={24} color={colors.primary_blue} style={styles.circle}/>
                <Text style={styles.benefitLabel}>Habla con un entrenador en WhatsApp para conocer tus necesidades.</Text>
              </View>
              <View style={styles.itemGrap}>
                <View style={{ width:20, borderLeftWidth:4, borderLeftColor:'#9ac5fe'}}/>
                <Icon name={'barbell-outline'} size={24} color={colors.primary_blue} style={styles.circle}/>
                <Text style={styles.benefitLabel}>Tu entrenador creará un plan de entrenamiento adecuado a tus objetivos.</Text>
              </View>
              <View style={styles.itemGrap}>
                <View style={{ width:20, borderLeftWidth:4, borderLeftColor:'#9ac5fe'}}/>
                <Icon name={'phone-portrait-outline'} size={24} color={colors.primary_blue} style={styles.circle}/>
                <Text style={styles.benefitLabel}>Listo, tu entrenamiento estará disponible en la app.</Text>
              </View>
              <View style={{...styles.itemGrap,}}>
                <View style={{ width:20, borderLeftWidth:4, borderLeftColor:'#9ac5fe'}}/>
                <Icon name={'reload-outline'} size={24} color={colors.primary_blue} style={styles.circle}/>
                <Text style={styles.benefitLabel}>Demasiado difícil? Tu entrenador estará siempre disponible para modificar tu entrenamiento y resolver cualquier problema. </Text>
              </View>
            </View>
    )
};

 const styles = StyleSheet.create({
    grap:{
        backgroundColor:'white',
        paddingVertical: 20,
        marginTop:40,
    },
    itemGrap:{
        flexDirection:'row',
        padding:20,
        paddingTop:0, 
        paddingBottom:0,
    },
    circle:{
        // padding:2, 
        // borderRadius:5,
        backgroundColor: 'white',
        position: 'absolute',
        left: 13,
    },
    benefitLabel:{
        fontFamily: roboto.regular,
        fontSize:18,
        width: width-90,
        paddingLeft:10,
        paddingBottom:20, 
        textAlign:'left'
    },
    howWorks:{
        fontSize:20,
        fontFamily: roboto.bold,
        color:'black',
        padding:20,
        paddingTop:0,
        textAlign:'left',
        paddingBottom:20,
        textTransform: 'uppercase'
    },
  });