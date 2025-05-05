import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Pdf from 'react-native-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import DocumentCard from '../Components/Cards/DocumentCard';
import {Pressable} from 'react-native';
// Without Flow type annotations
// import PDFView from 'react-native-view-pdf/lib/index';

const {width} = Dimensions.get('screen');

const ContractDetails = ({route}) => {
  const navigation = useNavigation();

  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {Payments} = useSelector(state => state.Payments);

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
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS().backgroundblue,
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
      <View style={style.card}>
        <View style={{marginTop: 10}}>
          {/* Title and price container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: COLORS().dark,
              }}>
              {selectedProp?.contract?.name}
            </Text>
          </View>

          {/* Location text */}

          <Text
            style={{
              color: COLORS().blue,
              fontSize: 14,
              marginTop: 5,
              fontWeight: 'bold',
            }}>
            {selectedProp?.contract?.total_value} /{' '}
            {selectedProp?.contract?.rent_period_type}
          </Text>
          <Text
            style={{
              color: COLORS().grey,
              fontSize: 12,
              marginTop: 5,
              fontWeight: '500',
              textAlign: 'left',
            }}>
            Contract End : {selectedProp?.contract?.date_to}
          </Text>
          <Text
            style={{
              color: COLORS().grey,
              fontSize: 12,
              marginTop: 5,
              fontWeight: '500',
              textAlign: 'left',
            }}>
            Next Cheuqe Date : {Payments[0]?.date}
          </Text>

          <Text
            style={{
              color: COLORS().grey,
              fontSize: 12,
              marginTop: 5,
              fontWeight: '500',
              textAlign: 'left',
            }}>
            Insurance Amount : {selectedProp?.contract?.insurance_amount}
          </Text>
          <Text
            style={{
              color: COLORS().grey,
              fontSize: 12,
              marginTop: 5,
              fontWeight: '500',
              textAlign: 'left',
            }}>
            Rent Period : {selectedProp?.contract?.rent_period}
          </Text>
          <Text
            style={{
              color: COLORS().grey,
              fontSize: 12,
              marginTop: 5,
              fontWeight: '500',
              textAlign: 'left',
            }}>
            Checks No : {selectedProp?.contract?.checks_no}
          </Text>
          {/* Facilities container */}
          <View style={{flexDirection: 'column'}}>
            <View style={style.bluebox}>
              <Text style={style.blueboxtext}>
                <Ionicons
                  name="information-circle-outline"
                  size={12}
                  style={{marginHorizontal: 3}}
                  color={COLORS().blue}
                />
                Due In {Diff()} Days
              </Text>
            </View>
          </View>
        </View>
        <View style={style.line}></View>
        <View
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}>
          {/* Some Controls to change PDF resource */}
          {/* <View style={style.container}>
            <Pdf
              trustAllCerts={false}
              source={{
                uri: `data:application/pdf;base64,${selectedProp?.contract?.documents[0].datas}`,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                
              }}
              onPageChanged={(page, numberOfPages) => {
                
              }}
              onError={error => {
                
              }}
              onPressLink={uri => {
                
              }}
              style={style.pdf}
            />
          </View> */}
          {/*   <View style={style.container}>
                <Pdf
                  trustAllCerts={false}
                  source={{uri: `data:application/pdf;base64,${item.datas}`}}
                  onLoadComplete={(numberOfPages, filePath) => {
                    
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    
                  }}
                  onError={error => {
                    
                  }}
                  onPressLink={uri => {
                    
                  }}
                  style={style.pdf}
                />
              </View> */}
          {selectedProp?.contract?.documents?.map(item => {
            return (
              <>
                <Pressable onPress={() => navigation.navigate('PdfView', item)}>
                  <View
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderColor: 'white',
                      borderBottomColor: COLORS().grey,
                    }}>
                    <DocumentCard item={item} />
                  </View>
                </Pressable>
              </>
            );
          })}
        </View>
      </View>
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
    width: Dimensions.get('window').width,
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
export default ContractDetails;
