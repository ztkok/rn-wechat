import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import CommonTitleBar from '../views/CommonTitleBar.js';
import StorageUtil from '../utils/StorageUtil.js';
import LoadingView from '../views/LoadingView.js';
import NIM from 'react-native-netease-im';

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
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

var { width, height} = Dimensions.get('window');
var utils = require('../utils/utils.js');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      username: '',
      password: '',
      showProgress: false,
    };
  }
  componentWillMount() {
    StorageUtil.get('username', (error, object)=>{
      if (!error && object != null) {
        this.setState({username: object.username});
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar nav={this.props.navigation} title={"登录"}/>
        <View style={styles.content}>
          {
            utils.isEmpty(this.state.username) ? (
              <View style={styles.pwdView}>
                <Image source={require('../../images/ic_launcher.png')} style={{width: 100, height: 100, marginBottom: 50}} />
                <View style={styles.pwdContainer}>
                  <Text style={{fontSize: 16}}>用户名：</Text>
                  <TextInput onChangeText={(text)=>{this.setState({inputUsername: text})}} style={styles.textInput} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.pwdDivider}></View>
              </View>
            ) : (
              <View>
                <Image source={require('../../images/avatar.png')} style={{width: 100, height: 100, marginTop: 100}} />
                <Text style={styles.usernameText}>{this.state.username}</Text>
              </View>
            )
          }
          {
            this.state.showProgress ? (
              <LoadingView cancel={()=>this.setState({showProgress: false})} />
            ) : (null)
          }
          <View style={styles.pwdView}>
            <View style={styles.pwdContainer}>
              <Text style={{fontSize: 16}}>密码：</Text>
              <TextInput secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}} style={styles.textInput} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.pwdDivider}></View>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>this.login()}>
              <View style={styles.loginBtn}>
                <Text style={{color: '#FFFFFF', fontSize: 16}}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
          utils.isEmpty(this.state.username) ? null : (
            <TouchableOpacity onPress={()=>{this.changeAccount()}}>
              <Text style={styles.changeAccount}>切换账号</Text>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
  changeAccount() {
    this.setState({username: ''});
  }
  login() {
    var username = '';
    if (utils.isEmpty(this.state.username)) {
      username = this.state.inputUsername;
    } else {
      username = this.state.username;
    }
    var password = this.state.password;
    if (utils.isEmpty(username) || utils.isEmpty(password)) {
      ToastAndroid.show('用户名或密码不能为空', ToastAndroid.SHORT);
      return;
    }
    var url = 'http://yubo.applinzi.com/login';
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    this.setState({showProgress: true});
    fetch(url, {method: 'POST', body: formData})
      .then((res)=>res.json())
      .then((json)=>{
        this.setState({showProgress: false});
        if (!utils.isEmpty(json)) {
          if (json.code === 1) {
            // 登录服务器成功，再登录NIM的服务器
            this.loginToNIM(username, json.msg);
          } else {
            ToastAndroid.show(json.msg, ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('登录失败', ToastAndroid.SHORT);
        }
      }).catch((e)=>{
        this.setState({showProgress: false});
        ToastAndroid.show('网络请求出错: ' + e, ToastAndroid.SHORT);
      });
  }
  loginToNIM(username, token) {
    // {
    //   "code": 200,
    //   "info": {
    //     "token": "0370534061877ef540bb6be9395b5efb",
    //     "accid": "yubo",
    //     "name": ""
    //   }
    // }
    NIM.login(username, token).then((data)=>{
      ToastAndroid.show('登录成功', ToastAndroid.SHORT);
      StorageUtil.set('hasLogin', {'hasLogin': true});
      StorageUtil.set('username', {'username': username});
      // 清除所有路由状态，并跳转到actions中的路由
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Home'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }, (error)=>{
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
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
    alignItems: 'center',
  },
  pwdView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  textInput: {
    flex: 1
  },
  usernameText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center'
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
  },
  changeAccount: {
    fontSize: 16,
    color: '#00BC0C',
    textAlign: 'center',
    marginBottom: 20
  }
});
