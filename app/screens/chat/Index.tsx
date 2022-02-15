import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Keyboard,
} from 'react-native';

import * as Common from 'common';

import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import SentMessage from './components/Message';
import CoachThinking from './components/CoachThinking';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { getWellcomeMessage, } from 'redux/slices/coachChatSlice';

export default function ChatScreen() {

  const messages = useAppSelector(state => state.chat.messages);
  const loading = useAppSelector(state => state.chat.loading);
  const flatListRef = React.useRef<FlatList>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    //const page = 'Chat';
    //console.log(`%c 🏁init ${page}`, 'color: blue');
    Common.logEvent('COACH_CHAT_SEEN')
    // Keyboard.addListener('keyboardDidShow', showKeyboard);

    const showSubscription = Keyboard.addListener("keyboardDidShow", showKeyboard);

    if (messages.length === 0) {
      setTimeout(() => {
        dispatch(getWellcomeMessage());
      }, 700)
    }


    if (messages.length > 5) {
      setTimeout(() => {
        if (flatListRef.current) flatListRef.current.scrollToEnd();
      }, 100)
    }

    return () => {
      // Keyboard.removeListener('keyboardDidShow', showKeyboard);
      showSubscription.remove();
      // console.log(`%c 🚀Quit ${page}`, 'color: blue');
    };
  }, []);

  React.useEffect(() => {
    if (flatListRef.current && messages.length > 1) {
      flatListRef.current.scrollToEnd();
    }
  }, [messages]);

  function showKeyboard() {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd();
      }
    }, 100)
  }


  type ItemPorps = {
    item: any;
    index: number;
  }

  function getMessages({ item, index }: ItemPorps) {
    return <SentMessage {...item} />
  }

  // console.log(`%c ♻ render was called on page ${page}`, 'color: green');

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        backgroundColor="white"
      />
      <View style={styles.statusbarSubGrap} />
      <ChatHeader />
      <FlatList
        ref={flatListRef}
        data={messages}
        style={styles.flatlist}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        scrollEventThrottle={16}
        scrollEnabled={true}
        removeClippedSubviews={true}
        renderItem={getMessages}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View>
          {
            loading ?
              <CoachThinking />
              :
              <View style={styles.emptySpace} />
          }
        </View>}
      />
      <ChatInput />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusbarSubGrap: {
    width: Common.width,
    height: (StatusBar.currentHeight ?? 0),
  },
  flatlist: {
    padding: 20,
  },
  emptySpace: {
    height: 30,
    width: 100,
  }
});
