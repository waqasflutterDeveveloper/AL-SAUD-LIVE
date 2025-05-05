import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ReactElement, ReactNode} from 'react';

import {Component} from 'react';

// import NativeButton from 'apsl-react-native-button';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: 'rgb(243,243,243)',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: '#333',

    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    color: 'white',
  },
  imgLeft: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
});

class Button extends Component {
  static defaultProps = {
    isLoading: false,
    isDisabled: false,
    style: styles.btn,
    textStyle: styles.txt,
    imgLeftStyle: styles.imgLeft,
    indicatorColor: 'white',
    activeOpacity: 0.5,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isDisabled) {
      return (
        <View style={this.props.disabledStyle}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }

    if (this.props.isLoading) {
      return (
        <View style={this.props.style}>
          <ActivityIndicator size="small" color={this.props.indicatorColor} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={this.props.onPress}>
        <View style={this.props.style}>
          {this.props.imgLeftSrc ? (
            <Image
              style={this.props.imgLeftStyle}
              source={this.props.imgLeftSrc}
            />
          ) : null}
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;
