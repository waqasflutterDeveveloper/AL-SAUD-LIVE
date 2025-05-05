import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

import 'react-native-gesture-handler';

import NewNavDesign from './NewNavDesign';
import MainStack from './MainNav';
import {KeyboardAvoidingView, View, Keyboard} from 'react-native';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

function WrapperWithBottomMenu({}) {
  const navigation = useNavigation();
  const [showBottomComponent, setShowBottomComponent] = useState(true);
  const {isDark} = useSelector(state => state.Home);

  // Define the name of the first screen you want to check against
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowBottomComponent(false);
  };

  const _keyboardDidHide = () => {
    setShowBottomComponent(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: isDark ? 'black' : 'white'}}
        behavior={'height'}>
        <View style={{height: SCREEN_HEIGHT - 90}}>
          <MainStack />
        </View>
        {showBottomComponent && (
          <NewNavDesign navigation={navigation} index={0} />
        )}
      </KeyboardAvoidingView>
    </>

    // </ScrollView>
  );
}

export default WrapperWithBottomMenu;
