import React, { Component } from 'react';
import MenuPopWindow from './PopupWindow.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  StatusBar,
  PixelRatio,
  ToastAndroid,
  TextInput
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('./global.js');

export default class SearchTitleBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor='#393A3E'
           barStyle="light-content"
         />
        <View style={styles.content}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.handleBackClick}>
            <Image source={require('./images/ic_back.png')} style={styles.backBtn} />
          </TouchableOpacity>
          <View style={styles.btnDivider} />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <Image source={require('./images/ic_search_bar_search.png')} style={styles.icon} />
              <TextInput style={styles.textInput} underlineColorAndroid="transparent" />
              <Image source={require('./images/ic_recorder.png')} style={styles.icon} />
            </View>
            <View style={styles.inputLine} />
          </View>
        </View>
      </View>
    );
  }

  handleBackClick = () => {
    this.props.nav.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  content: {
    width: width,
    height: 50,
    backgroundColor: global.titleBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backBtn: {
    marginLeft: 5,
    marginRight: 5,
    width: 30,
    height: 30,
  },
  btnDivider: {
    width: 1 / PixelRatio.get(),
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#888888'
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLine: {
    height: 1,
    backgroundColor: '#49BC1C'
  },
  icon: {
    width: 30,
    height: 30,
  },
  textInput: {
    padding: 0,
    flex: 1,
  }
});
