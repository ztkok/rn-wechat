import React, { Component } from 'react';
import StorageUtil from '../utils/StorageUtil';
import utils from '../utils/utils';
import base64Utils from '../utils/base64';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TextInput,
  Button
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ReplyPopWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      inputContent: '',
      isUpdateUserInfo: false
    };
    StorageUtil.get('username', (error, object)=>{
      if (!error && object != null) {
        this.setState({username: object.username});
      }
    });
  }
  componentDidMount() {
    let input = this.refs.textInput;
    if (!utils.isEmpty(input)) {
      input.focus();
    }
  }
  render() {
    let placeholderText = '';
    if (!this.state.isUpdateUserInfo) {
      placeholderText = "回复" + this.state.momentUsername;
    } else {
      placeholderText = "取个中文昵称，当然英文的也没啥问题";
    }
    return (
      <View style={styles.container}>
        <Modal transparent={true}
          visible={this.state.show}
          onRequestClose={() => this.closeModal()}>
          <TouchableOpacity onPress={()=>this.closeModal()} style={styles.modalContainer}>
            <View style={styles.modalContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEEEEE', paddingLeft: 10, paddingRight: 10}}>
                <TextInput
                  style={{flex: 1}}
                  ref="textInput"
                  placeholder={placeholderText}
                  autoFocus={true}
                  onChangeText={(text)=>this.setState({inputContent: text})}
                />
                {
                  !utils.isEmpty(this.state.inputContent) ? (
                    <Button color={'#49BC1C'} title={this.state.isUpdateUserInfo ? "修改" : "回复"} onPress={()=>this.handleBtnClick()} />
                  ) : (null)
                }
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
  handleBtnClick() {
    if (!this.state.isUpdateUserInfo) {
      this.sendPost();
    } else {
      this.updateUserInfo();
    }
  }
  sendPost() {
    let momentId = this.state.momentId;
    let replyContent = this.state.inputContent;
    if (utils.isEmpty(replyContent)) {
      ToastAndroid.show('回复内容不能为空', ToastAndroid.SHORT);
      return;
    }
    replyContent = base64Utils.encoder(replyContent);
    let replyUsername = this.state.username;
    let formData = new FormData();
    formData.append('momentId', momentId);
    formData.append('replyUsername', replyUsername);
    formData.append('replyContent', replyContent);
    let url = "http://rnwechat.applinzi.com/reply";
    this.closeModal();
    fetch(url, {method: 'POST', body: formData}).then((res)=>res.json())
    .then((json)=>{
      if (json != null) {
        // 回复成功
        if (json.code == 1) {
          // 刷新回复列表
          this.refreshReply(momentId, json.msg);
        } else {
          ToastAndroid.show(json.msg, ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('回复失败', ToastAndroid.SHORT);
      }
    }).catch((e)=>{
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    });
  }
  refreshReply(momentId, data) {
    let callback = this.state.successCallback;
    if (!utils.isEmpty(callback)) {
      callback(momentId, data);
    }
  }
  closeModal() {
    this.setState({show: false})
  }
  showModal(momentId, momentUsername, successCallback) {
    this.setState({
      momentId: momentId,
      momentUsername: momentUsername,
      show: true, successCallback: successCallback,
      isUpdateUserInfo: false
    });
  }
  showModalWhenUpdateInfo(contactId, updateCallback) {
    this.setState({
      show: true,
      contactId: contactId,
      isUpdateUserInfo: true,
      updateCallback: updateCallback
    });
  }
  updateUserInfo() {
    let contactId = this.state.contactId;
    let newNickName = this.state.inputContent;
    if (utils.isEmpty(newNickName)) {
      ToastAndroid.show('请输入昵称', ToastAndroid.SHORT);
      return;
    }
    if (newNickName.length > 8) {
      ToastAndroid.show('昵称要不要取这么长', ToastAndroid.SHORT);
      return;
    }
    // 请求服务器修改昵称
    if (this.state.updateCallback) {
      this.closeModal();
      this.state.updateCallback(contactId, newNickName);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: width
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});
