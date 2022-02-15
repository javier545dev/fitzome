import AsyncStorage from '@react-native-community/async-storage';
import {StorageKeys} from './keys';
import {AppEvents} from 'analitycs/events';
import {logEvent} from 'analitycs';
// import * as SecureStore from 'expo-secure-store';

type KeyType = StorageKeys | string;

/**
 * Return the storage value or null
 *
 */
async function getStoragedValue(key: KeyType) {
  try {
    const result = await AsyncStorage.getItem(`@${key}`);
    const response = result != null ? JSON.parse(result) : null;
    return response;
  } catch (e) {
    logEvent(AppEvents.get_storaged_value_err);
    return null;
  }
}

/**
 * Set a value type: object | string without => @
 *
 */
async function setStorageValue(
  key: KeyType,
  value: object | string | Array<any>,
) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    logEvent(AppEvents.set_storaged_value_err);
  }
}
/**
 * Remove a value
 *
 * @param key the key
 */
async function removeStorageValue(key: KeyType) {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    // save error
  }
}

/**
 * Save encrypted key–value pairs
 *
 * @param key
 * @param value The value to store. Size limit is 2048 bytes.
 */
// async function secureStoreSaveValue(key: string, value: string) {
//   try {
//     await SecureStore.setItemAsync(key, value);
//   } catch (error) {}
// }

/**
 * Fetch the stored value associated with the provided key.
 *
 * @param key
 * @returns the value or null
 */
// async function secureStoreGetValue(key: string) {
//   try {
//     const result = await SecureStore.getItemAsync(key);
//     return result;
//   } catch (error) {
//     return null;
//   }
// }

export {
  getStoragedValue,
  setStorageValue,
  removeStorageValue,
  // secureStoreSaveValue,
  // secureStoreGetValue,
};
