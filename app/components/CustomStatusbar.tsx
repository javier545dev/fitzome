import React from 'react';
import { View, StatusBar, Dimensions} from 'react-native';

interface Props{
    color: string;
}

export default function CustomStatusbar({ color }:Props){

    return(
    <>
        <StatusBar translucent={true} backgroundColor={ color } barStyle={'dark-content'}/>
        <View 
            style={{
                width: Dimensions.get('window').width, 
                height: StatusBar.currentHeight,
                backgroundColor: color, 
            }}
        />
    </>
    )
};


