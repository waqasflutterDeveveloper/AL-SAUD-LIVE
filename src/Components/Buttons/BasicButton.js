import React from 'react';
import {Button, VStack, Center, NativeBaseProvider} from 'native-base';
import {COLORS} from '../../consts/colors';
import {Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingDots from 'react-native-loading-dots';

const Example = ({
  text,
  width,
  type,
  onPress,
  color,
  Icon,
  disable,
  height = 55,
  styleText,
  style,
  outline,
  textcolor,
  textSize,
  isLoading = false,
}) => {
  return (
    <NativeBaseProvider>
      <Center
        // flex={1}
        px="3"
        style={{height: 50}}>
        <Button
          w={{
            base: '62%',
            base: type == 'filter' ? '92%' : '62%',
            md: type == 'filter' ? '15%' : '25%',
          }}
          onPress={onPress}
          height={height}
          disabled={disable}
          fontWeight="bold"
          fontSize={22}
          borderRadius={12}
          style={{
            backgroundColor: color ? color : COLORS().red,
            borderColor: outline ? outline : 'transparent',
            borderWidth: 1,
            ...style,
          }}
          mx={width ? width : '180'}
          size={'md'}>
          <>
            {isLoading ? (
              <View style={styles.dotsWrapper}>
                <LoadingDots
                  bounceHeight={5}
                  colors={['white', 'white', 'white', 'white']}
                  size={10}
                />
              </View>
            ) : (
              <>
                <View style={styles.iconBox}>
                  {Icon && Icon}
                  {type && type == 'back' ? (
                    <MaterialIcons
                      name="arrow-back-ios"
                      size={22}
                      color={COLORS().white}
                    />
                  ) : null}
                  <Text
                    style={{
                      ...styles.text,
                      fontSize: textSize ? textSize : 18,

                      color: textcolor ? textcolor : COLORS().white,
                      ...styleText,
                    }}>
                    {text}
                  </Text>
                  {!type && !Icon && (
                    <Ionicons
                      name="arrow-forward"
                      size={22}
                      color={COLORS().white}
                    />
                  )}
                </View>
              </>
            )}
          </>
        </Button>
      </Center>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',

    marginHorizontal: 8,
  },

  dotsWrapper: {
    width: 50,
  },
});

export default Example;
