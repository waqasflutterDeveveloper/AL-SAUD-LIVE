import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS} from '../../consts/colors';
import SCREEN from '../../../Layout'
const SearchCategory = ({ onPressType, onPressRooms, onPressPrice, onPressSort, }) => {
    return (
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={onPressType}>
                <Text style={styles.text}>Type</Text>
                <Text style={styles.textGrey}>Flat</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.text}>Rooms</Text>
                <Text style={styles.textGrey}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.text}>Price</Text>
                <Text style={styles.textGrey}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Fontisto name='arrow-swap' size={15} style={styles.transform} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchCategory

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS().bgInput,
        borderWidth: 1,
        borderColor: COLORS().stock,
        borderRadius: 8,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    text: {
        color: SCREEN.BLUE,
        fontSize: 13,
        fontWeight: 'bold',
    },
    textGrey: {
        color: COLORS().dark,
        fontSize: 13,
        marginHorizontal: 2,
        textAlign: 'center',
    },
    transform: {
        transform: [{ rotate: '90deg' }],
        color: SCREEN.BLUE,
    },
})