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
  TextInput
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('../utils/global.js');

export default class CommonTitleBar extends Component {
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
           <View style={styles.titleContainer}>
             <Text style={styles.title}>{this.props.title}</Text>
             <Image style={styles.img} source={require('../../images/ic_search_bar_search.png')} />
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
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  img: {
    width: 30,
    height: 30,
  }
});
