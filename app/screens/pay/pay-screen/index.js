import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Linking,
} from 'react-native';

import * as Common from 'common';
import {roboto, colors} from '../../../styles';
// import {stripeConfig} from '../../../stripe/config';

// import stripe from 'tipsi-stripe';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import database from '@react-native-firebase/database';

import SubHeader from '../../../components/subHeader';
import Article from './components/article';
import CardMethod from './components/card-button';
import PaypalMethod from './components/paypal-button';
import OxxoMethod from './components/oxxo-button';
import OxxoModal from './components/oxxo-modal';
import PaypalModal from './components/paypal-modal';
import SuccessModal from './components/success-modal';

const {width} = Dimensions.get('window');
// const CHECKOUT_ENDPOINT =
//   'https://us-central1-fitzome-1532448422595.cloudfunctions.net/app/checkout/';

export default ({route}) => {
  // stripe.setOptions(stripeConfig);

  // const {user, price, discount, weeks} = route.params;
  // const finalPrice = price * (discount / 100);
  // const [oxxoModal, setOxxoModal] = useState(false);
  // const [paypalModal, setPaypalModal] = useState(false);
  // const [showSuccessModal, setSuccesModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [cardError, setCardError] = useState(false);
  // const [cardToken, setCardToken] = useState({});
  // const [paymentInfo, setPaymentInfo] = useState({receipt: {}});
  // const [email, setEmail] = useState('');

  // useEffect(() => {
  //   Common.logEvent('pay_screen_visited');
  // }, []);

  // function _onPay() {
  //   if (cardToken.tokenId) {
  //     if (email != '') {
  //       makePayment();
  //     } else {
  //       Common.showToast('Agrega un correo electrónico');
  //     }
  //   } else {
  //     Common.showToast('Selecciona un método de pago');
  //   }
  // }

  // function makePayment() {
  //   setLoading(true);
  //   const _finalPrice_ = price * (discount / 100);
  //   const data = {
  //     amount: _finalPrice_ * 100,
  //     currency: 'mxn',
  //     metadata: {name: user.name},
  //     receipt_email: email,
  //     description: `Plan de entrenamiento personalizado - ${weeks} semanas.`,
  //     token: cardToken,
  //   };
  //   axios({
  //     method: 'POST',
  //     url: CHECKOUT_ENDPOINT,
  //     data: data,
  //     headers: {'Content-Type': 'application/json'},
  //   })
  //     .then(res => {
  //       const resStatus = res.status;

  //       if (resStatus === 200) {
  //         const paymentInfo = {
  //           id: res.data.id,
  //           receipt: {
  //             url: res.data.receipt_url,
  //             number: res.data.receipt_number,
  //             email: res.data.receipt_email,
  //           },
  //           date: new Date().valueOf(),
  //           amount: res.data.amount,
  //           card: res.data.payment_method_details.card,
  //         };

  //         setPaymentInfo(paymentInfo);
  //         savePayment(paymentInfo);
  //         _showSuccessModal();
  //         setLoading(false);
  //         Common.logEvent('payment_complete');
  //       } else {
  //         Common.showToast(`error: ${resStatus}`);
  //         Common.logEvent('payment_fail_request');
  //         setLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       Common.showToast(`axios: ${error}`);
  //       Common.logEvent('payment_fail_axios');
  //       setLoading(false);
  //       setEmail('');
  //       setCardToken({});
  //       setCardError(true);
  //     });
  // }

  // function savePayment(payment) {
  //   const databaseRef = `payments/v1/${user.id}/`;
  //   const ref = database().ref(databaseRef);
  //   ref.push(payment);
  // }

  // function _selectPaymentMethod(type) {
  //   if (type === 'oxxo') {
  //     showOxxoModal();
  //     Common.logEvent('oxxo_selected');
  //   }
  //   if (type === 'paypal') {
  //     showPaypalModal();
  //     Common.logEvent('paypal_selected');
  //   }
  //   if (type === 'card') {
  //     NetInfo.fetch().then(state => {
  //       if (state.isConnected && state.isInternetReachable) {
  //         getStripeToken();
  //       } else {
  //         Common.showToast('No hay conexión a internet');
  //       }
  //     });
  //     Common.logEvent('card_selected');
  //   }
  // }

  // async function getStripeToken() {
  //   try {
  //     const stripeToken = await stripe.paymentRequestWithCardForm();
  //     setCardToken({...stripeToken});
  //     setCardError(false);
  //     Common.logEvent('card_token_success');
  //   } catch (error) {
  //     Common.showToast(error);
  //     Common.logEvent('card_token_error');
  //   }
  // }

  // const showOxxoModal = () => setOxxoModal(!oxxoModal);
  // const showPaypalModal = () => setPaypalModal(!paypalModal);
  // const _showSuccessModal = () => setSuccesModal(!showSuccessModal);

  return (
    <View style={styles.mainContainer}>
      {/* <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.statusbarSubGrap} />
      <SubHeader title={'Completa tu pago'} />

      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={1}>
        <Article
          name={'Plan de entrenamiento personalizado'}
          weeks={weeks}
          price={finalPrice}
          user={user}
        />

        <View style={styles.sectionGrap}>
          <Text style={styles.priceLabel}>Método de pago</Text>
          <TouchableOpacity onPress={() => _selectPaymentMethod('card')}>
            <CardMethod token={cardToken} />
          </TouchableOpacity>
          {cardToken.tokenId ? null : (
            <>
              <TouchableOpacity onPress={() => _selectPaymentMethod('paypal')}>
                <PaypalMethod />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _selectPaymentMethod('oxxo')}>
                <OxxoMethod />
              </TouchableOpacity>
            </>
          )}
          {cardToken.tokenId ? (
            <View>
              <Text
                style={{
                  ...styles.priceLabel,
                  paddingTop: 10,
                  paddingBottom: 0,
                }}>
                Correo electrónico
              </Text>
              <TextInput
                placeholder={'tucorreo@gmail.com'}
                keyboardType={'email-address'}
                onChangeText={setEmail}
                value={email}
                style={{fontSize: 16, fontFamily: roboto.regular}}
              />
            </View>
          ) : null}
        </View>
        {cardError ? (
          <View style={{padding: 20}}>
            <Text>
              Ocurrió un error al procesar tu pago, estas pueden ser algunas de
              las razones:
            </Text>
            <Text>1. Los datos son incorrectos.</Text>
            <Text>2. No tienes fondos suficientes.</Text>
            <View>
              <Text>
                Intenta nuevamente o prueba con otra forma de pago. Si todavía
                tienes problemas
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://api.whatsapp.com/send?phone=523328151666`,
                  )
                }>
                <Text style={{textDecorationLine: 'underline'}}>
                  contacta un asesor.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {showSuccessModal === false ? (
          <TouchableOpacity onPress={() => _onPay()}>
            {email != '' && cardToken.tokenId ? (
              <View style={styles.btnGrapActive}>
                {loading ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <Text
                    style={styles.btnLabelActive}>{`Pagar $${finalPrice.toFixed(
                    2,
                  )} MXN`}</Text>
                )}
              </View>
            ) : (
              <View style={styles.btnGrapInactive}>
                <Text style={styles.btnLabelInactive}>Pagar</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : null}
        <OxxoModal
          visible={oxxoModal}
          show={() => showOxxoModal()}
          price={finalPrice}
        />
        <PaypalModal
          visible={paypalModal}
          show={() => showPaypalModal()}
          price={finalPrice}
        />
        <SuccessModal
          visible={showSuccessModal}
          show={() => _showSuccessModal()}
          info={paymentInfo}
          user={user}
        />
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusbarSubGrap: {
    width,
    height: StatusBar.currentHeight + 55,
  },
  btnGrapActive: {
    marginVertical: 40,
    width: width - 40,
    marginLeft: 20,
    backgroundColor: colors.primary_blue,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnLabelActive: {
    fontSize: 16,
    fontFamily: roboto.medium,
    color: 'white',
  },
  btnGrapInactive: {
    marginVertical: 40,
    width: width - 40,
    marginLeft: 20,
    backgroundColor: colors.backgroundGray,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnLabelInactive: {
    fontSize: 16,
    fontFamily: roboto.medium,
    color: 'rgba(0,0,0,.7)',
  },
  sectionGrap: {
    padding: 20,
    paddingBottom: 0,
    borderBottomColor: colors.backgroundGray,
    borderBottomWidth: 1,
    borderTopColor: colors.backgroundGray,
    borderTopWidth: 1,
  },
  priceLabel: {
    fontFamily: roboto.regular,
    fontSize: 16,
    color: 'black',
    paddingBottom: 20,
  },
});
