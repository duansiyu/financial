import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimentsion,//获取设备屏幕的宽高
  ActivityIndicator
} from 'react-native';

let Util = {
	//屏幕尺寸
	windSize:｛
	width:Dimentsion.get('window').width,
	height:Dimentsion.get('window').height
},


 get:(url,data,successCallback,failCallback) =>{
   /* let data_gloabl = {
      pageType:"reactAPP"
    };
    let postData = Object.assign(data,data_gloabl);*/
    fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
        successCallback(responseData);
    })
    .catch((error) => {
        failCallback(error);
    });
  }

export default Util;