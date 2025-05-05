import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calenders from '../Components/Calenders';
import Time from '../Components/Calenders/Time';
import {COLORS} from '../consts/colors';
import {TextInput} from '@react-native-material/core';
import TouchableOpacityBtn from '../Components/Buttons/TouchBtn';
import SCREENS from '../../Layout';
import {ScrollView} from 'react-native';
import {useCreateVistApi} from '../apis/Home';
import {useSelector} from 'react-redux';
import ModalPopup from '../Components/Modal';
import {api} from '../axios';
import LoadingDots from 'react-native-loading-dots';

const LiveVisit = ({route}) => {
  const [name, setName] = useState(null);
  const [Timee, setTimee] = useState(null);
  const [Date, setDate] = useState(null);

  const [email, setemail] = useState(null);
  const [description, setdescription] = useState(null);
  const [flat, setflat] = useState(route?.params?.id);
  const [modalVisible, setModalVisible] = useState(true);
  const [times, settimes] = useState([]);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);

  const stateOfCreateVisit = useSelector(
    state => state.CreateVist.stateOfCreateVisit,
  );
  const getAllTime_slots = async data => {
    const res = await api.post('api/time_slots', {});

    if (res?.data?.result) {
      settimes(res?.data?.result);
    }
  };
  useEffect(() => {
    getAllTime_slots();
  }, []);

  const {userInfo} = useSelector(state => state.userinfo);
  const [IsDisable, setIsDisable] = useState(false);
  const {mutate: createVisit, isLoading} = useCreateVistApi();

  const HandlecreateVisit = async () => {
    // console.log(`${Date} ${Timee}`, '`${Date} ${Timee}`');
    setIsDisable(true);
    await createVisit({
      name,
      flat: flat,
      partner_id: userInfo?.partner_id,
      date_time: `${Date} ${Timee}:00`,
    });
  };
  useEffect(() => {
    if (stateOfCreateVisit) {
      setIsDisable(false);

      setModalVisible(true);
    }
  }, [stateOfCreateVisit]);
  const HandleDateSelect = date => {
    setDate(date?.dateString);
  };
  const HandleTimeSelect = time => {
    setTimee(time);
  };
  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      {/* <ModalPopup
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      /> */}
      {stateOfCreateVisit && (
        <ModalPopup
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>
            Let us know when you are availablem, and we will contact you to
            arange a visit.
          </Text>
          <Text style={styles.head}>Select an available date</Text>
          <View style={{height: 360}}>
            <Calenders HandleDateSelect={HandleDateSelect} />
          </View>
          <View style={styles.timeOuterBox}>
            {times?.map(item => {
              return (
                <Time
                  bgcolor={COLORS().backgroundblue}
                  Timee={Timee}
                  text={item}
                  HandleTimeSelect={HandleTimeSelect}
                />
              );
            })}
          </View>
          <Text style={styles.head}>Fill the Form Below</Text>
          <View style={{marginVertical: 5, width: '100%'}}>
            <TextInput
              variant="outlined"
              label="Full Name"
              placeholderTextColor={COLORS().blue}
              style={{margin: 5}}
              color={COLORS().blue}
              value={name}
              onChangeText={e => setName(e)}
            />
            {/* <TextInput
              variant="outlined"
              label="E-mail "
              placeholderTextColor={COLORS().blue}
              style={{margin: 5}}
              color={COLORS().blue}
              value={email}
              onChangeText={e => setemail(e)}
            /> */}
            {/* <TextInput
              variant="outlined"
              label="Mobile"
              placeholderTextColor={COLORS().blue}
              style={{margin: 5}}
              color={COLORS().blue}
              value={mobile}
              onChangeText={e => setmobile(e)}
            /> */}
            {/* <TextInput
              variant="outlined"
              label="Description"
              placeholderTextColor={COLORS().blue}
              style={{margin: 5}}
              color={COLORS().blue}
              value={description}
              onChangeText={e => setdescription(e)}
            /> */}
            {/* {!name || !Timee || !Date  && <Text style={{color:"red"}}>Please Fill All THE field!</Text>} */}
          </View>

          <TouchableOpacityBtn
            color={name && Timee && Date ? SCREENS.OREANGE : SCREENS.DARKGREY}
            text={
              !IsDisable ? (
                'Send Visit Request'
              ) : (
                <LoadingDots
                  bounceHeight={5}
                  colors={['white', 'white', 'white', 'white']}
                  size={10}
                />
              )
            }
            width={'100%'}
            disable={(name && Timee && Date) || IsDisable ? false : true}
            style={{
              borderRadius: 10,
              paddingVertical: 20,
              marginVertical: 15,
            }}
            textcolor={SCREENS.WHITE}
            // outline={SCREEN.OREANGE}
            onPress={HandlecreateVisit}
            type="basic"
            textSize={14}
            // outline={SCREEN.DARKGREY}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 40,
  },
  box: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    height: '100%',
  },
  timeOuterBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: COLORS().grey,
    fontSize: 14,
    marginVertical: 10,
  },
  head: {
    color: COLORS().dark,
    marginVertical: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeBox: {
    padding: 15,
    borderColor: COLORS().grey,
    borderRadius: 5,
  },
});
export default LiveVisit;
