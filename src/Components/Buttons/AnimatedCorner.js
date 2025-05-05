import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../consts/colors';
import {useSelector} from 'react-redux';

const FloatingButton = () => {
  const [icon_1] = useState(new Animated.Value(20));
  const [icon_2] = useState(new Animated.Value(20));
  const [icon_3] = useState(new Animated.Value(20));
  const {isDark} = useSelector(state => state.Home);

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Animated.View style={[styles.circle, {bottom: icon_1}]}>
        <TouchableOpacity>
          <Icon name="cloud-upload" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity>
          <Icon name="print" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {right: icon_3}]}>
        <TouchableOpacity>
          <Icon name="share-alt" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}>
        <MaterialIcons name="support-agent" color={COLORS().white} size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS().red,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
