import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  StatusBar,
  PixelRatio,
  TextInput,
  ToastAndroid
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('../utils/global.js');

export default class SearchTitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContent: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor='#393A3E'
           barStyle="light-content"
         />
        <View style={styles.content}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.handleBackClick}>
            <Image source={require('../../images/ic_back.png')} style={styles.backBtn} />
          </TouchableOpacity>
          <View style={styles.btnDivider} />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <Image source={require('../../images/ic_search_bar_search.png')} style={styles.icon} />
              <TextInput onChangeText={(text)=>{this.setState({inputContent: text})}} style={styles.textInput} underlineColorAndroid="transparent" />
              <Button onPress={()=>{this.props.handleSearchClick(this.state.inputContent)}} color={'#49BC1C'} title={"搜索"} />
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
    paddingLeft: 10,
    paddingRight: 10,
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
    color: '#FFFFFF'
  },
});
