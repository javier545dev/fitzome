import * as React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Pressable,
} from 'react-native';

import { Video } from 'expo-av';

import * as Common from 'common';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    watch_exercises: {
        url: string,
    };
};

type WatchExerciseRouteProp = RouteProp<RootStackParamList, 'watch_exercises'>;

type RouteParams = { route: WatchExerciseRouteProp; }

export default function WatchExerciseInWorkoutSummary({ route }: RouteParams) {

    const { url } = route.params;
    const video = React.useRef(null);
    const navigation = useNavigation();

    React.useEffect(() => {
        Common.logEvent('EXERCISE_WATCHED');
    }, []);

    function goBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.mainGrap}>
            <View style={styles.grap}>
                <Pressable onPress={goBack}>
                    <View style={styles.backBtn}>
                        <Icon size={30} color={'black'} name={'close-outline'} />
                    </View>
                </Pressable>
            </View>
            <Video
                ref={video}
                style={styles.video}
                source={{uri: url,}}
                resizeMode={'cover'}
                isLooping
                shouldPlay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        flex: 1,
        backgroundColor: 'white',
    },
    grap: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        top: StatusBar.currentHeight,
        zIndex: 1,
    },
    backBtn: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
    },
    video: {
        height: Common.height + (StatusBar.currentHeight ?? 0),
        width: Common.width,
    }
});