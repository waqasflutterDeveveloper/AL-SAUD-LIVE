import React ,{useState}from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CloseHeader = ({title, style}) => {
  const navigation = useNavigation();
  const [disable, setdisable] = useState(false);

  return (
    <View style={[styles.container, {...style}]}>
      <TouchableOpacity
      disabled={disable}
        onPress={() => {
          navigation.goBack();
          setdisable(true)
          setTimeout(() => {
            setdisable(false)
       
          }, 1000);
        }}>
        <Icon
          name="close-outline"
          size={26}
          color={'black'}
          style={styles.back}
        />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default CloseHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {fontWeight: '700', fontSize: 18, color: 'black', marginLeft: 4},
  back: {marginHorizontal: 10},
});
