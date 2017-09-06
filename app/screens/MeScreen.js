import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import TitleBar from '../views/TitleBar';
import ListItem from '../views/ListItem';
import ListItemDivider from '../views/ListItemDivider';
import StorageUtil from '../utils/StorageUtil';
import CountEmitter from '../event/CountEmitter';
import global from '../utils/global';
import utils from '../utils/utils';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  ScrollView,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';

var { width, height} = Dimensions.get('window');

export default class MeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '我',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('../../images/ic_me_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('../../images/ic_me_normal.png')}/>
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      avatar: ''
    };
    StorageUtil.get('username', (error, object)=>{
      if (!error && object != null) {
        this.setState({username: object.username});
      }
    });
    this.getAvatar();
  }
  getAvatar() {
    StorageUtil.get('avatar', (error, object)=>{
      if (!error && object != null) {
        this.setState({avatar: object.avatar});
      }
    })
  }
  componentWillMount() {
    CountEmitter.addListener('updateAvatar', ()=>{
      // 刷新头像
      this.getAvatar();
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TitleBar nav={this.props.navigation}/>
        <View style={styles.divider}></View>
        <ScrollView style={styles.content}>
          <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{this.props.navigation.navigate('PersonInfo')}}>
            <View style={styles.meInfoContainer}>
              <Image style={styles.meInfoAvatar} source={utils.isEmpty(this.state.avatar) ? require('../../images/avatar.png') : {uri: this.state.avatar}} />
              <View style={styles.meInfoTextContainer}>
                <Text style={styles.meInfoNickName}>{this.state.username}</Text>
                <Text style={styles.meInfoWeChatId}>微信号：大王叫我来巡山</Text>
              </View>
              <Image style={styles.meInfoQRCode} source={require('../../images/ic_qr_code.png')} />
            </View>
          </TouchableHighlight>
          <View />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('../../images/ic_wallet.png')} text={"钱包"} />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('../../images/ic_collect.png')} text={"收藏"} showDivider={true} />
          <ListItemDivider />
          <ListItem icon={require('../../images/ic_gallery.png')} text={"相册"} showDivider={true} handleClick={()=>{this.props.navigation.navigate('Moment')}} />
          <ListItemDivider />
          <ListItem icon={require('../../images/ic_kabao.png')} text={"卡包"} showDivider={true} handleClick={()=>{this.props.navigation.navigate('CardPackage')}} />
          <ListItemDivider />
          <ListItem icon={require('../../images/ic_emoji.png')} text={"表情"} />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('../../images/ic_settings.png')} text={"设置"} handleClick={()=>{}} />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('../../images/ic_settings.png')} text={"注销"} handleClick={()=>{this.logout()}} />
        </ScrollView>
        <View style={styles.divider}></View>
      </View>
    );
  }
  logout() {
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#D3D3D3'
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    backgroundColor: global.pageBackgroundColor,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  meInfoContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
  },
  meInfoAvatar: {
    width: 60,
    height: 60,
  },
  meInfoTextContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  meInfoNickName: {
    color: '#000000',
    fontSize: 16,
  },
  meInfoWeChatId: {
    color: '#999999',
    fontSize: 14,
    marginTop: 5,
  },
  meInfoQRCode: {
    width: 25,
    height: 25,
  }
});
