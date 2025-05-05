import React from 'react';
import {Skeleton, VStack, Center, NativeBaseProvider} from 'native-base';

const Example = () => {
  return (
    <Center w="100%" style={{marginVertical: 5}}>
      <VStack
        w="100%"
        maxW="500"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center px="3" style={{marginVertical: 5}}>
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
