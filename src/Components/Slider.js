import * as React from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Index({Data}) {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1, height: 350}}>
      <Carousel
        loop
        style={{height: 350}}
        width={width}
        height={width / 2}
        autoPlay={true}
        data={Data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current :', index)}
        renderItem={({item, index}) => (
          <View
            style={{
              height: '100%',
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Image style={{width: '100%', height: 350}} source={{uri: item}} />
          </View>
        )}
      />
    </View>
  );
}

export default Index;
