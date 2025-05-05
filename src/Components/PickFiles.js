import {View, Text, Button, Pressable, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {COLORS} from '../consts/colors';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {
  setMyUploads,
  setloadingImageUpload,
} from '../Store/upload/myUploadsSlice';
import {useDispatch} from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util';

const PickFiles = ({
  result,
  setResult,
  setallFilesdata,
  loadingImageUpload,
}) => {
  const {isDark} = useSelector(state => state.Home);
  const {urls} = useSelector(state => state.uploads);

  const dispatch = useDispatch();
  useEffect(() => {
    //
  }, [result]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  const uploadImage = async uri => {
    // const { uri } = image;
    dispatch(setloadingImageUpload(true));
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);

    try {
      const res = await task;
      console.error(res.metadata?.fullPath, 'res res');
      dispatch(
        setMyUploads(
          `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
        ),
      );
      dispatch(setloadingImageUpload(false));

      // Alert.alert(
      //   'Photo uploaded!',
      //   `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}`,
      // );
    } catch (e) {
      // dispatch(setloadingImageUpload(false));

      console.error(e, 'eeeee');
    }
  };
  return (
    <Pressable
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
      }}
      onPress={() => {
        DocumentPicker.pick({
          allowMultiSelection: true,
          type: [types.allFiles],
          copyTo: 'cachesDirectory',
        })
          .then(async res => {
            let FilesArr = [];
            let FilesArrdata = [];
            // uploadImage(res[0].fileCopyUri);
            //
            for (let index = 0; index < res?.length; index++) {
              uploadImage(res[index].fileCopyUri);

              const file = await ReactNativeBlobUtil.fs.readFile(
                res[index].fileCopyUri,
                'base64',
              );
              FilesArrdata.push({
                ...res[index],
                source: `data:${res[index].type};base64,${file}`,
              });
              FilesArr.push(`data:${res[index].type};base64,${file}`);
            }

            setResult(FilesArr);
            setallFilesdata(FilesArrdata);
          })
          .catch(handleError);
      }}>
      <MaterialIcons
        name="attach-file"
        size={25}
        color={COLORS().blue}
        style={{marginRight: 5}}
      />
      <Text
        style={{
          color: COLORS(isDark).blueVsBlack,
        }}>
        Attach File
      </Text>
    </Pressable>
  );
};

export default PickFiles;
