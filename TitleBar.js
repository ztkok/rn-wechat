import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('./global.js');

export default class TitleBar extends Component {

  render() {
    return (
      <View style={styles.titleBarContainer}>
        <View style={styles.titleBarTextContainer}>
          <Text style={styles.title}>微信</Text>
        </View>
        <View style={styles.titleBarButtonContainer}>
          <Image
            source={require('./images/ic_search.png')}
            style={styles.titleBarImg}
          />
          <Image
            source={require('./images/ic_add.png')}
            style={styles.titleBarImg}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  titleBarContainer: {
    flexDirection: 'row',
    width: width,
    height: 50,
    backgroundColor: global.titleBackgroundColor
  },
  titleBarTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleBarButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18
  },
  titleBarImg: {
    width: 25,
    height: 25,
    marginLeft: 15,
    marginRight: 15,
  }
});
