import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const WHITE = 'white';
const GREY = '#EEEEEE';
const RADIUS = 16;
const BLUE = '#185894';
const DARKGREY = '#969494';
const MIDDLEGREY = '#DEDEDE';

const OREANGE = '#E9612F';
const BLUE_TRANSPARENT = 'rgba(26, 60, 105, 0.72)';

export default {
  WIDTH,
  HEIGHT,
  isSmallDevice: WIDTH < 375,
  GREY,
  WHITE,
  BLUE,
  MIDDLEGREY,
  RADIUS,
  DARKGREY,
  OREANGE,
  BLUE_TRANSPARENT,
};
