import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import TimePicker from '../Components/Inputs/TimePicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReactNativeBlobUtil from 'react-native-blob-util';

// import Toast from 'react-native-simple-toast';
import BottomSheetRec from '../Components/Sheets/BottomSheetRec';
import BasicButton from '../Components/Buttons/BasicButton';
import SelectBox from '../Components/Inputs/SelectBox';

import {COLORS} from '../consts/colors';
import TextArea from '../Components/Inputs/TextArea';
const {width} = Dimensions.get('screen');
import {api} from '../axios';
import PickFiles from '../Components/PickFiles';
import {useSelector} from 'react-redux';
import {useValidation} from 'react-native-form-validator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from '@react-native-material/core';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import myUploadsSlice, {
  resetUpload,
  setMyUploads,
  setMyUploadsAll,
  setloadingImageUpload,
} from '../Store/upload/myUploadsSlice';
import Spinner from '../Components/Spinner';
import Steper from '../Components/Steper';
import {setShowToast} from '../Store/Toast';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CreateRequestScreen = ({navigation, route}) => {
  const [RequestTypeData, setRequestTypeData] = useState([]);

  const [RequestLocationsData, setRequestLocationsData] = useState([]);

  const [photo, setphoto] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const {urls, loadingImageUpload} = useSelector(state => state.uploads);

  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const {isDark} = useSelector(state => state.Home);
  // const [loadingImageUpload, setloadingImageUpload] = useState(false);
  const [nameError, setnameError] = useState(false);
  const [locationError, setlocationError] = useState(false);
  const [perferred_timeEroor, setperferred_timeError] = useState(false);
  const [typeError, settypeError] = useState(false);
  const [subtypeError, setsubtypeError] = useState(false);
  const [location, setlocation] = useState('');
  const [perferred_time, setperferred_time] = useState(new Date());

  const [type, settype] = useState('');
  const [subtype, setSubtype] = useState('');

  const [allFilesdata, setallFilesdata] = React.useState([]);

  const [description, setDescription] = useState('');
  const {userInfo} = useSelector(state => state.userinfo);
  const isSunday = moment(perferred_time).day() === 0;
  const startTime = moment(perferred_time).set({
    hour: 8,
    minute: 30,
    second: 0,
    millisecond: 0,
  });
  const endTime = moment(perferred_time).set({
    hour: 16,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const isWithinTimeRange = moment(perferred_time).isBetween(
    startTime,
    endTime,
    'minute', // Granularity for comparison
    '[)', // Inclusivity: '[' means inclusive, ')' means exclusive
  );

  const callRquestTypes = async () => {
    try {
      const result = await api.post('api/maintenance_request_types', {});
      setRequestTypeData(result.data.result?.records);
    } catch (error) {}
  };
  const callRquestLocations = async () => {
    try {
      const result = await api.post('api/maintenance_request_location', {});
      // console.log(result.data.result?.records, 'result.data.result locations');
      setRequestLocationsData(result.data.result?.records);
    } catch (error) {}
  };
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const uploadImagetoFirebase = async uri => {
    dispatch(setloadingImageUpload(true));
    // const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);

    try {
      const res = await task;
      // console.error(res.metadata.fullPath, 'res res');
      dispatch(
        setMyUploads(
          `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
        ),
      );
      dispatch(setloadingImageUpload(false));
    } catch (e) {
      // console.error(e, 'eeeee');
    }
  };
  const UploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      // includeBase64: true,
    };
    dispatch(setloadingImageUpload(true));

    launchCamera(options, async res => {
      if (res.didCancel) {
      } else if (res.errorCode == 'permission') {
      } else if (res.errorCode == 'others') {
      } else {
        dispatch(setloadingImageUpload(true));
        // setphoto([`data:image/png;base64,${res.assets[0].uri}`]);
        uploadImagetoFirebase(res.assets[0].uri);
        // setpicName(res.assets[0].fileName);
        setallFilesdata([{type: 'image/png', name: 'photo'}]);
        // dispatch(setloadingImageUpload(false));
      }
    });
  };
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {name, type, photo, description},
    });

  var callRequested = false;
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingBtn, setisloadingBtn] = useState(false);

  const callCreateReq = async () => {
    // setisloadingBtn(true);
    setIsloading(true);
    const date = moment(perferred_time).format('YYYY-MM-DD HH:mm');
    // moment(, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z')
    // const hours = date.format('HH');
    // const minutes = date.format('mm');
    // console.log(date, 'date date date');
    // console.log(
    //   {
    //     params: {
    //       flat: selectedProp?.id,
    //       partner: userInfo?.partner_id,
    //       name: name,
    //       description: description,
    //       type: type?.id,
    //       files: urls,
    //       preferred_time: `${hours}:${minutes}`,
    //       location: location?.id,
    //       sub_type_id: subtype?.id,
    //     },
    //   },
    //   ' obj',
    // );
    // setIsloading(true);
    // if (!name) {
    //   setnameError(true);
    // }
    // if (!location) {
    //   setlocationError(true);
    // }
    // if (!perferred_time) {
    //   setperferred_timeError(true);
    // }
    // if (!type) {
    //   settypeError(true);
    // }
    // if (!subtype) {
    //   setsubtypeError(true);
    // }

    try {
      setIsloading(true);

      // setDisable(true);

      const res = await api.post('api/property_create_request', {
        params: {
          flat: selectedProp?.id,
          partner: userInfo?.partner_id,
          name: name,
          description: description,
          type: type?.id,
          files: urls,
          preferred_time: date,
          location: location?.id,
          sub_type_id: subtype?.id,
        },
      });
      // console.log(res, 'resss');
      if (res?.data?.result) {
        setIsloading(false);

        // Toast.show('Request Created Succefully.', Toast.LONG, {
        //   backgroundColor: 'orange',
        // });
        dispatch(setShowToast(true));
        setTimeout(() => {
          dispatch(setShowToast(false));
        }, 2000);
        dispatch(resetUpload());
        dispatch(setMyUploads(''));
        navigation.goBack();
      }
      //
    } catch (error) {
      setDisable(false);
      setIsloading(false);

      // console.log(error, 'errorrrr');
    }
  };
  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  useEffect(() => {
    callRquestTypes();
    callRquestLocations();
    return () => {};
  }, []);
  const data = route.params;

  useEffect(() => {
    if (data?.data && data?.route == 'VoiceRecord') {
      dispatch(setMyUploads(data.data));
      dispatch(setloadingImageUpload(false));
    }

    // setname(data.)

    setDescription(data?.description);
    setname(data?.name);
    settype(data?.type);
    return () => {};
  }, [data]);
  const [images, setImages] = useState([]);
  function extractImageURLs(longString) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']; // Add more extensions if needed

    // Split the long string by comma to get an array of individual URLs
    const localurls = longString.split(',');

    // Filter out the URLs that contain image extensions
    const imageUrls = localurls.filter(url => {
      const lowerCaseURL = url.toLowerCase();
      return imageExtensions.some(extension =>
        lowerCaseURL.includes(extension),
      );
    });

    return imageUrls;
  }
  useEffect(() => {
    if (urls) {
      setImages(extractImageURLs(urls));
    }
  }, [urls]);
  // useEffect(() => {
  //   if (images) {
  //     console.log(images);
  //   }
  // }, [images]);
  const [popup, setpopup] = useState(false);
  const [selectedVideo, setselectedVideo] = useState(false);

  const handlePopupBtn = route => {
    setpopup(false);
  };
  const [urlsAsArray, setUrlsAsArray] = useState([]);
  const handeleDeleteFile = url => {
    let filteredArray = urlsAsArray.filter(function (item) {
      return item !== url;
    });
    if (filteredArray?.length > 0) {
      dispatch(setMyUploadsAll(filteredArray.join(',')));
    } else {
      dispatch(setMyUploadsAll(''));
      setUrlsAsArray([]);
    }
  };
  useEffect(() => {
    if (urls) {
      setUrlsAsArray(urls?.split(','));
    }
  }, [urls]);
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
        alert('File Downloaded Successfully.');
      });
  };
  const Card = ({url, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
          position: 'relative',

          borderColor: COLORS().blue,
          borderWidth: 1,
          borderRadius: 5,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => handeleDeleteFile(url)}
          style={{
            position: 'absolute',
            top: 2,
            right: 0,
            zIndex: 22222,
          }}>
          <MaterialIcons
            name="delete-forever"
            size={25}
            color={COLORS().error}
            style={{position: 'absolute', top: 2, right: 0, zIndex: 22222}}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: COLORS().blue,
            borderRadius: 5,
            marginVertical: 10,
            marginHorizontal: 10,
            padding: 10,
          }}>
          <Image
            source={{uri: url}}
            style={{
              width: 50,
              height: 50,
              padding: 10,
            }}
          />
        </View>
      </View>
    );
  };
  const CardVideo = ({url, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
          position: 'relative',
          borderColor: COLORS().blue,
          borderWidth: 1,
          borderRadius: 5,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => handeleDeleteFile(url)}
          style={{position: 'absolute', top: 2, right: 0, zIndex: 22222}}>
          <MaterialIcons
            name="delete-forever"
            size={25}
            color={COLORS().error}
            style={{position: 'absolute', top: 2, right: 0, zIndex: 22222}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            downloadFile(url);
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 10,
              padding: 10,
              backgroundColor: COLORS().blue,
              borderRadius: 5,
            }}>
            <View>
              <>
                <FontAwesome
                  name="file-video-o"
                  color="black"
                  style={{borderRadius: 10, fontSize: 50}}
                />
              </>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const CardRecord = ({url, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderColor: COLORS().blue,
          borderWidth: 1,
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
          position: 'relative',

          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => handeleDeleteFile(url)}
          style={{position: 'absolute', top: 2, right: 0, zIndex: 22222}}>
          <MaterialIcons
            name="delete-forever"
            size={25}
            color={COLORS().error}
            style={{position: 'absolute', top: 2, right: 0, zIndex: 22222}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            downloadFile(url);
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 10,
              padding: 10,
              backgroundColor: COLORS().blue,
              borderRadius: 5,
            }}>
            <View>
              <>
                <MaterialIcons
                  name="record-voice-over"
                  color="black"
                  style={{borderRadius: 10, fontSize: 50}}
                />
              </>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        backgroundColor: COLORS(isDark).cardForDark,
        height: SCREEN_HEIGHT,
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Steper
        isNextBtnDisabled={loadingImageUpload || urls.length == 0}
        isNextBtnDisabledForFirstStep={
          !name ||
          !perferred_time ||
          !type ||
          !location ||
          isSunday ||
          !isWithinTimeRange
        }
        first={
          <View
            style={[
              style.detailsContainer,
              {backgroundColor: COLORS(isDark).cardForDark},
            ]}>
            <Image source={require('../assets/png/Maintenance.png')} />
            <TextInput
              variant="outlined"
              label="Request Name"
              placeholderTextColor={COLORS().blue}
              style={{
                marginTop: 15,
                borderRadius: 10,
                width: '100%',
                borderColor: COLORS().lightBorder,
                // borderWidth: 1,
              }}
              color={COLORS().blue}
              borderRadius={10}
              value={name}
              onChangeText={e => setname(e)}
              // borderColor={COLORS().red}
              // borderWidth={1}
            />
            {nameError && <Text style={{color: 'red'}}>Name is Required</Text>}

            <SelectBox
              Type="Select Location"
              data={RequestLocationsData}
              settype={setlocation}
              type={location}
            />
            {/* <TextInput
              variant="outlined"
              label="Location "
              placeholderTextColor={COLORS().blue}
              style={{
                marginTop: 15,
                borderRadius: 5,
                width: '100%',
                borderColor: COLORS().lightBorder,
                // borderWidth: 1,
              }}
              color={COLORS().blue}
              borderRadius={10}
              value={location}
              onChangeText={e => setlocation(e)}
              // borderColor={COLORS().red}
              // borderWidth={1}
            /> */}
            {locationError && (
              <Text style={{color: 'red'}}>Location is Required</Text>
            )}
            <TimePicker
              setperferred_time={setperferred_time}
              perferred_time={perferred_time}
            />

            {perferred_timeEroor && (
              <Text style={{color: 'red'}}>Preferred Time is Required</Text>
            )}
            {(!isWithinTimeRange || isSunday) && (
              <Text style={{color: 'red'}}>
                Time Allowed between (8:30 To 16:00 ) everyday except sunday
              </Text>
            )}
            <SelectBox
              Type="Select  Type"
              data={RequestTypeData}
              settype={settype}
              type={type}
            />
            {typeError && <Text style={{color: 'red'}}>Type is Required</Text>}

            <SelectBox
              Type="Select Sub Type"
              data={type?.sub_types}
              settype={setSubtype}
              type={subtype}
            />
            {subtypeError && (
              <Text style={{color: 'red'}}>Sub type is Required</Text>
            )}
          </View>
        }
        third={
          <View
            style={[
              style.detailsContainer,
              {backgroundColor: COLORS(isDark).cardForDark},
            ]}>
            <TextArea
              text="Issue Description"
              style={{width: '100%'}}
              value={description}
              fun={e => setDescription(e)}
            />
            {isFieldInError('description') &&
              getErrorsInField('description').map(errorMessage => (
                <Text key={errorMessage} style={{color: 'red'}}>
                  {errorMessage}
                </Text>
              ))}
            <BasicButton
              text="Submit"
              width={155}
              disable={isLoading}
              onPress={() => {
                callCreateReq();
              }}
              isLoading={isLoading}
              style={{marginTop: 10}}
            />
          </View>
        }
        second={
          <View
            style={[
              style.detailsContainer,
              {backgroundColor: COLORS(isDark).cardForDark},
            ]}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                width: '100%',
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginRight: 20,
                  marginVertical: 15,
                }}>
                <PickFiles
                  loadingImageUpload={loadingImageUpload}
                  setResult={setphoto}
                  result={photo}
                  setallFilesdata={setallFilesdata}
                />
              </View>

              <BottomSheetRec
                loadingImageUpload={loadingImageUpload}
                setloadingImageUpload={setloadingImageUpload}
                UploadImage={UploadImage}
                data={{
                  // flat: selectedProp.id,
                  // partner: userInfo.partner_id,
                  name: name,
                  description: description,
                  type: type,
                  files: photo,
                }}
              />
            </View>
            {isFieldInError('photo') &&
              getErrorsInField('photo').map(errorMessage => (
                <Text key={errorMessage} style={{color: 'red'}}>
                  {errorMessage}
                </Text>
              ))}
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                width: '95%',
                opacity: 0.2,
                marginVertical: 10,
                marginHorizontal: '2.5%',
              }}
            />
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '95%',
              }}>
              {loadingImageUpload && <Spinner />}
              {/* {images.map((url, index) => {
                return <Card url={url} index={index} />;
              })} */}
              {urlsAsArray &&
                urlsAsArray?.map((url, index) => {
                  if (url.includes('mp4')) {
                    return <CardVideo url={url} index={index} />;
                  } else if (url.includes('mp3')) {
                    return <CardRecord url={url} index={index} />;
                  } else {
                    return <Card url={url} index={index} />;
                  }
                })}
            </View>
            {popup && (
              <View style={style.modalView}>
                <View>
                  <Video
                    volume={0.4}
                    source={{
                      uri: selectedVideo,
                    }}
                    controls={true}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      marginRight: 5,
                      zIndex: 333333,
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        }
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },

  detailsContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    // marginTop: 10,

    // zIndex: 5,
    borderRadius: 25,
    // paddingVertical: 30,
    paddingBottom: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    height: '100%',
    marginBottom: 70,
  },

  bluebox: {
    width: '85%',

    backgroundColor: COLORS().backgroundblue,
    borderRadius: 3,
    marginVertical: 8,
    paddingVertical: 3,
  },
  blueboxtext: {
    color: COLORS().blue,
    fontSize: 12,
    marginHorizontal: 3,
  },

  container: {
    // ...StyleSheet.absoluteFillObject,
    //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
  },

  text: {
    color: COLORS().dark,
    fontWeight: 'bold',
    fontSize: 18,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    borderRadius: 20,
    // backgroundColor: 'red',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CreateRequestScreen;
