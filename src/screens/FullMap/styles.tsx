import { StyleSheet } from 'react-native';
import {COLORS} from '../../consts/colors';
import Font from '../../consts/font';
import SCREEN from '../../../Layout'
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS().white,
        flex: 1,
        height: Font.height,
    },
    down: { height: Font.height * .18 },
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: '90%',
    },
    box: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderColor: SCREEN.GREY,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 14,
    },
    img: { height: 25, width: 25 },
    titleModal: {
        color: SCREEN.DARKGREY,
        marginHorizontal: 10,
        fontSize: 14,
    },
});
export default styles;