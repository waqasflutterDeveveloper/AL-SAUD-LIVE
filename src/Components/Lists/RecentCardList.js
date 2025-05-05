import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import RecentCard from '../Cards/RecentCard';
import {COLORS} from '../../consts/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';
const RecentCardList = ({title, data, settext, onPress}) => {
  const Item = ({item}) => <RecentCard title={item} settext={settext} />;
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => onPress()}>
          <Text style={[styles.title, {color: COLORS().red}]}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* <AntDesign name="close" size={20} color={COLORS().red} /> */}

      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={Item}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default RecentCardList;

const styles = StyleSheet.create({
  title: {color: COLORS().grey},
  container: {marginHorizontal: 20},
});
