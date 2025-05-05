import React from 'react';
import {Text, View} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {COLORS} from '../consts/colors';
const buttonTextStyle = {
  color: 'white',
  backgroundColor: COLORS().red,
  padding: 10,
  borderRadius: 10,
  width: 100,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};
const buttonTextStyleDisabled = {
  color: 'gray',
  backgroundColor: COLORS().gray,
  padding: 10,
  borderRadius: 10,
  width: 100,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};
function Steper({
  first,
  second,
  third,
  isNextBtnDisabled,
  isNextBtnDisabledForFirstStep,
}) {
  return (
    <View style={{flex: 1}}>
      <ProgressSteps>
        <ProgressStep
          nextBtnTextStyle={
            isNextBtnDisabledForFirstStep
              ? buttonTextStyleDisabled
              : buttonTextStyle
          }
          label="Basic information"
          nextBtnDisabled={isNextBtnDisabledForFirstStep}>
          <View style={{alignItems: 'center'}}>{first}</View>
        </ProgressStep>
        <ProgressStep
          nextBtnTextStyle={
            isNextBtnDisabled ? buttonTextStyleDisabled : buttonTextStyle
          }
          previousBtnTextStyle={buttonTextStyle}
          label="Attachments"
          nextBtnDisabled={isNextBtnDisabled}>
          <View style={{alignItems: 'center'}}>{second}</View>
        </ProgressStep>
        <ProgressStep
          label="Descripion"
          previousBtnTextStyle={buttonTextStyle}
          finishBtnText="">
          <View
            style={{
              alignItems: 'center',
              height: '100%',
            }}>
            {third}
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

export default Steper;
