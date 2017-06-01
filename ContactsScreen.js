import React, { Component } from 'react';
import TitleBar from './TitleBar.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  FlatList,
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
    for (var i = 0; i < 20; i++) {
      listData.push({
        key: i,
        title: "list item " + i,
      })
    }
    var letters = ['☆', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
    var letterViewArr = [];
    for (var i = 0; i < letters.length; i++) {
      letterViewArr.push(
        <Text style={{color: '#999999', fontSize: 12,}} key={"letter" + i}>{letters[i]}</Text>
      );
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
          <View style={{flexDirection: 'column', paddingLeft: 2, paddingRight: 2, justifyContent: 'center', alignItems: 'center'}}>{letterViewArr}</View>
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  }
  renderItem = (item) => {
    return (
      <View>
        <View style={listItemStyle.container} key={item.item.key}>
            <Image style={listItemStyle.image} source={require('./images/avatar.png')} />
            <Text style={listItemStyle.itemText}>{item.item.title}</Text>
        </View>
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
    marginTop: 10,
    marginBottom: 10,
    width: 45,
    height: 45,
  },
  itemText: {
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
