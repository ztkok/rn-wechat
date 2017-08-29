import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

var { width, height } = Dimensions.get('window');

export default class ImageShowScreen extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} activeOpacity={1.0} onPress={()=>this.props.navigation.goBack()}>
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.image} source={{uri: this.props.navigation.state.params.image}} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  image: {
    flex: 1,
    width: width
  }
})
