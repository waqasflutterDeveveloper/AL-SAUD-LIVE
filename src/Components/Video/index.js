import React, {useState, useCallback, useRef} from 'react';
import {Button, View, Alert, Text} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {COLORS} from '../../consts/colors';

export default function VideoPlayer({videoId}) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const [isReadyForRender, setIsReadyForRender] = useState(false);

  function onReady() {
    setIsReadyForRender(true);
  }
  return (
    <View>
      {/* <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: COLORS().dark,
          marginBottom: 10,
        }}>
        Video
      </Text> */}
      {videoId && (
        <YoutubePlayer
          height={200}
          initialPlayerParams={{
            controls: 0,
          }}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          onReady={onReady}
          webViewStyle={{
            opacity: 0.99,
            display: isReadyForRender ? 'flex' : 'none',
          }}
          webViewProps={{
            androidLayerType: isReadyForRender ? 'hardware' : 'software',
          }}
        />
      )}

      {/* <Button title={playing ? 'pause' : 'play'} onPress={onReady} /> */}
    </View>
  );
}
