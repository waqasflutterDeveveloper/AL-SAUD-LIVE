import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SmallCard from '../Cards/SmallCard';
import {useNavigation} from '@react-navigation/native';
import {propertybytypeApi} from '../../apis/Home';

const SmallCadList = ({data}) => {
  const navigation = useNavigation();
  const {mutate: propertybytypeCall} = propertybytypeApi();
  const HandleSubmit = async (id, title) => {
    // propertybytypeCall();
    navigation.navigate('houses', {type: 'property_by_type', id, title});
  };

  const Item = ({item}) => (
    <>
      {item.NUmberـofـFlats > 0 && (
        <SmallCard
          id={item.id}
          onPress={() => HandleSubmit(item.id, item['Type Name'])}
          title={item['Type Name']}
          img={
            item?.Image
              ? {uri: `data:image/jpeg;base64,${item?.Image}`}
              : {uri: 'https://static.thenounproject.com/png/2085889-200.png'}
          }
          dec={item.NUmberـofـFlats}
        />
      )}
    </>
  );
  return (
    <View>
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

export default SmallCadList;

const styles = StyleSheet.create({});
