import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ShareDialog } from 'react-native-fbsdk';

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';

export default ({ visible, showModal, children }) => {
     
    return(
        <Modal 
            isVisible= { visible }
            swipeDirection={['down']}
            coverScreen= { true }
            backdropOpacity= {0}
            onBackdropPress={showModal}
            onBackButtonPress={showModal}
            onSwipeComplete={showModal}
            hideModalContentWhileAnimating={true}
            style={styles.modal}
        >
            <View style={styles.grabBotton}>
                <TouchableOpacity onPress={showModal}>
                    <View style={styles.topBotton}>
                        <Icon name={'close-circle-outline'} size={35} color='black' />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollview}>
                { children }
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'flex-end',
         margin:0, 
    },
    scrollview:{
        backgroundColor:'white',
        padding:20, 
        paddingTop: 60, 
    },
    grabBotton:{
        position: 'absolute', 
        right:10, 
        top:10, 
        zIndex:10, 
    },
    topBotton:{ 
        width:40,
        height:40, 
        borderRadius:40, 
        justifyContent:'center', 
        alignItems:'center',
    },
});