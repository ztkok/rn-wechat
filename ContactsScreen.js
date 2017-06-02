import React, { Component } from 'react';
import TitleBar from './TitleBar.js';
import ListItem from './ListItem.js';
import ListItemDivider from './ListItemDivider.js';
import SideBar from './SideBar.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  FlatList,
  TouchableHighlight,
} from 'react-native';

var { width, height} = Dimensions.get('window');
var global = require('./global.js');

export default class ContactsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '联系人',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('./images/ic_contacts_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('./images/ic_contacts_normal.png')}/>
      );
    },
  };

  render() {
    var listData = [];
    var headerImages = [require('./images/ic_new_friends.png'), require('./images/ic_group_chat.png'),
                        require('./images/ic_tag.png'), require('./images/ic_common.png')];
    var headerTitles = ['新的朋友', '群聊', '标签', '公众号'];
    var index = 0;
    for (var i = 0; i < headerTitles.length; i++) {
      listData.push({
        key: index++,
        title: headerTitles[i],
        icon: headerImages[i],
      });
    }
    for (var i = 0; i < 20; i++) {
      listData.push({
        key: index++,
        icon: null,
        title: "list item " + i,
      })
    }
    return (
      <View style={styles.container}>
        <TitleBar />
        <View style={styles.divider}></View>
        <View style={styles.content}>
          <FlatList
            data={listData}
            renderItem={this.renderItem}
          />
          <SideBar />
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  }
  renderItem = (item) => {
    return (
      <View>
        <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{}}>
          <View style={listItemStyle.container} key={item.item.key}>
              <Image style={listItemStyle.image} source={item.item.icon == null ? require('./images/avatar.png') : item.item.icon} />
              <Text style={listItemStyle.itemText}>{item.item.title}</Text>
          </View>
        </TouchableHighlight>
        <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}}/>
      </View>
    );
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  image: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 15,
    color: '#000000'
  }
});

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
    flexDirection: 'row',
    backgroundColor: global.pageBackgroundColor
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
});
