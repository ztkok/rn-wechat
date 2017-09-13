import React, { Component } from 'react';
import ListItem from '../views/ListItem';
import CommonTitleBar from '../views/CommonTitleBar';
import StorageUtil from '../utils/StorageUtil';
import { NavigationActions } from 'react-navigation';
import NIM from 'react-native-netease-im';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Dimensions,
  TextInput,
  Button,
  NativeAppEventEmitter
} from 'react-native';

var { width, height} = Dimensions.get('window');

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactId: '',
      sendMsg: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar nav={this.props.navigation} title={"设置"}/>
        <View style={styles.container}>
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('../../images/ic_settings.png')} text={"注销"} handleClick={()=>{this.logout()}} />
        </View>
      </View>
    );
  }
  logout() {
    NIM.logout();
    StorageUtil.set('hasLogin', {'hasLogin': false});
    ToastAndroid.show('注销成功', ToastAndroid.SHORT);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Splash' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    width: width,
  },

});
