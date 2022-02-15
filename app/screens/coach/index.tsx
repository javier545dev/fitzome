import * as React from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Alert } from 'react-native';

import * as Common from 'common';
import { getFullPlanWeeks, createWorkouts } from 'screens/plans/actions';
import { getStoragedValue, setStorageValue } from 'local_storage';
import { CoachContextProvider, reducer, initialState } from './context';
import { getDays, getFullActivities, getWeeksWithDaysExpired } from './actions';

import { useFocusEffect } from '@react-navigation/native';
import Header from './components/header';
import Calendar from './components/calendar-carousel';
import Activities from './components/activities-carousel';
import CalendarSkeleton from './components/calendar-skeleton';
import ContactModal from './components/contact-modal';
import BottomNav from 'components/main-nav';

let planStartDate = new Date();
let cacheTitle = '';

export default function Coach() {
    const [loading, setLoading] = React.useState(true);
    const [days, setDays] = React.useState<any>([]);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [title, setTitle] = React.useState(cacheTitle);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                try {
                    const plan = await getPlan();
                    /**
                     * update screen if plan is different
                     */
                    if (cacheTitle !== plan.title) {
                        setLoading(true);
                    }
                    const [weeksCorrected, realPlanStartDate] = getWeeksWithDaysExpired(
                        plan.weeks,
                        plan.startDate,
                    );
                    planStartDate = realPlanStartDate;
                    const tempDays = getDays(weeksCorrected);
                    const fullDays = getFullActivities(tempDays, plan.workouts);
                    setDays([...fullDays]);
                    cacheTitle = plan.title;
                    setTitle(cacheTitle);
                    setLoading(false);
                } catch (error) {
                    Common.showToast(`${error}`);
                }
            })();
            return () => {
                //setLoading(true)
                //console.log('screen unfocused');
            };
        }, [])
    );

    React.useEffect(() => {
        (async () => {
            try {
                const plan = await getPlan();
                const [weeksCorrected, realPlanStartDate] = getWeeksWithDaysExpired(
                    plan.weeks,
                    plan.startDate,
                );
                planStartDate = realPlanStartDate;
                const tempDays = getDays(weeksCorrected);
                const fullDays = getFullActivities(tempDays, plan.workouts);
                setDays([...fullDays]);
                setTitle(plan.title);
                setLoading(false);
            } catch (error) {
                Common.showToast(`${error}`);
            }
        })();
    }, []);

    async function getPlan() {
        try {
            /**
             * Get saved plan
             */
            let plan = await getStoragedValue('plan');
            /**
             * If there is not plan, create a new one
             */
            if (!plan) {
                plan = await createNewPlan();
            }
            /**
             * Return the plan or null
             */
            if (plan) {
                return plan;
            } else {
                return null;
            }
        } catch (error) {
            Common.showToast(`${error}`);
            return null;
        }
    }

    async function createNewPlan() {
        try {
            const workouts = createWorkouts(3, 'legs');
            const startDate = Common.getCurrentDate();
            const weeks = getFullPlanWeeks(workouts, [1, 0, 1, 0, 1, 0, 0], 3);
            const plan = {
                type: 'ai',
                startDate,
                workouts,
                title: 'Pierna',
                key: 'legs',
                weeks,
            };
            await setStorageValue('plan', plan);
            return plan;
        } catch (error) {
            Common.showToast(`${error}`);
            return null;
        }
    }


    return (
        <View style={styles.mainGrap}>
            <StatusBar
                translucent={true}
                backgroundColor={'rgba(0,0,0,0)'}
                barStyle={'dark-content'}
            />
            <View style={styles.statusbarSubGrap} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <CoachContextProvider value={{ state, dispatch }}>
                    <Header title={title} />
                    {loading ? (
                        <CalendarSkeleton />
                    ) : (
                        <>
                            <Calendar days={days} startDate={planStartDate} />
                            <Activities days={days} startDate={planStartDate} />
                        </>
                    )}
                </CoachContextProvider>
            </ScrollView>
            <BottomNav active={3} />
            <ContactModal
                visible={state.showWhatsappModal}
                type={'ai'}
                hideModal={() =>
                    dispatch({ type: 'SHOW_WHATSAPP_MODAL', payload: false })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainGrap: {
        backgroundColor: 'white',
        flex: 1,
    },
    statusbarSubGrap: {
        width: Common.width,
        height: StatusBar.currentHeight,
    },
});