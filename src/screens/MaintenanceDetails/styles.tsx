import {StatusBar, StyleSheet} from 'react-native';
import {COLORS} from '../../consts/colors';
import Font from '../../consts/font';
import SCREEN from '../../../Layout';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS().white,
    // flex: 1,
    // height: SCREEN.HEIGHT - StatusBar.currentHeight - 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    height: SCREEN.HEIGHT,
  },
  down: {height: Font.height * 0.18},
});
export default styles;
