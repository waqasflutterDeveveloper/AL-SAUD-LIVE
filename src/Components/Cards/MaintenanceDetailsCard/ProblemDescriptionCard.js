import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../consts/colors';
import font from '../../../consts/font';
import HTMLView from 'react-native-htmlview';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util';

const ScreenWidth = Dimensions.get('window').width;

const ProblemDescriptionCard = ({
  title,
  video,
  image,
  isVideo,
  attach = [],
}) => {
  const {isDark} = useSelector(state => state.Home);

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const downloadFile = fileUrl => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = ReactNativeBlobUtil;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        // console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };
  return (
    <>
      {image ||
        (title && (
          <View
            style={[
              style.container,
              {backgroundColor: COLORS(isDark).greyForDark},
            ]}>
            <View style={style.row}>
              {title && (
                <>
                  <Text style={style.textblue} numberOfLines={1}>
                    Problem Description
                  </Text>
                  <HTMLView stylesheet={style} value={`${title}`} />
                  {attach && attach?.length > 0 && (
                    <>
                      <Text numberOfLines={1} style={{marginTop: 20}}>
                        Attachments{' '}
                      </Text>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        {attach?.map(item => (
                          <View style={style.textbox}>
                            {/* {console.log(item?.url, 'item?.url')} */}
                            {item && (
                              <TouchableOpacity
                                style={style.videoContainer}
                                onPress={() => downloadFile(item?.url)}>
                                <AntDesign
                                  style={{fontSize: 20, color: COLORS().blue}}
                                  name="download"
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                </>
              )}
            </View>

            {/* <View style={style.imagebox}>
              {image && (
                <>
                  <Image
                    style={style.icon3}
                    source={image}
                    resizeMode="contain"
                  />

                  <Text style={{color: COLORS().black, fontSize: 14}}>
                    Image. Jpg
                  </Text>
                </>
              )}

              {isVideo && (
                <Video
                  source={{
                    uri: video,
                  }}
                  style={style.backgroundVideo}
                />
              )}
            </View> */}
          </View>
        ))}
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: COLORS().white,
    borderRadius: 12,
    marginVertical: 10,
    width: ScreenWidth * 0.9,
    // height: 100,
    borderWidth: 1,
    borderColor: COLORS().stock,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: 'red',
  },
  backgroundVideo: {
    // backgroundColor: 'red',
    width: '100%',
    height: 150,
  },
  videoContainer: {},
  textbox: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: COLORS().backgroundLight,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: 'black',
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },

  text: {
    color: COLORS().dark,
    fontWeight: '400',
    fontSize: 14,
    width: '100%',
    marginVertical: 10,
  },
  textblue: {
    color: COLORS().blue,
    fontWeight: '500',
    fontSize: 14,
    width: '100%',
    marginVertical: 10,
  },
  imagebox: {
    borderRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    marginVertical: 10,
  },
  icon3: {
    marginRight: 10,
    backgroundColor: COLORS().white,
    padding: 6,
    borderRadius: 7,
    width: 40,
    height: 40,
  },
  p: {
    fontWeight: '300',
    color: COLORS().blue, // make links coloured pink
  },
});

export default ProblemDescriptionCard;
