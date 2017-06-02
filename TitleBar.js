import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('./global.js');

export default class TitleBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  render() {
    return (
      <View style={styles.titleBarContainer}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <Text>Hello World!</Text>
        </Modal>
        <View style={styles.titleBarTextContainer}>
          <Text style={styles.title}>微信</Text>
        </View>
        <View style={styles.titleBarButtonContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.handleSearchClick}>
            <Image
              source={require('./images/ic_search.png')}
              style={styles.titleBarImg}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require('./images/ic_add.png')}
              style={styles.titleBarImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleSearchClick = () => {
    this.setState({modalVisible: true});
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleBarImg: {
    width: 25,
    height: 25,
    marginLeft: 15,
    marginRight: 15,
  }
});
