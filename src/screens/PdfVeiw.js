import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Pdf from 'react-native-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import DocumentCard from '../Components/Cards/DocumentCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Without Flow type annotations
// import PDFView from 'react-native-view-pdf/lib/index';
import {useGetContractDocument, useGetContractPayment} from '../apis/Home';
import Spinner from '../Components/Spinner';
import ReactNativeBlobUtil from 'react-native-blob-util';

const {width} = Dimensions.get('screen');

const PdfView = ({route, navigation}) => {
  const item = route.params;
  const {isDark} = useSelector(state => state.Home);

  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const Diff = () => {
    const currentDate = new Date();
    const futureDate = new Date(selectedProp?.contract.date_to);
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${year}-${month}-${day}`;
    const diffTime = Math.abs(futureDate - currentDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const contractDocuments = useSelector(state => state.Home.contractDocuments);
  console.log(contractDocuments, 'contractDocuments');
  const {mutate, isLoading} = useGetContractDocument();
  const {mutate: PaymnetPdf, isLoading: isLoadingPaymnetPdf} =
    useGetContractPayment();

  useEffect(() => {
    // console.log(item, 'item itek');

    if (item?.typeofScreen == 'paymentcard') {
      PaymnetPdf({
        payment_type: item?.type == 'check' ? 'check' : 'payment',
        record_id: item?.id,
      });
    } else {
      if (item) {
        mutate({
          contract_id: item.contract_id,
          print_name: item?.print_name,
        });
      }
    }
  }, [item]);

  const downloadFile = fileUrl => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = 'pdf';

    file_ext = '.' + file_ext;

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
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).white,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      {item?.typeofScreen == 'paymentcard' ? (
        <View style={[style.card, {backgroundColor: COLORS(isDark).white}]}>
          {isLoadingPaymnetPdf ? (
            <Spinner />
          ) : (
            <>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: COLORS().blue,
                    fontSize: 16,
                    marginTop: 5,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}>
                  {item?.print_name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    downloadFile(
                      `https://odooerp-ae-property.odoo.com${contractDocuments?.print_url}`,
                    )
                  }>
                  <AntDesign
                    name="clouddownloado"
                    size={25}
                    color={COLORS().blue}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <View style={style.container}>
                  <Pdf
                    trustAllCerts={false}
                    source={{
                      uri: `https://odooerp-ae-property.odoo.com${contractDocuments?.print_url}`,
                    }}
                    onLoadComplete={(numberOfPages, filePath) => {}}
                    onPageChanged={(page, numberOfPages) => {}}
                    onError={error => {}}
                    onPressLink={uri => {}}
                    style={style.pdf}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      ) : (
        <View style={[style.card, {backgroundColor: COLORS(isDark).white}]}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: COLORS().blue,
                    fontSize: 16,
                    marginTop: 5,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}>
                  {item?.print_name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    downloadFile(
                      `https://odooerp-ae-property.odoo.com${contractDocuments?.print_url}`,
                    )
                  }>
                  <AntDesign
                    name="clouddownloado"
                    size={25}
                    color={COLORS().blue}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <View style={style.container}>
                  <Pdf
                    trustAllCerts={false}
                    source={{
                      uri: `https://odooerp-ae-property.odoo.com${contractDocuments?.print_url}`,
                    }}
                    onLoadComplete={(numberOfPages, filePath) => {}}
                    onPageChanged={(page, numberOfPages) => {}}
                    onError={error => {}}
                    onPressLink={uri => {}}
                    style={style.pdf}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    // backgroundColor: COLORS().light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS().white,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionsCard: {
    width: width / 2 - 30,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS().white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS().grey,
  },
  activeCategoryListText: {
    color: COLORS().dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: COLORS().white,
    // elevation: 10,
    width: '90%',
    padding: 0,
    // borderRadius: 20,
    // borderBottomColor: COLORS().dark,
    // borderWidth: 1,
    // borderColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS().dark, fontSize: 12},
  line: {
    borderBottomColor: COLORS().line,
    // borderColor: 'white',
    borderWidth: 0.5,
    opacity: 0.2,
    marginVertical: 20,
    // height: 10,
  },
  allIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    zIndex: 5,
    width: '100%',
  },
  allIconflex: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  twoIcon: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  icon: {
    color: COLORS().grey,
    backgroundColor: COLORS().white,
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 3,
    fontWeight: 600,
    fontSize: 18,
  },
  bluebox: {
    width: '90%',

    backgroundColor: COLORS().backgroundblue,
    borderRadius: 3,
    marginVertical: 8,
    paddingVertical: 3,
  },
  blueboxtext: {
    color: COLORS().blue,
    fontSize: 12,
    marginHorizontal: 3,
    padding: 5,
  },
});
export default PdfView;
