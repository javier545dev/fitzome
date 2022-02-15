import React, { useState, useEffect } from 'react';

import NetInfo from "@react-native-community/netinfo";

export default function UseNetInfo() {

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const _isConnected: boolean = state.isConnected;
            const _isReachable: boolean = state.isInternetReachable ?? false;
            setIsConnected(_isConnected && _isReachable);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return isConnected;
}