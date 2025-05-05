import React from 'react';
import {TextArea, Box, Center, NativeBaseProvider} from 'native-base';
import {COLORS} from '../../consts/colors';

const Example = ({text, value, fun}) => {
  return (
    <NativeBaseProvider>
      <Center px="3">
        <Box
          alignItems="center"
          w="100%"
          style={{
            marginTop: 10,
            borderColor: COLORS().lightBorder,
            // borderWidth: 0.1,
          }}>
          <TextArea
            w={{
              base: '85%',
              md: '25%',
            }}
            mx="180"
            size="xl"
            placeholder={text}
            value={value}
            onChangeText={e => fun(e)}
            // borderRadius={10}
            numberOfLines={20}
            style={{
              borderColor: COLORS().lightGrey,
              borderWidth: 0.8,
              color: COLORS().grey,
            }}
            color={COLORS().grey}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Example;
