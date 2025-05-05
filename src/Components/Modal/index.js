import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import SCREEN from '../../../Layout';
import TouchableOpacityBtn from '../Buttons/TouchBtn';
import {useDispatch} from 'react-redux';
import {setCreateVisit} from '../../Store/CreateVisit/CreateVistSlice';
import {useNavigation} from '@react-navigation/native';
const ModalPopup = (modalVisible, setModalVisible) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setCreateVisit(null));
    navigation.navigate('Main');
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../../assets/png/request.png')} />
            <Text style={styles.modalText}>Your request has been Sent!</Text>
            <Text style={styles.textGrey}>
              Customer service will contact with you to confirm your live visit
            </Text>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}> */}
            <TouchableOpacityBtn
              color={SCREEN.OREANGE}
              text="View Visits"
              width={SCREEN.WIDTH * 0.7}
              style={{
                borderRadius: 10,
                paddingVertical: 20,
                marginVertical: 15,
              }}
              textcolor={SCREEN.WHITE}
              onPress={() => navigation.navigate('myVisits')}
              type="basic"
              textSize={14}
            />
            <TouchableOpacityBtn
              color={'rgba(24, 88, 148, 0.05)'}
              text="Back Home"
              width={SCREEN.WIDTH * 0.7}
              style={{
                borderRadius: 10,
                paddingVertical: 20,
                marginVertical: 15,
              }}
              textcolor={SCREEN.BLUE}
              onPress={() => closeModal()}
              type="basic"
              textSize={14}
            />
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textGrey: {
    color: '#969494',
    fontSize: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(9, 16, 29, .7)',
    // width: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 18,
    textAlign: 'center',
    color: SCREEN.BLUE,
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default ModalPopup;
