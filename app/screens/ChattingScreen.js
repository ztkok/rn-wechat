import React, { Component } from 'react';
import CommonTitleBar from '../views/CommonTitleBar';
import global from '../utils/global';
import utils from '../utils/utils';
import timeUtils from '../utils/timeutil';
import ChatBottomBar from '../views/ChatBottomBar';
import EmojiView from '../views/EmojiView';
import MoreView from '../views/MoreView';
import LoadingView from '../views/LoadingView';
import NIM from 'react-native-netease-im';
import StorageUtil from '../utils/StorageUtil';

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
  NativeAppEventEmitter,
  Platform
} from 'react-native';

var { width, height } = Dimensions.get('window');
const MSG_LINE_MAX_COUNT = 15;

export default class ChattingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiView: false,
      showMoreView: false,
      showProgress: false,
      isSessionStarted: false,
      messages: []
    };
    this.chatContactId = this.props.navigation.state.params.contactId;
    this.chatUsername = this.props.navigation.state.params.name;
    StorageUtil.get('avatar', (error, object)=>{
      if (!error && object != null) {
        this.setState({avatar: object.avatar});
      }
    });
  }
  render() {
    var moreView = [];
    if (this.state.showEmojiView) {
      moreView.push(
        <View key={"emoji-view-key"}>
          <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}} />
          <View style={{height: global.emojiViewHeight}}>
            <EmojiView />
          </View>
        </View>
      );
    }
    if (this.state.showMoreView) {
      moreView.push(
        <View key={"more-view-key"}>
          <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}} />
          <View style={{height: global.emojiViewHeight}}>
            <MoreView />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <CommonTitleBar title={this.chatUsername} nav={this.props.navigation} />
        {
          this.state.showProgress ? (
            <LoadingView cancel={()=>this.setState({showProgress: false})} />
          ) : (null)
        }
        <View style={styles.content}>
          <FlatList
            ref="flatList"
            data={this.state.messages}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            />
        </View>
        <View style={styles.divider} />
        <View style={styles.bottomBar}>
          <ChatBottomBar updateView={this.updateView} handleSendBtnClick={this.handleSendBtnClick}/>
        </View>
        {moreView}
      </View>
    );
  }
  handleSendBtnClick = (msg) => {
    this.sendTextMessage(msg);
  }
  // 发送文本消息
  sendTextMessage(msg) {
    NIM.sendTextMessage(msg);
  }
  sessionListener = (data) => {
    console.log(data);
    let messages = this.formatData(data);
    if (!Array.isArray(data)) {
      messages = [messages];
    }
    let historyMsg = this.state.messages;
    messages =  historyMsg.concat(messages);
    this.setState({messages: messages}, ()=>{
      this.scroll();
    });
  }
  msgStatusListener = (data) => {
    let newMessage = this.formatData(data);
    this.setState({messages: this.concatMessage(newMessage)}, ()=>{
      this.scroll();
    });
  }
  componentDidMount() {
    if (!this.isSessionStarted) {
      // 开始会话, 0：单聊 1：群聊
      NIM.startSession(this.chatContactId, "0");
      // 注册新消息监听器
      this.sessionListener = NativeAppEventEmitter.addListener("observeReceiveMessage", this.sessionListener);
      this.msgStatusListener = NativeAppEventEmitter.addListener("observeMsgStatus", this.msgStatusListener);
      // 查询最近20条聊天消息，格式为(数组)：{"content":"asdf","_id":"5b0bfddf2e074f80af12cdc67f331933","msgType":"0","createdAt":"1504834213","sessionType":"0","sessionId":"yubo777","attachStatus":"0","user":{"name":"yubo777","avatar":"","_id":"yubo777"},"direct":"1","status":"1","isRemoteRead":"0"}
      NIM.queryMessageListEx("", 20).then((data)=>{
        this.setState({messages: data});
      });
      this.setState({isSessionStarted: true});
    }
  }
  scroll() {
    this.scrollTimeout = setTimeout(()=>this.refs.flatList.scrollToEnd(), 0);
  }
  concatMessage(newData){
    let messages = this.state.messages;
    let isHas = false;
    messages.map((res,i)=>{
      if(res._id === newData[0]._id){
        messages[i] = newData[0];
        isHas = true;
      }
    });
    if(!isHas){
        messages = messages.concat(newData);
    }
    return messages;
  }
  getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000);
  }
  formatData(arr){
    arr.map((m,i) => {
      if(Platform.OS === 'android' && m.attachStatus === "2"){
        if(m.imageObj && !m.imageObj.path2){
            console.log("downloading...")
            NIM.downloadAttachment(m._id);
        }
      }
      // arr[i].createdAt = this.getLocalTime(m.createdAt);
    });
    arr.sort(function(a,b){return b.createdAt - a.createdAt});
    return arr;
  }
  componentWillUnmount() {
    // 结束会话
    NIM.stopSession();
    this.sessionListener && this.sessionListener.remove();
    this.msgStatusListener && this.msgStatusListener.remove();
    this.scrollTimeout && clearTimeout(this.scrollTimeout);
    this.setState({isSessionStarted: false});
  }
  updateView = (emoji, more) => {
    this.setState({
      showEmojiView: emoji,
      showMoreView: more,
    })
  }
  // 当str长度超过某个限定值时，在str中插入换行符
  spliceStr(str) {
    var len = str.length;
    if (len > MSG_LINE_MAX_COUNT) {
      var pageSize = parseInt(len / MSG_LINE_MAX_COUNT) + 1;
      var result = '';
      var start, end;
      for (var i = 0; i < pageSize; i++) {
        start = i * MSG_LINE_MAX_COUNT;
        end = start + MSG_LINE_MAX_COUNT;
        if (end > len) {
          end = len;
        }
        result += str.substring(start, end);
        result += '\n';
      }
      return result;
    } else {
      return str;
    }
  }
  _keyExtractor = (item, index) => index
  shouldShowTime(item) {
    let index = item.index;
    if (index == 0) {
      // 第一条消息，显示时间
      return true;
    }
    if (index > 0) {
      let messages = this.state.messages;
      if (!utils.isEmpty(messages) && messages.length > 0) {
        let preMsg = messages[index - 1];
        let delta = item.item.createdAt - preMsg.createdAt;
        console.log('delta = ' + delta);
        if (delta > 3 * 60) {
          return true;
        }
      }
      return false;
    }
  }
  renderItem = (item) => {
    console.log(item)
    if (item.item.direct == 1) {
      // 接收的消息
      let contactAvatar = require('../../images/avatar.png');
      if (!utils.isEmpty(item.item.user.avatar)) {
        contactAvatar = {uri: item.item.user.avatar};
      }
      return (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          {
            this.shouldShowTime(item) ? (
              <Text style={listItemStyle.time}>{timeUtils.formatChatTime(parseInt(item.item.createdAt))}</Text>
            ) : (null)
          }
          <View style={listItemStyle.container}>
            <Image style={listItemStyle.avatar} source={contactAvatar} />
            <View style={listItemStyle.msgContainer}>
              <Text style={listItemStyle.msgText}>{this.spliceStr(item.item.content)}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      let avatar = require('../../images/avatar.png');
      if (!utils.isEmpty(this.state.avatar)) {
        avatar = {uri: this.state.avatar};
      }
      // 发送出去的消息
      return (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          {
            this.shouldShowTime(item) ? (
              <Text style={listItemStyle.time}>{timeUtils.formatChatTime(parseInt(item.item.createdAt))}</Text>
            ) : (null)
          }
          <View style={listItemStyle.containerSend}>
            <View style={listItemStyle.msgContainerSend}>
              <Text style={listItemStyle.msgText}>{this.spliceStr(item.item.content)}</Text>
            </View>
            <Image style={listItemStyle.avatar} source={avatar} />
          </View>
        </View>
      );
    }
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  msgContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  time: {
    backgroundColor: '#D4D4D4',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 11,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: global.pageBackgroundColor
  },
  bottomBar: {
    height: 50,
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: global.dividerColor,
  }
});
