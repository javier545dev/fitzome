import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { roboto, colors } from 'styles';
import * as Common from 'common';
import { useAppSelector } from 'redux/hooks';
import { coachPhrases, } from 'features/Coach/phrases';
import CoachSpeach from 'features/Coach';

interface Props {
  callback: () => void;
}

export default function SignupFirstScreen({ callback }: Props) {

  const user = useAppSelector(state => state.user);
  const wellcomePhrase = coachPhrases.signup.wellcome(user.name.split(' ')[0]) ?? 'invitado';
  const userName = user.name.split(' ')[0] ?? 'invitado';

  return (
    <View style={styles.container}>
      <View style={styles.contentGrap}>
        <View>
          <View style={styles.bigLabelContainer}>
            {
              user.name === 'Rivas' ? null :
                <CoachSpeach thinkToSay={wellcomePhrase} />
            }
            <Text style={styles.bigLabel}>Hola,</Text>
          </View>
          <Text style={styles.bigLabel}>{`${userName}.`}</Text>
          <Text style={styles.text}>
            La siguiente información nos ayudara a brindarte entrenamientos y
            recomendaciones adecuadas para ti.
          </Text>
        </View>
        <TouchableOpacity onPress={callback}>
          <View style={styles.button}>
            <Text style={styles.label}>Comenzar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
  },
  contentGrap: {
    paddingTop: Common.height * 0.2,
  },
  bigLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigLabel: {
    fontSize: 42,
    fontFamily: roboto.bold,
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: roboto.regular,
    paddingTop: 20,
    width: Common.width - 40,
    lineHeight: 24,
  },
  button: {
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 50,
    width: Common.width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  label: {
    fontSize: 18,
    fontFamily: roboto.bold,
    color: 'white',
  },
});
