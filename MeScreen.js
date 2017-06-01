import React, { Component } from 'react';
import TitleBar from './TitleBar.js';
import ListItem from './ListItem.js';
import ListItemDivider from './ListItemDivider.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  ScrollView,
} from 'react-native';

var { width, height} = Dimensions.get('window');
var global = require('./global.js');

export default class MeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '我',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('./images/ic_me_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('./images/ic_me_normal.png')}/>
      );
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar />
        <View style={styles.divider}></View>
        <ScrollView style={styles.content}>
          <View style={styles.meInfoContainer}>
            <Image style={styles.meInfoAvatar} source={require('./images/avatar.png')} />
            <View style={styles.meInfoTextContainer}>
              <Text style={styles.meInfoNickName}>yubo</Text>
              <Text style={styles.meInfoWeChatId}>微信号：大王叫我来巡山</Text>
            </View>
            <Image style={styles.meInfoQRCode} source={require('./images/ic_qr_code.png')} />
          </View>
          <View />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('./images/ic_wallet.png')} text={"钱包"} />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('./images/ic_collect.png')} text={"收藏"} showDivider={true} />
          <ListItemDivider />
          <ListItem icon={require('./images/ic_gallery.png')} text={"相册"} showDivider={true} />
          <ListItemDivider />
          <ListItem icon={require('./images/ic_kabao.png')} text={"卡包"} showDivider={true} />
          <ListItemDivider />
          <ListItem icon={require('./images/ic_emoji.png')} text={"表情"} />
          <View style={{width: width, height: 20}} />
          <ListItem icon={require('./images/ic_settings.png')} text={"设置"} />
        </ScrollView>
        <View style={styles.divider}></View>
      </View>
    );
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
    marginTop: 20,
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
