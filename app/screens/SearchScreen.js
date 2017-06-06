import React, { Component } from 'react';
import SearchTitleBar from '../views/SearchTitleBar.js';
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

export default class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchTitleBar nav={this.props.navigation}/>
        <View style={styles.content}>
          <Text style={styles.searchHintText}>搜索指定内容</Text>
          <View style={styles.row}>
            <View style={styles.rowItem}><Text style={styles.rowItemText}>朋友圈</Text></View>
            <View style={styles.rowItemDivider}/>
            <View style={styles.rowItem}><Text style={styles.rowItemText}>文章</Text></View>
            <View style={styles.rowItemDivider}/>
            <View style={styles.rowItem}><Text style={styles.rowItemText}>公众号</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}><Text style={styles.rowItemText}>小说</Text></View>
            <View style={styles.rowItemDivider}/>
            <View style={styles.rowItem}><Text style={styles.rowItemText}>音乐</Text></View>
            <View style={styles.rowItemDivider}/>
            <View style={styles.rowItem}><Text style={styles.rowItemText}>表情</Text></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  searchHintText: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
    color: '#999999'
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowItemText: {
    color: '#49BC1C',
  },
  rowItemDivider: {
    width: 1 / PixelRatio.get(),
    height: 20,
    backgroundColor: '#000000'
  }
})
