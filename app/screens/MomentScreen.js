import React, { Component } from 'react';
import CommonTitleBar from '../views/CommonTitleBar.js';
import CountEmitter from '../event/CountEmitter';
import StorageUtil from '../utils/StorageUtil';
import LoadingView from '../views/LoadingView.js';

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
  TouchableOpacity,
  ART,
  ToastAndroid
} from 'react-native';

var { width, height } = Dimensions.get('window');
var global = require('../utils/global.js');
var utils = require('../utils/utils.js');
var base64Utils = require('../utils/base64.js');
var timeUtils = require('../utils/timeutil.js');
const AVATAR_WIDTH = 80;
const HEIGHT = width * 7 / 10;

export default class MomentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      avatar: '',
      showProgress: false
    };
    StorageUtil.get('avatar', (error, object)=>{
      if (!error && object != null) {
        this.setState({avatar: object.avatar});
      }
    });
  }
  componentWillMount() {
    CountEmitter.addListener('updateMomentList', ()=>{
      // 刷新朋友圈列表
      this.getMoments();
    });
  }
  componentDidMount() {
    this.getMoments();
  }
  getMoments() {
    this.showLoading();
    let url = 'http://rnwechat.applinzi.com/moments';
    fetch(url).then((res)=>res.json())
    .then((json)=>{
      if (json != null) {
        this.hideLoading();
        if (json.code == 1) {
          let data = json.msg; // 数组
          if (data != null && data.length > 0) {
            for(let i = 0; i < data.length; i++) {
              data[i].key = i;
            }
            this.setState({moments: data});
          }
        }
      }
    }).catch((e)=>{
      this.hideLoading();
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    })
  }
  showLoading() {
    this.setState({showProgress: true});
  }
  hideLoading() {
    this.setState({showProgress: false});
  }
  render() {
    let avatar = require('../../images/avatar.png');
    if (!utils.isEmpty(this.state.avatar)) {
      avatar = {uri: this.state.avatar};
    }
    return (
      <View style={styles.container}>
        <CommonTitleBar title={"朋友圈"} nav={this.props.navigation} rightIcon={require('../../images/ic_camera.png')} handleRightClick={()=>this.props.navigation.navigate('PublishMoment')} />
        {
          this.state.showProgress ? (
            <LoadingView cancel={()=>this.setState({showProgress: false})} />
          ) : (null)
        }
        <ScrollView>
          <Image style={styles.momentImg} source={require('../../images/moment.jpg')} />
          <Text style={styles.userNameText}>yubo</Text>
          <Image style={styles.avatarImg} source={avatar} />
          <FlatList
            data={this.state.moments}
            renderItem={this.renderItem}
            />
        </ScrollView>
      </View>
    );
  }
  renderImageRow(arr, start, end) {
    let images = [];
    for (let i = start; i < end; i++) {
      let img = {uri: arr[i]};
      images.push(
        <TouchableOpacity key={"row-image-" + i} activeOpacity={0.6} onPress={()=>this.props.navigation.navigate('ImageShow', {'image': arr[i]})}>
          <Image source={img} style={listItemStyle.imageCell} />
        </TouchableOpacity>
      );
    }
    return (
      <View key={"row-" + start} style={{flexDirection: 'row'}}>
        {images}
      </View>
    );
  }
  renderImages(pictures) {
    if (pictures == null || pictures == '') {
      return null;
    }
    let arr = pictures.split('#');
    let len = arr.length;
    let images = [];
    if (len > 0) {
      let rowNum = Math.ceil(len / 3);
      for (let i = 0; i < rowNum; i++) { // 行
        let start = i * 3;
        let end = i * 3 + 3;
        if (end > len) {
          end = len;
        }
        images.push(this.renderImageRow(arr, start, end));
      }
    }
    return (
      <View style={listItemStyle.imageContainer}>
        {images}
      </View>
    );
  }
  renderItem = (item) => {
    const path = ART.Path();
    path.moveTo(10, 10);
    path.lineTo(20, 0);
    path.lineTo(30, 10);
    path.close();
    let avatar = require('../../images/avatar.png');
    if (!utils.isEmpty(item.item.avatar)) {
      avatar = {uri: item.item.avatar};
    }
    return (
      <View key={item.item.key}>
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.avatar} source={avatar} />
          <View style={listItemStyle.content}>
            <Text style={listItemStyle.nameText}>{item.item.username}</Text>
            <Text style={listItemStyle.msgText}>{base64Utils.decoder(item.item.content)}</Text>
            {this.renderImages(item.item.pictures)}
            <View style={listItemStyle.timeContainer}>
              <Text style={listItemStyle.timeText}>{timeUtils.getFormattedTime(item.item.time)}</Text>
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
                <Text style={listItemStyle.commentText}>普京大帝：二营长，把他娘的意大利.........面给我端上来！</Text>
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
  imageContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  imageCell: {
    width: 80,
    height: 80,
    marginRight: 3,
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
