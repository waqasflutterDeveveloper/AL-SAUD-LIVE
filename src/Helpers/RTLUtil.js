import {I18nManager} from 'react-native';

export function getRTL() {
  // console.log(I18nManager.isRTL, 'I18nManager.isRTL');
  return I18nManager.isRTL;
}
