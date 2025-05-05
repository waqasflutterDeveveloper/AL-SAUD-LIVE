/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './wrapp';
import {name as appName} from './app.json';
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';

// Enable RTL based on device language
// const isRTL = RNLocalize.isRTL;

// if (isRTL) {
//   I18nManager.forceRTL(true);
//   I18nManager.allowRTL(true);
// } else {
//   I18nManager.forceRTL(false);
//   I18nManager.allowRTL(false);
// }

AppRegistry.registerComponent(appName, () => App);
