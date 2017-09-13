import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import StorageUtil from '../utils/StorageUtil';
import NIM from 'react-native-netease-im';
import global from '../utils/global';

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
  TouchableOpacity,
  StatusBar,
  ToastAndroid
} from 'react-native';

var { width, height} = Dimensions.get('window');

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      hasLogin: false
    };
    StorageUtil.get('hasLogin', (error, object)=>{
      if (!error && object != null) {
        this.setState({hasLogin: object.hasLogin});
      }
    });
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor="#000000"/>
        <Image source={require("../../images/splash.jpg")} style={{width: width, height: height}} />
        {
          this.state.hasLogin ? null : (
            <Animated.View style={[styles.buttonContainer, {opacity: this.state.fadeAnim}]}>
              <TouchableOpacity style={{flex: 1}} activeOpacity={0.6} onPress={()=>{this.props.navigation.navigate('Login')}}>
                <View style={[styles.btnLogin, styles.btnColumn]}>
                  <Text style={styles.button}>登录</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1}} activeOpacity={0.6} onPress={()=>{this.props.navigation.navigate('Register')}}>
                <View style={[styles.btnRegister, styles.btnColumn]}>
                  <Text style={[styles.button, {color: '#FFFFFF'}]}>注册</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )
        }
      </View>
    );
  }
  componentDidMount() {
    // 这里不要用this.state.hasLogin判断
    StorageUtil.get('hasLogin', (error, object)=>{
      if (!error && object != null && object.hasLogin) {
        // 已登录，直接登录聊天服务器
        ToastAndroid.show('自动登录中...', ToastAndroid.SHORT);
        this.timer = setTimeout(()=>{
            this.autoLogin();
          }, 500
        )
      } else {
        // 未登录，需要先登录自己的服务器，再登录聊天服务器
        Animated.timing(this.state.fadeAnim, {
          duration: 2000,
          toValue: 1
        }).start();//开始
      }
    });
  }
  autoLogin() {
    StorageUtil.get('username', (error, object)=>{
      if (!error && object != null) {
        let username = object.username;
        let token = '';
        StorageUtil.get('token', (error, object)=>{
          if (!error && object != null) {
            token = object.token;
            this.loginToNIM(username, token);
          }
        });
      }
    });
  }
  loginToNIM(username, token) {
    NIM.login(username, token).then((data)=>{
      // 登录聊天服务器成功，跳转到Home
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    });
  }
  componentWillUnmount() {
    // 取消定时器
    this.timer && clearTimeout(this.timer);
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnColumn: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  button: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  btnLogin: {
    backgroundColor: '#FFFFFF',
    marginRight: 15,
  },
  btnRegister: {
    backgroundColor: '#00BC0C',
    marginLeft: 15,
  }
});
