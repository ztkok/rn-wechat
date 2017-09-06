# RNWeChat
* 使用ReactNative开发的仿微信客户端，欢迎大家给个star或fork，谢谢~~
* 如果在项目构建过程中有任何问题，欢迎提issue，我有空一定帮忙解答~~

# 运行方法
1. 在项目根目录下执行npm install
2. 项目中的导航组件使用的ReactNavigation，所以还需要执行npm install --save react-navigation
3. 二维码扫描组件使用了开源项目react-native-camera和AC-QRCode-RN，即时通讯使用了网易云react-native-netease-im库，图片选择和裁剪使用了react-native-image-crop-picker库，请按这四个项目的文档添加至项目中，地址为：
  * https://github.com/lwansbrough/react-native-camera
  * https://github.com/MarnoDev/AC-QRCode-RN/blob/master/README_CN.md
  * https://github.com/reactnativecomponent/react-native-netease-im
  * https://github.com/ivpusic/react-native-image-crop-picker
4. 上面几步执行结束后，再执行react-native run-android即可
5. apk目录下有RNWeChat-release.apk文件，可直接安装查看效果

# 注意
打release包时请使用自己的签名文件和签名配置，请注意android/app/build.gradle文件中的
```
signingConfigs {
    release {
        storeFile file(MYAPP_RELEASE_STORE_FILE)
        storePassword MYAPP_RELEASE_STORE_PASSWORD
        keyAlias MYAPP_RELEASE_KEY_ALIAS
        keyPassword MYAPP_RELEASE_KEY_PASSWORD
    }
}
```

# 更新
* 2017-06-08  修改联系人数据从服务端获取，包括联系人姓名、头像等，其他部分数据暂时为测试数据
* 2017-08-11 加入扫一扫功能，加入登录注册页面，登录和注册的功能后面实现，加入购物页面和卡包页面
* 2017-08-15 加入注册、登录和注销功能，可以注册新用户，IM功能采用了网易云信SDK
* 2017-08-18 修改注册和登录功能，加入了网易云信SDK。（聊天功能暂未完成，还在开发中）
* 2017-08-24 加入个人信息页面，加入修改头像的功能
* 2017-08-29 完成发朋友圈的功能
* 2017-09-05  完成朋友圈的点赞和评论功能，为了逻辑简单，只做了针对楼主的评论，没有做针对回复人的评论
* 2017-09-06  加入摇一摇页面，加入APP更新对话框（该更新不是热更新，而是下载apk覆盖安装的更新，等后面完成所有功能的开发后再加入热更新功能），修复某些bug

# 截图
![image](https://github.com/yubo725/RNWeChat/blob/master/screenshots/666.png)
![image](https://github.com/yubo725/RNWeChat/blob/master/screenshots/111.png)
![image](https://github.com/yubo725/RNWeChat/blob/master/screenshots/222.png)
![image](https://github.com/yubo725/RNWeChat/blob/master/screenshots/333.png)
![image](https://github.com/yubo725/RNWeChat/blob/master/screenshots/444.png)
![image](https://github.com/yubo725/RNWeChat/blob/master/screenshots/555.png)
