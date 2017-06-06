import React, { Component } from 'react';
import global from '../utils/global.js';

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
  TextInput,
  TouchableOpacity,
  ViewPagerAndroid,
} from 'react-native';

var { width, height } = Dimensions.get('window');

const icons = [
  require('../../images/ic_more_card.png'),
  require('../../images/ic_more_take_pic.png'),
  require('../../images/ic_more_recorder.png'),
  require('../../images/ic_more_position.png'),
  require('../../images/ic_more_movie.png'),
  require('../../images/ic_more_phone.png'),
  require('../../images/ic_more_gallery.png'),
  require('../../images/ic_more_collection.png'),
];

const iconTexts = [
  "相册", "拍摄", "语音聊天", "位置",
  "红包", "语音输入", "名片", "我的收藏"
];

export default class MoreView extends Component {
  render() {
    var page = [];
    for (var i = 0; i < 2; i++) {
      var row = [];
      for (var j = 0; j < 4; j++) {
        row.push(
          <Cell
            key={"row" + i + "col" + j}
            icon={icons[i * 4 + j]}
            text={iconTexts[i * 4 + j]}
            />
        );
      }
      page.push(
        <View key={"page" + i} style={styles.rowContainer}>{row}</View>
      );
    }
    return (
      <View style={styles.moreViewContainer}>
        {page}
      </View>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={styles.cellContainer}>
        <View style={styles.cellImgContainer}>
          <Image style={styles.cellImage} source={this.props.icon} />
        </View>
        <Text style={styles.cellText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  moreViewContainer: {
    width: width,
    height: global.emojiViewHeight,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F4F4F4'
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cellImgContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
  cellImage: {
    width: 35,
    height: 35,
  },
  cellText: {
    fontSize: 13,
  }
});
