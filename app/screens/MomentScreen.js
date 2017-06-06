import React, { Component } from 'react';
import CommonTitleBar from '../views/CommonTitleBar.js';

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
  ScrollView,
  TouchableHighlight,
  ART,
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('../utils/global.js');
const AVATAR_WIDTH = 80;
const HEIGHT = width * 7 / 10;

export default class MomentScreen extends Component {
  render() {
    var listData = [];
    for (var i = 0; i < 20; i++) {
      listData.push({
        key: i,
      });
    }
    return (
      <View style={styles.container}>
        <CommonTitleBar title={"朋友圈"} nav={this.props.navigation} />
        <ScrollView>
          <Image style={styles.momentImg} source={require('../../images/moment.jpg')} />
          <Text style={styles.userNameText}>yubo</Text>
          <Image style={styles.avatarImg} source={require('../../images/avatar.png')} />
          <FlatList
            data={listData}
            renderItem={this.renderItem}
            />
        </ScrollView>
      </View>
    );
  }

  renderItem = (item) => {
    const path = ART.Path();
    path.moveTo(10, 10);
    path.lineTo(20, 0);
    path.lineTo(30, 10);
    path.close();
    return (
      <View key={item.item.key}>
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.avatar} source={require('../../images/avatar.png')} />
          <View style={listItemStyle.content}>
            <Text style={listItemStyle.nameText}>肖大宝</Text>
            <Text style={listItemStyle.msgText}>贴吧楼委会 亲爱的各位吧友:欢迎来到reactnative 8424331 3-27本吧特权礼包 兑换 红色标题 补签卡 经验加速 膜拜卡 直送经验 魔蛋卡 更多精彩特权,尽在贴吧名</Text>
            <View style={listItemStyle.timeContainer}>
              <Text style={listItemStyle.timeText}>20分钟前</Text>
              <Image style={listItemStyle.commentImg} source={require('../../images/ic_comment.png')} />
            </View>
            <View style={listItemStyle.commentContainer}>
              <ART.Surface width={30} height={10} >
                <ART.Shape d={path} fill={'#EEEEEE'} />
              </ART.Surface>
              <View style={listItemStyle.commentContent}>
                <View style={listItemStyle.favorContainer}>
                  <Image style={listItemStyle.favorImg} source={require('../../images/ic_favor.png')} />
                  <Text style={listItemStyle.commentText}>yubo</Text>
                </View>
                <View style={[listItemStyle.divider, {marginTop: 3, marginBottom: 3}]} />
                <Text style={listItemStyle.commentText}>习主席：小伙子我要是骗你我习主席倒过来念。</Text>
                <Text style={listItemStyle.commentText}>李总理：小伙子我要是骗你我李总理倒过来念。</Text>
                <Text style={listItemStyle.commentText}>金三胖：小伙子我看好你！</Text>
                <Text style={listItemStyle.commentText}>普京大帝：二营长，把他娘的意大利炮拿出来，轰死小日本！</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={listItemStyle.divider} />
      </View>
    );
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  nameText: {
    fontSize: 15,
    color: '#54688D'
  },
  msgText: {
    fontSize: 15,
    color: '#000000',
    marginTop: 2,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  timeText: {
    flex: 1,
    fontSize: 12,
    color: '#999999',
  },
  commentImg: {
    width: 25,
    height: 17,
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: global.dividerColor,
  },
  commentContainer: {
  },
  commentContent: {
    backgroundColor: '#EEEEEE',
    padding: 6,
  },
  favorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favorImg: {
    width: 13,
    height: 13,
    marginRight: 5,
    marginTop: 5,
  },
  commentText: {
    fontSize: 13,
    color: '#54688D',
    marginTop: 2,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8',
  },
  momentImg: {
    width: width,
    height: HEIGHT,
    marginBottom: 40,
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    right: 95,
    top: HEIGHT - 25,
  },
  avatarImg: {
    width: AVATAR_WIDTH,
    height: AVATAR_WIDTH,
    position: 'absolute',
    right: 10,
    top: HEIGHT - 45,
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }
});
