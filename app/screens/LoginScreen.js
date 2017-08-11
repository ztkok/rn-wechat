import React, { Component } from 'react';
import CommonTitleBar from '../views/CommonTitleBar.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  ScrollView,
  WebView,
  Animated,
  TextInput,
  TouchableOpacity
} from 'react-native';

var { width, height} = Dimensions.get('window');

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar nav={this.props.navigation} title={"登录"}/>
        <View style={styles.content}>
          <Image source={require('../../images/avatar.png')} style={{width: 100, height: 100, marginTop: 100}} />
          <View style={styles.pwdView}>
            <View style={styles.pwdContainer}>
              <Text style={{fontSize: 16}}>密码：</Text>
              <TextInput secureTextEntry={true} onChangeText={(text)=>{}} style={styles.textInput} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.pwdDivider}></View>
            <TouchableOpacity activeOpacity={0.6}>
              <View style={styles.loginBtn}>
                <Text style={{color: '#FFFFFF', fontSize: 16}}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  pwdView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  textInput: {
    flex: 1
  },
  pwdContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  pwdDivider: {
    width: width - 60,
    marginLeft: 30,
    marginRight: 30,
    height: 1,
    backgroundColor: '#00BC0C'
  },
  loginBtn: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#00BC0C',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
