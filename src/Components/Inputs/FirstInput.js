import React from 'react';
import {Input, Box, Center, NativeBaseProvider, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../consts/colors';
import {useSelector} from 'react-redux';

const Example = ({
  text,
  Icon,
  value,
  fun,
  type,
  height,
  width,
  bgcolor,
  disabled,
}) => {
  const {isDark} = useSelector(state => state.Home);

  return (
    <NativeBaseProvider>
      <Box
        alignItems="center"
        style={{
          borderColor: '#969494',
          // borderWidth: 0.5,
          borderRadius: 7,
          backgroundColor: COLORS(isDark).dark,
        }}>
        <Input
          type={type ? type : 'text'}
          InputLeftElement={Icon}
          w={{
            base: '95%',
            md: '20%',
          }}
          isDisabled={disabled ? disabled : false}
          // mx={width ? width : 155}
          size="sm"
          height={height ? height : 55}
          placeholder={text}
          value={value}
          variant="filled"
          onChangeText={e => fun(e)}
          borderRadius={8}
          bgColor={COLORS(isDark).dark}
          style={{width: '100%'}}
        />
      </Box>
    </NativeBaseProvider>
  );
};

export default Example;
