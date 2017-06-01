import React, { Component } from 'react';
import {
  View,
  PixelRatio,
  Dimensions,
} from 'react-native';

var global = require('./global.js');
var { width, height} = Dimensions.get('window');

export default class ListItemDivider extends Component {
  render() {
    var height = 1 / PixelRatio.get();
    return (
      <View style={{width: width, height: height, backgroundColor: '#FFFFFF'}}>
        <View style={{width: width - 20, height: height, marginLeft: 10, marginRight: 10, backgroundColor: global.dividerColor}}/>
      </View>
    );
  }
}
