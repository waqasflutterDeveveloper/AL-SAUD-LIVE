import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import MediumCard from '../Cards/MediumCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const MediumCadList = ({data, headText}) => {
  const navigation = useNavigation();

  const HandleSubmit = async id => {
    // propertybytypeCall();
    navigation.navigate('houses', {type: 'property_by_state', id});
  };
  const Item = ({item}) => (
    <MediumCard
      // onPress={() => navigation.navigate('Search')}
      onPress={() => HandleSubmit(item.id)}
      title={item['Name']}
      img={
        item?.Image
          ? {uri: `data:image/jpeg;base64,${item?.Image}`}
          : {uri: 'https://static.thenounproject.com/png/2085889-200.png'}
      }
      dec={item.Numberـofـflats}
    />
  );
  const {isDark} = useSelector(state => state.Home);

  return (
    <View>
      <Text style={[styles.headText, {color: COLORS(isDark).WhiteForDark}]}>
        {headText}
      </Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default MediumCadList;

const styles = StyleSheet.create({
  headText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS().black,
    marginVertical: font.xl,
    marginHorizontal: font.xl,
  },
});
