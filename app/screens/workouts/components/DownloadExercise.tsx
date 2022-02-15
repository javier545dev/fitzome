import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { ExerciseInterface } from '@resources/data/exercises';
import { roboto, colors } from 'styles'
import * as Common from 'common';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { updateNoRepitedExercises } from 'redux/slices/workoutsSlice';
import { toogledDownloading } from 'redux/slices/exercisesSlice';
import { exercisesUrls } from '../../../../resources/data/images';

import { useNavigation } from '@react-navigation/native';
import { setStorageValue, getStoragedValue } from 'local_storage';
import RNBackgroundDownloader from 'react-native-background-downloader';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';

const exerciseWidth = Common.width * .6;
const exerciseHeight = Common.width * .6;
let task: any;

interface Props {
  item: ExerciseInterface;
}

export interface SavedExerciseInterface {
  storageUrl: string;
  key: string;
  // volume_amount: number;
  // updates: number;
}

export default function DownloadExercise({ item }: Props) {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const downloading = useAppSelector(state => state.exercises.downloading);

  React.useEffect(() => {
    return () => {
      if (task) task.stop();
    };
  }, []);

  const url = item.url.split('exercises%2F')[1].split('.mp4')[0];
  const side =
    item.side === 'left' ? 'izquierda' : item.side === 'right' ? 'derecha' : '';

  /**
   * Check if an exercise is already downloading
   * @param key String
   */
  function checkIfCanDownload(key: string) {
    if (downloading) {
      Common.showToast('Un ejercicio ya se esta descargando');
    } else {
      checkInternet(key);
    }
  }
  /**
   * Check there is a estable internet connection
   * @param key String
   */
  function checkInternet(key: string) {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        checkFreeSpace(key);
      } else {
        Common.showToast('No hay conexión a internet');
      }
    });
  }
  /**
   * Check if there is free space on disk
   * @param key 
   */
  function checkFreeSpace(key: string) {
    const freeSpaceNeeded = 5000000;
    /**
     * Check disk
     */
    DeviceInfo.getFreeDiskStorage().then(freeDiskStorage => {
      if (freeDiskStorage > freeSpaceNeeded) {
        setLoading(true);
        dispatch(toogledDownloading(true))
        /**
         * Start download
         */
        downloadExercise(key);
      } else {
        Common.showToast('No tienes suficiente espacio');
      }
    });
  }

  function downloadExercise(key: string) {
    /**
     * Set exercise key
     */
    const name = `${key}.mp4`;
    /**
     * Set destination url
     */
    const destination = `${RNBackgroundDownloader.directories.documents
      }/${name}`;
    /**
     * Set up the download task
     */
    task = RNBackgroundDownloader.download({
      id: key,
      /**
       * Video url
       */
      url: item.url,
      /**
       * Donwload destinations
       */
      destination,
    });
    /**
     * Start donwload
     */
    task.begin(() => { });
    /**
     * Watch progress
     */
    task.progress((percent: number) => { });
    /**
     * Download task done
     */
    task
      .done(() => {
        setLoading(false);
        dispatch(toogledDownloading(false))
        saveExercise(destination, key);
      })
      .error((err: any) => {
        setLoading(false);
        dispatch(toogledDownloading(false))
        Common.showToast(`Error: ${err}`);
      });
  }

  /**
   * Save the exercise downloaded info
   * @param storageUrl Local storage url
   * @param key Exercise key
   */
  async function saveExercise(storageUrl: string, key: string) {
    let savedExercises: {
      [key: string]: SavedExerciseInterface;
    } = {}
    /**
     * The exercise to save
     */
    const exerciseToSave: SavedExerciseInterface = { storageUrl, key };
    /**
     * Get saved exercises
     */
    try {
      savedExercises = await getStoragedValue('exercises') ?? {};
    } catch (error) { }
    /**
     * Update exercises
     */
    savedExercises = {
      ...savedExercises,
      [exerciseToSave.key]: exerciseToSave,
    }
    /**
     * Save new exercises
     */
    saveExercises(savedExercises);
  }

  const saveExercises = async (exercises: {
    [key: string]: SavedExerciseInterface,
  }) => {
    try {
      /**
       * Save downloaded exercises
       */
      await setStorageValue('exercises', exercises);
      /**
       * Dispatch an event to update exercises carousel
       */
      dispatch(updateNoRepitedExercises());
    } catch (e) {
      /**
       * Show error
       */
      Common.showToast(`${e}`);
    }
  };

  function watchExercise(url: string | undefined) {
    navigation.navigate('Watch_Exercise', { url });
  }

  return (
    <View style={styles.grap}>
      <View>
        <Image source={exercisesUrls[url]} style={styles.images} />
        {item.video ? (
          <View style={styles.btnGrap}>
            <Pressable onPress={() => watchExercise(item.video)}>
              <View style={styles.btn}>
                <Icon name={'play'} color={'white'} size={28} />
              </View>
            </Pressable>
          </View>
        ) : (
          <View style={styles.btnGrap}>
            {loading ? (
              <View style={styles.btn}>
                <ActivityIndicator color={'white'} size={'small'} />
              </View>
            ) : (
              <Pressable onPress={() => checkIfCanDownload(item.key)}>
                <View style={styles.btn}>
                  <Icon name={'play'} color={'white'} size={28} />
                </View>
                <View style={styles.arrowGrap}>
                  <Icon
                    name={'ios-arrow-down-circle'}
                    color={colors.primary_blue}
                    size={28}
                  />
                </View>
              </Pressable>
            )}
          </View>
        )}
      </View>
      <Text style={styles.name}>{`${item.name} ${side}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  grap: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  btnGrap: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 10,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'rgba(0,0,0,.7)',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowGrap: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  images: {
    width: exerciseWidth,
    height: exerciseHeight,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    lineHeight: 16,
    paddingTop: 10,
    width: exerciseWidth,
    textTransform: 'capitalize',
    fontFamily: roboto.regular,
  },
  label: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: roboto.regular,
    color: 'white',
  },
});
