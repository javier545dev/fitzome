import * as React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    Text
} from 'react-native';

import * as Common from 'common';
import Voice from '@react-native-voice/voice';
import { colors } from 'styles';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateMessages, getCoachResponse } from 'redux/slices/coachChatSlice';

export default function ChatInput() {
    const [message, setMessage] = React.useState('');
    const [record, setRecord] = React.useState(false);
    const [speech, setSpeech] = React.useState('');
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    React.useEffect(() => {
        Voice.onSpeechResults = onSpeechResultsHandler;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    function sendMessage() {
        Common.logEvent('MESSAGE_SENT');
        setMessage('');
        //Update messages
        dispatch(
            updateMessages({
                type: 'user',
                message,
            }),
        );
        // Get coach response
        dispatch(getCoachResponse(message));
        saveMessage(message);
    }

    /**
     * Save the message in the server to future analizes
     * @param m the message
     */
    function saveMessage(m: string) {
        if (Common.PRODUCTION) {
            const date = `${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`;
            const databaseUrl = `chat/queries/${user.id}/${date}`;
            const messageToSave = {
                date: new Date().valueOf(),
                message: m,
            };
            database()
                .ref(databaseUrl)
                .push(messageToSave);
        }
    }

    async function openMic() {
        if (record) {
            cancelMic();
        } else {
            setRecord(true);
            try {
                const voiceIsavailable = await Voice.isAvailable();
                if (!voiceIsavailable) {
                    Common.showToast('Servicio no compatible');
                    Common.logEvent('VOICE_NO_AVAILABLE');
                } else {
                    await Voice.start('es-ES');
                }
            } catch (error) {
                console.log('error raised', error);
            }
        }
    }

    async function cancelMic() {
        setRecord(false);
        try {
            await Voice.stop();
        } catch (error) {
            // console.log("error raised", error)
        }
        setSpeech('');
    }

    async function closeMic(query: string) {
        setRecord(false);
        try {
            await Voice.stop();
            Common.logEvent('MESSAGE_SENT_AUDIO');
            //Update messages
            dispatch(
                updateMessages({
                    type: 'user',
                    message: query,
                }),
            );
            // Get coach response
            dispatch(getCoachResponse(query));
            saveMessage(query);
        } catch (error) {
            // console.log("error raised", error)
        }
        setSpeech('');
    }

    function onSpeechResultsHandler(textResults: any) {
        try {
            const speachToTextResults = textResults.value[0];
            //console.log(speachToTextResults)
            setSpeech(speachToTextResults);
            setTimeout(() => {
                closeMic(speachToTextResults)
            }, 800)
            //closeMic(speachToTextResults);
        } catch (error) {
            Common.showToast('Ocurrio un error, intentalo más tarde');
        }
    }

    return (
        <View style={styles.grap}>
            {record ? (
                <View style={styles.saySomethingGrap}>
                    {
                        speech != '' ? null :
                            <ActivityIndicator size={'small'} color={'black'} />
                    }

                    <Text
                        style={styles.speechText}
                    >
                        {speech != '' ? speech : `Di algo..`}
                    </Text>
                </View>

            ) : (
                <TextInput
                    style={styles.input}
                    placeholder={'Escribe un mensaje'}
                    multiline={true}
                    maxLength={200}
                    defaultValue={message}
                    onChangeText={setMessage}
                />
            )}
            {message.length > 0 ? (
                <TouchableOpacity onPress={sendMessage}>
                    <View style={styles.sendBtnActive}>
                        <Icon name={'send'} size={20} color={'white'} />
                    </View>
                </TouchableOpacity>
            ) : (
                <Pressable
                    onPressIn={openMic}
                >
                    {record ? (
                        <View style={styles.recordActive}>
                            <Icon name={'mic'} size={30} color={'white'} />
                        </View>
                    ) : (
                        <View style={styles.recordInactive}>
                            <Icon name={'mic'} size={25} color={'white'} />
                        </View>
                    )}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    grap: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopColor: colors.backgroundGray,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    speechText: {
        padding: 10,
        width: Common.width - 100,
        fontSize: 18,
        paddingLeft: 20,
        backgroundColor: 'white',
    },
    input: {
        padding: 10,
        width: Common.width - 100,
        fontSize: 16,
        borderColor: colors.backgroundGray,
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 20,
        backgroundColor: 'white',
    },
    sendBtnActive: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordInactive: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    recordActive: {
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    saySomethingGrap: {
        flexDirection: 'row'
    }
});
