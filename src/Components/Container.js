import React from 'react';
import {
  Container,
  Text,
  Heading,
  Center,
  NativeBaseProvider,
} from 'native-base';

function Example() {
  return (
    <Center>
      <Container>
        <Heading>
          A component library for the
          <Text color="balck"> React Ecosystem</Text>
        </Heading>
        <Text mt="3" fontWeight="medium">
          NativeBase is a simple, modular and accessible component library that
          gives you building blocks to build you React applications.
        </Text>
      </Container>
    </Center>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
