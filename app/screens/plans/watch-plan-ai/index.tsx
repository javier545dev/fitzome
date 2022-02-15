import * as React from 'react';
import { StyleSheet, View, StatusBar, } from 'react-native';
/*
    COMUNITIES
    https://www.youtube.com/watch?v=C5h79SwDcFUs
    https://www.youtube.com/watch?v=Uqno63OiLbI
    ux design best practices
    https://uxdesign.cc/guide-for-designing-better-mobile-apps-typography-5796495ef86f
*/
import * as Common from 'common';
import { setStorageValue } from 'local_storage';
import { WorkoutsTypes } from 'screens/workouts/actions/workout';
import { PlansInterface } from '../plans';
import { getFullPlanWeeks, createWorkouts } from '../actions';
import { useAppSelector } from 'redux/hooks';
import { plansUrls } from '../../../../resources/data/images';

import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import Text from '@components/text';
import { BlankSpace, } from '@components/spacing';
import { Button, BackButton, } from 'components/button';
import DaysSelector from '../components/DaysSelector';
import ScrollView from '@components/scrollview-with-image';

export interface WorkoutPlanInterface {
    custom: boolean,
    description: string,
    key: number,
    title: string,
    type: WorkoutsTypes,
}

interface Props extends PlansInterface {
    title: string;
}

type RootStackParamList = { watch_plan_ai: Props };
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'watch_plan_ai'>;
type RouteParams = { route: ProfileScreenRouteProp; }

export default ({ route }: RouteParams) => {

    const { type, title, key, sessionsPerWeek, weeks: numberOfWeeks } = route.params;
    const navigation = useNavigation();
    const user = useAppSelector(state => state.user);
    const daysSelected = useAppSelector(state => state.plans.planConfig.daysSelected);
    const days = useAppSelector(state => state.plans.planConfig.days);
    const description = `Entrena ${sessionsPerWeek - 1} o ${sessionsPerWeek} veces por semana durante ${numberOfWeeks} semanas. Tu eliges los días.`;
    const image = user.gender === 2 ? `${key}_w` : `${key}_m`;

    React.useEffect(() => {
        //createAiWorkouts(user);
    }, []);

    async function startPlan(): Promise<void> {
        try {
            const workouts = createWorkouts(numberOfWeeks, type);
            const startDate = Common.getCurrentDate();
            const weeks = getFullPlanWeeks(workouts, days, numberOfWeeks);
            const plan = {
                type: 'ai',
                startDate,
                workouts,
                title,
                key,
                weeks,
            }
            await setStorageValue('plan', plan);
            navigation.navigate('Coach');
        } catch (error) {
            Common.showToast(`${error}`);
        }
    }

    function disabledCallback() {
        Common.showToast('Selecciona tus días de entrenamiento')
    }

    return (
        <View style={styles.mainGrap}>
            <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} barStyle={'light-content'} />
            <BackButton />
            <ScrollView
                imageSource={plansUrls[image]}
            >
                <View style={{ paddingTop: 20, }}>
                    <Text variant={'small-p'}>{`${numberOfWeeks} semanas - ${sessionsPerWeek * numberOfWeeks} sesiones aprox.`}</Text>
                    <Text variant={'h1'}> {title} </Text>
                    <BlankSpace size={'m'} />
                    <Text>{description}</Text>
                    <BlankSpace size={'l'} />
                    <Text variant={'label'}>Días de entrenamiento</Text>
                    <Text variant={'small-p'}> {`Selecciona de ${sessionsPerWeek - 1} a ${sessionsPerWeek} días`} </Text>
                    <DaysSelector {...{ sessionsPerWeek }} />
                    <BlankSpace size={'xl'} />
                    <View style={styles.blankSpace} />
                </View>
            </ScrollView>
            <Button
                label={'Comenzar plan'}
                callback={() => startPlan()}
                disabledCallback={() => disabledCallback()}
                disabled={
                    daysSelected >= sessionsPerWeek - 1 && daysSelected <= sessionsPerWeek
                        ? false : true
                }
            />
        </View>
    );
}


const styles = StyleSheet.create({
    mainGrap: {
        backgroundColor: 'white',
        flex: 1,
    },
    blankSpace: {
        width: 80,
        height: 90,
    }
});