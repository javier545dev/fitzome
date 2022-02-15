import React from 'react';
import { View,  } from 'react-native';

type Props = {
    size: 'xs' | 's' | 'm' | 'l' | 'xl';
}

export const BlankSpace:React.FC<Props> = ({ size }) => {

    const height:number = spacing[size];

    return(
        <View style={{ height, width:120, }}/>
    );
}

const spacing: any = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
};