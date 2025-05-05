import React, {useEffect} from 'react';
import {
  Button,
  useToast,
  VStack,
  HStack,
  Text,
  Center,
  IconButton,
  CloseIcon,
  Alert,
  NativeBaseProvider,
} from 'native-base';

const Example = () => {
  const toast = useToast();
  const ToastDetails = [
    {
      title: 'Network connection restored',
      variant: 'left-accent',
      description:
        'This is to inform you that your network connectivity is restored',
      isClosable: true,
    },
    //   }, {
    //     title: "Invalid email address",
    //     variant: "top-accent",
    //     description: "Please enter a valid email address"
    //   }, {
    //     title: "Invalid email address",
    //     variant: "outline",
    //     description: "Please enter a valid email address"
  ];

  const ToastAlert = ({
    id,
    status,
    variant,
    title,
    description,
    isClosable,
    ...rest
  }) => (
    <Alert
      alignSelf="center"
      flexDirection="row"
      status={status ? status : 'info'}
      variant={variant}
      style={{height: 50}}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : null
              }>
              {'Network connection restored'}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === 'solid' ? 'lightText' : 'darkText',
              }}
              onPress={() => toast.close(id)}
            />
          ) : null}
        </HStack>
      </VStack>
    </Alert>
  );
  useEffect(() => {
    toast.show({
      render: ({id}) => {
        return <ToastAlert id={2} {...ToastDetails[2]} />;
      },
    });

    return () => {};
  }, []);
};

export default () => {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
};
