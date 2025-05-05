import {Calendar} from 'react-native-calendars';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import SCREENS from '../../../Layout';
import moment from 'moment';
export default class Example extends React.Component {
  state = {
    current: new Date(),
  };
  func = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          minDate={moment().format('YYYY-MM-DD')}
          style={styles.calendar}
          headerStyle={{backgroundColor: 'rgba(89, 82, 208, 0.03)'}}
          onDayPress={day => {
            this.props.HandleDateSelect(day);
            this.setState({current: day.dateString});
            this.func();
          }}
          monthFormat={'MMMM'}
          onMonthChange={month => {}}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          markedDates={{[this.state.current]: {selected: true}}}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },

  calendar: {
    height: '100%',
    backgroundColor: 'white',
    color: 'black',
    opacity: 1,
    width: SCREENS.WIDTH,
  },
});
