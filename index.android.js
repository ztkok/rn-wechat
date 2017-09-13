import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import TitleBar from './app/views/TitleBar';
import ContactsScreen from './app/screens/ContactsScreen';
import FindScreen from './app/screens/FindScreen';
import MeScreen from './app/screens/MeScreen';
import SearchScreen from './app/screens/SearchScreen';
import ContactDetailScreen from './app/screens/ContactDetailScreen';
import ChattingScreen from './app/screens/ChattingScreen';
import MomentScreen from './app/screens/MomentScreen';
import ScanScreen from './app/screens/ScanScreen';
import ScanResultScreen from './app/screens/ScanResultScreen';
import ShoppingScreen from './app/screens/ShoppingScreen';
import CardPackageScreen from './app/screens/CardPackageScreen';
import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import NewFriendsScreen from './app/screens/NewFriendsScreen';
import PersonInfoScreen from './app/screens/PersonInfoScreen';
import PublishMomentScreen from './app/screens/PublishMomentScreen';
import ImageShowScreen from './app/screens/ImageShowScreen';
import ShakeScreen from './app/screens/ShakeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import NIM from 'react-native-netease-im';
import StorageUtil from './app/utils/StorageUtil';
import UpgradeModule from './app/utils/UpgradeModule';
import UpgradeDialog from './app/views/UpgradeDialog';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  PixelRatio,
  StatusBar,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
  Platform,
  NativeAppEventEmitter
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('./app/utils/global.js');
var utils = require('./app/utils/utils.js');

export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '微信',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('./images/ic_weixin_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('./images/ic_weixin_normal.png')}/>
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      checkedUpgrade: true, // 标记是否检查了更新
      recentContactData: []
    };
    this.registerListeners();
    StorageUtil.get('username', (error, object)=>{
      if (!error && object != null) {
        this.setState({username: object.username});
      }
    });
  }
  registerListeners() {
    // 有新的会话会触发这里的listener
    this.recentListener = NativeAppEventEmitter.addListener("observeRecentContact", (data)=>{
      /**
        data:
        {
          "unreadCount": "0",
          "recents": [
              {
                  "content": "asdf",
                  "time": "上午 10:51",
                  "contactId": "yubo777",
                  "messageId": "7c7f3fdff75946c8bf6006c6d5b63659",
                  "nick": "yubo777",
                  "name": "yubo777",
                  "teamType": "-1",
                  "imagePath": "",
                  "sessionType": "0",
                  "unreadCount": "0",
                  "msgType": "0",
                  "msgStatus": "1",
                  "fromAccount": "yubo777"
              }
          ]
      }
      */
      if (utils.isEmpty(data) || utils.isEmpty(data.recents) || data.recents.length == 0) {
        // 没有最近会话
        this.setState({recentContactData: []});
      } else {
        // 有最近会话
        this.setState({recentContactData: data.recents});
      }
    })
  }
  unregisterListeners() {
    this.recentListener && this.recentListener.remove();
  }
  _keyExtractor = (item, index) => item.messageId
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor='#393A3E'
           barStyle="light-content"
         />
        <TitleBar nav={this.props.navigation}/>
        <View style={styles.divider}></View>
        <View style={styles.content}>
        {
          this.state.recentContactData.length == 0 ? (
            <Text style={styles.emptyHintText}>暂无会话消息</Text>
          ) : (
            <FlatList
              data={this.state.recentContactData}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
            />
          )
        }
        </View>
        <View style={styles.divider}></View>
        <View style={{backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, width: width}}>
          <UpgradeDialog ref="upgradeDialog" content={this.state.upgradeContent} />
        </View>
      </View>
    );
  }
  componentDidMount() {
    // 组件挂载完成后检查是否有更新，只针对Android平台检查
    if (!this.state.checkedUpgrade) {
      if (Platform.OS === 'android') {
        UpgradeModule.getVersionCodeName((versionCode, versionName) => {
          if (versionCode > 0 && !utils.isEmpty(versionName)) {
            // 请求服务器查询更新
            let url = 'http://rnwechat.applinzi.com/upgrade?versionCode=' + versionCode + '&versionName=' + versionName;
            fetch(url).then((res)=>res.json())
              .then((json)=>{
                if (json != null && json.code == 1) {
                  // 有新版本
                  let data = json.msg;
                  if (data != null) {
                    let newVersionCode = data.versionCode;
                    let newVersionName = data.versionName;
                    let newVersionDesc = data.versionDesc;
                    let downUrl = data.downUrl;
                    let content = "版本号：" + newVersionCode + "\n\n版本名称：" + newVersionName + "\n\n更新说明：" + newVersionDesc;
                    this.setState({upgradeContent: content}, () => {
                      // 显示更新dialog
                      this.refs.upgradeDialog.showModal();
                    });
                  }
                }
              }).catch((e)=>{
              })
          }
        })
      }
      this.setState({checkedUpgrade: true});
    }
  }
  componentWillUnmount() {
    this.unregisterListeners();
  }
  renderItem = (data) => {
    let avatar = require('./images/ic_list_icon.png');
    if (!utils.isEmpty(data.item.imagePath)) {
      avatar = {uri: data.item.imagePath};
    }
    return (
      <View>
        <TouchableHighlight underlayColor={global.touchableHighlightColor}
          onPress={()=>{this.props.navigation.navigate('Chatting', {'contactId': data.item.contactId, 'name': data.item.name})}}>
          <View style={styles.listItemContainer}>
            <Image source={avatar} style={{width: 50, height: 50}} />
            <View style={styles.listItemTextContainer}>
              <View style={styles.listItemSubContainer}>
                <Text numberOfLines={1} style={styles.listItemTitle}>{data.item.name}</Text>
                <Text numberOfLines={1} style={styles.listItemTime}>{data.item.time}</Text>
              </View>
              <View style={styles.listItemSubContainer}>
                <Text numberOfLines={1} style={styles.listItemSubtitle}>{data.item.content}</Text>
                {
                  data.item.unreadCount > 0 ? (
                    <View style={styles.redDot}>
                      <Text style={styles.redDotText}>{data.item.unreadCount}</Text>
                    </View>
                  ) : ( null )
                }
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: global.dividerColor
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: global.pageBackgroundColor
  },
  listItemContainer: {
    flexDirection: 'row',
    width: width,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  listItemTextContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 15,
  },
  listItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTitle: {
    color: '#333333',
    fontSize: 16,
    flex: 1,
  },
  listItemTime: {
    color: '#999999',
    fontSize: 12,
  },
  listItemSubtitle: {
    color: '#999999',
    fontSize: 14,
    marginTop: 3,
    flex: 1,
  },
  redDot: {
    borderRadius: 90,
    width: 18,
    height: 18,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  redDotText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  emptyHintText: {
    fontSize: 18,
    color: '#999999'
  }
});

const tabNavigatorScreen = TabNavigator({
  Home: { screen: HomeScreen },
  Contacts: { screen: ContactsScreen },
  Find: { screen: FindScreen },
  Me: { screen: MeScreen }
},{
  tabBarOptions: {
    activeTintColor: '#45C018',
    inactiveTintColor: '#999999',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
      marginTop: 0,
      marginBottom: 0,
    },
    style: {
      marginBottom: -2,
      backgroundColor: '#FCFCFC',
    },
    tabStyle: {
    }
  },
  tabBarPosition: 'bottom',
});

const MyApp = StackNavigator({
  Splash: { screen: SplashScreen },
  Home: { screen: tabNavigatorScreen },
  Search: { screen: SearchScreen },
  ContactDetail: { screen: ContactDetailScreen },
  Chatting: { screen: ChattingScreen },
  Moment: { screen: MomentScreen },
  Scan: { screen: ScanScreen },
  ScanResult: { screen: ScanResultScreen },
  Shopping: { screen: ShoppingScreen },
  CardPackage: { screen: CardPackageScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  NewFriend: { screen: NewFriendsScreen },
  PersonInfo: { screen: PersonInfoScreen },
  PublishMoment: { screen: PublishMomentScreen },
  ImageShow: { screen: ImageShowScreen },
  Shake: { screen: ShakeScreen },
  Settings: { screen: SettingsScreen }
}, {
  headerMode: 'none', // 此参数设置不渲染顶部的导航条
});

AppRegistry.registerComponent('TestReactNavigation', () => MyApp);
