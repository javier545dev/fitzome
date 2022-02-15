import {spanishLabelsDirectory} from './es';
import {DirectoryInterface, languageTypes} from './types';

export default function getLabels(lang?: languageTypes): DirectoryInterface {
  if (lang === 'es') {
    return spanishLabelsDirectory;
  } else {
    return spanishLabelsDirectory;
  }
}

/**
 * Muscles directory names (to spanish)
 */
export const musclesDirectory = {
  all: 'cuerpo completo',
  ankle: 'tobillo',
  lumbar: 'lumbares',
  back: 'espalda',
  leg: 'pierna',
  glute: 'glúteo',
  groin: 'ingle',
  hip: 'cadera',
  upper_abs: 'abs superior',
  lower_abs: 'abs inferior',
  obliques: 'oblicuos',
  arm: 'brazos',
  shoulder: 'hombros',
  chest: 'pecho',
  wrist: 'muñeca',
  knee: 'rodilla',
};
