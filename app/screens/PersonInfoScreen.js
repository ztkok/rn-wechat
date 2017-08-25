import React, { Component } from 'react';
import CommonTitleBar from '../views/CommonTitleBar';
import ListItemDivider from '../views/ListItemDivider';
import ImagePicker from 'react-native-image-crop-picker';
import StorageUtil from '../utils/StorageUtil';
import CountEmitter from '../event/CountEmitter';
import LoadingView from '../views/LoadingView.js';

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
  ToastAndroid
} from 'react-native';

var { width, height} = Dimensions.get('window');
var global = require('../utils/global.js');
var utils = require('../utils/utils.js');

export default class PersonInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      avatar: '',
      showProgress: false
    };
    StorageUtil.get('username', (error, object)=>{
      if (!error && object != null) {
        this.setState({username: object.username});
      }
    });
    StorageUtil.get('avatar', (error, object)=>{
      if (!error && object != null) {
        this.setState({avatar: object.avatar});
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar nav={this.props.navigation} title={"个人信息"}/>
        {
          this.state.showProgress ? (
            <LoadingView cancel={()=>this.setState({showProgress: false})} />
          ) : (null)
        }
        <View style={styles.list}>
          <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{this.modifyAvatar()}}>
            <View style={styles.listItem}>
              <Text style={styles.listItemLeftText}>头像</Text>
              <View style={styles.rightContainer}>
                <Image style={[styles.listItemRight, styles.avatarImg]} source={utils.isEmpty(this.state.avatar) ? require('../../images/avatar.png') : {uri: this.state.avatar}} />
              </View>
            </View>
          </TouchableHighlight>
          <ListItemDivider />
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>昵称</Text>
            <View style={styles.rightContainer}>
              <Text>{this.state.username}</Text>
            </View>
          </View>
          <ListItemDivider />
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>微信号</Text>
            <View style={styles.rightContainer}>
              <Text>大王叫我来巡山</Text>
            </View>
          </View>
          <ListItemDivider />
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>二维码名片</Text>
            <View style={styles.rightContainer}>
              <Image style={[styles.listItemRight, styles.qrcodeImg]} source={require('../../images/ic_qr_code.png')} />
            </View>
          </View>
          <ListItemDivider />
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>更多</Text>
          </View>
          <View style={{height: 20, width: width}} />
          <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{}}>
            <View style={styles.listItem}>
              <Text style={styles.listItemLeftText}>我的地址</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  modifyAvatar() {
    // 修改头像
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      // image: Object {size: 34451, mime: "image/jpeg", height: 300, width: 300, path: "file:///data/user/0/com.testreactnavigation/cache/…p-picker/01b5d49d-3805-45d3-bdd7-4f49939706d0.jpg"}
      this.setState({showProgress: true});
      let path = image.path;
      let filename = path.substring(path.lastIndexOf('/') + 1, path.length);
      let username = this.state.username;
      if (utils.isEmpty(username)) {
        ToastAndroid.show("用户未登录", ToastAndroid.SHORT);
      } else {
        let formData = new FormData();
        formData.append('username', username);
        let file = {uri: image.path, type: 'multipart/form-data', name: filename};
        formData.append('file', file);
        let url = 'http://rnwechat.applinzi.com/save';
        fetch(url, {method: 'POST', body: formData})
          .then((res)=>res.json())
          .then((json)=>{
            this.setState({showProgress: false});
            if (!utils.isEmpty(json)) {
              if (json.code == 1) {
                ToastAndroid.show("修改头像成功", ToastAndroid.SHORT);
                StorageUtil.set('avatar', {'avatar': json.msg});
                this.setState({avatar: json.msg});
                // 发送消息通知其他界面更新头像
                CountEmitter.emit('updateAvatar');
              } else {
                ToastAndroid.show(json.msg, ToastAndroid.SHORT);
              }
            }
        }).catch((e)=>{
          this.setState({showProgress: false});
          ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
        })
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  listItemLeftText: {
    alignItems: 'flex-start',
    color: '#000000',
    fontSize: 16,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  listItemRight: {
    alignItems: 'flex-end'
  },
  avatarImg: {
    width: 60,
    height: 60,
  },
  qrcodeImg: {
    width: 25,
    height: 25,
  }
})
