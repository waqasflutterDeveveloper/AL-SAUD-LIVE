import React, {useState} from 'react';
import {View, Button, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from '@react-native-material/core';
import {COLORS} from '../../consts/colors';
import moment from 'moment/moment';
import DatePicker from 'react-native-date-picker';

const TimePicker = ({setperferred_time, perferred_time}) => {
  const [open, setOpen] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      setperferred_time(selectedTime);
    }
    console.log(selectedTime);
    setShowTimePicker(false);
  };

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity style={{position: 'relative'}}>
        {/* <Text>{'date'}</Text> */}
        <TextInput
          editable={false}
          variant="outlined"
          label="Preferred Date and Time  "
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
          value={moment(perferred_time).format('MM / DD / YY : HH:mm')}
          // borderColor={COLORS().red}
          // borderWidth={1}
        />
        <TouchableOpacity
          style={{
            // backgroundColor: 'blue',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            height: '100%',
          }}
          onPress={() => setOpen(true)}></TouchableOpacity>
      </TouchableOpacity>
      <>
        <DatePicker
          modal
          open={open}
          date={perferred_time}
          onConfirm={date => {
            setOpen(false);
            setperferred_time(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>
      {/* {open && (
        <DateTimePicker
          testID="timePicker"
          value={perferred_time}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={onChange}
        />
      )} */}
    </View>
  );
};
export default TimePicker;
