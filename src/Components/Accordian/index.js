import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../consts/colors';
import {useSelector} from 'react-redux';
const ScreenWidth = Dimensions.get('window').width;

const Accordian = ({title, body}) => {
  const {isDark} = useSelector(state => state.Home);

  return (
    <View style={styles.container}>
      <View style={styles.collapseContainer}>
        <Collapse style={{width: '100%', backgroundColor: '#FAFAFA'}}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{title}</Text>
              <FontAwesome
                style={{fontWeight: 'bold'}}
                name="angle-down"
                color={'#7C7C7C'}
                size={22}
              />
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.text}>{body}</Text>
          </CollapseBody>
        </Collapse>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  collapseContainer: {
    width: '90%',
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: COLORS().bottomBorder,
  },
  collapseHeader: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    paddingBottom: 10,
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    padding: 10,
    borderTopWidth: 1,
    borderColor: COLORS().bottomBorder,
    marginHorizontal: 15,
  },
  title: {color: 'black', fontWeight: 'bold'},
});
export default Accordian;
