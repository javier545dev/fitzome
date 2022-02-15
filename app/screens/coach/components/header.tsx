import React, { useContext } from 'react';
import { View, Image, StyleSheet, } from 'react-native';

//import Logo from "../../../../resources/media/branding/fitzome-black.svg";
import { roboto } from '@styles/index';
import Text from '@components/text';
import { BlankSpace } from '@components/spacing';
import Whatsapp from './whatsapp-button';

import CoachContext from '../context';

type Props = {
    title: string
}

export default ({ title }: Props) => {

    const { state, } = useContext(CoachContext);
    const { currentIndex, } = state;
    const curentWeek = Math.floor(currentIndex / 7) + 1;
    return (
        <View style={styles.mainGrap}>
            <View style={styles.headerGrap}>
                <Image
                    source={require('../../../../resources/media/branding/fitzome.png')}
                    style={styles.logo}
                />
                {/* <Logo width={584 * .25} height={126 * .25} fill={'black'}/> */}
                <Whatsapp />
            </View>

            <BlankSpace size={'l'} />
            <View style={styles.titleGrap}>
                <Text variant={'h1'}>{`Semana ${curentWeek}`}</Text>
                <Text color={'#848d9f'}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        paddingVertical: 20,
    },
    headerGrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    logo: {
        width: 584 * .25,
        height: 126 * .25,
    },
    titleGrap: {
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: roboto.bold,
        paddingTop: 20,
    },
    week: {

    }
});
