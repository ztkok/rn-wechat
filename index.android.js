import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import TitleBar from './TitleBar.js';
import ContactsScreen from './ContactsScreen.js';
import FindScreen from './FindScreen.js';
import MeScreen from './MeScreen.js';
import SearchScreen from './SearchScreen.js';
import ContactDetailScreen from './ContactDetailScreen.js';
import ChattingScreen from './ChattingScreen.js';
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
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('./global.js');
var listData = [];
for (var i = 0; i < 20; i++) {
  listData.push({
    key: i,
    title: "item " + i,
    subtitle: "subtitle item " + i,
    time: "昨天"
  })
}

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
          <FlatList
            data={listData}
            renderItem={this.renderItem}
          />
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  }
  renderItem = (data) => {
    return (
      <View key={data.index}>
        <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{this.props.navigation.navigate('Chatting')}}>
          <View style={styles.listItemContainer}>
            <Image source={require('./images/ic_list_icon.png')} style={{width: 50, height: 50}} />
            <View style={styles.listItemTextContainer}>
              <View style={styles.listItemSubContainer}>
                  <Text style={styles.listItemTitle}>{data.item.title}</Text>
                  <Text style={styles.listItemTime}>{data.item.time}</Text>
              </View>
              <Text style={styles.listItemSubtitle}>{data.item.subtitle}</Text>
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
    alignItems: 'center'
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
    backgroundColor: '#FFFFFF'
  },
  listItemContainer: {
    flexDirection: 'row',
    width: width,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
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
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
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
  Home: { screen: tabNavigatorScreen },
  Search: { screen: SearchScreen },
  ContactDetail: { screen: ContactDetailScreen },
  Chatting: { screen: ChattingScreen }
}, {
  headerMode: 'none', // 此参数设置不渲染顶部的导航条
});

AppRegistry.registerComponent('TestReactNavigation', () => MyApp);
