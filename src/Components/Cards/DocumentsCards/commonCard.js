import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../consts/colors';

const CommonCard = ({item}) => {
  return (
    <View style={styles.Maincontainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Rent Value</Text>
        <Text style={styles.text}>{item?.total_value} AED /Annully</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Contract End: </Text>
        <Text style={styles.text}>{item?.date_to} </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Next Cheuqe Date: </Text>
        <Text style={styles.text}>3/8/2024 static</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Insurance Amount </Text>
        <Text style={styles.text}>{item?.insurance_amount} </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Rent Period </Text>
        <Text style={styles.text}>{item?.rent_period}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Maincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 50,
    width: '90%',
    flexDirection: 'column',
    borderRadius: 5,
    borderColor: COLORS().bottomBorder,
    borderWidth: 1,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '90%',
    borderColor: 'white',
    borderBottomColor: COLORS().bottomBorder,
    borderWidth: 1,
    marginVertical: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 14,
    color: COLORS().lightGrey,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontSize: 14,
    color: COLORS().blue,
    marginHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CommonCard;
