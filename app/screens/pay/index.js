import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

//import { showToast } from '../../docs';
import * as Common from 'common';
//import { androidProducts } from '../../products_store/';

import * as RNIap from 'react-native-iap';

const itemSkus = Platform.select({
  android: ['8_weeks_custom_plan', '4_weeks_custom_plan', 'test_product'],
});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setUpInAppPurchase();

    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async purchase => {
        if (
          purchase.purchaseStateAndroid === 1 &&
          !purchase.isAcknowledgedAndroid
        ) {
          try {
            const ackResult = await RNIap.acknowledgePurchaseAndroid(
              purchase.purchaseToken,
            );
            // console.log('ackResult', ackResult);
          } catch (ackErr) {
            //console.warn('ackErr', ackErr);
          }
        }
        const receipt = purchase.transactionReceipt;
        await RNIap.finishTransaction(purchase, true);
        purchaseConfirmed(receipt);
        purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
          Common.showToast(`purchaseErrorListener: ${error}`);
        });
      },
    );

    return () => {
      finishStoreConexion();
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    };
  }, []);

  async function finishStoreConexion() {
    try {
      await RNIap.endConnection();
    } catch (err) {
      Common.showToast(`${err}`);
    }
  }

  async function setUpInAppPurchase() {
    try {
      const result = await RNIap.initConnection();
      const products = await RNIap.getProducts(itemSkus);
      setProducts([...products]);
      //console.log(`${result}`, products[0]);
    } catch (err) {
      Common.showToast(`${err}`);
    }
  }

  async function requestPurchase(sku) {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      Common.showToast(`${err}`);
    }
  }

  function purchaseConfirmed(receipt) {
    console.log(receipt);
  }

  return (
    <View>
      <Text>Poductos</Text>
      {products.map((val, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => requestPurchase(itemSkus[i])}>
            <View style={{padding: 40}}>
              <Text>{`${JSON.parse(val.originalJson).description}`}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
