import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {COLORS} from '../../consts/colors';
import PopularCard from '../Cards/PopularCard';

const PopularCardList = ({title, data, settext}) => {
  const Item = ({item}) => <PopularCard title={item.name} settext={settext} />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={Item}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default PopularCardList;

const styles = StyleSheet.create({
  title: {color: COLORS().grey},
  container: {marginHorizontal: 20, marginTop: 10},
  list: {flexDirection: 'row', flexWrap: 'wrap'},
});
