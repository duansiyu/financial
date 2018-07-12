'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   Alert,
   WebView,
   Dimensions,
   TouchableOpacity
 } from 'react-native';
 import {goBack} from '../../../utils/NavigatorBack';
 import Title from '../../../components/TitleBar';
 import Service from '../../../utils/service';
 let url = Service.HOST + '/huifu/userregisterM';
 //let url = 'http://120.76.203.19:8080/huifu/userregisterM';
 var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

 export default class OpenHuifu extends Component{
  	constructor(props) {
  	  super(props);

  	  this.state = {};
  	}

    _goBack(){
      goBack(this.props.navigator);
   }

  	render(){
  		return( 
  		  	<ScrollView> 			
  				<Title title="开通汇付" leftBtnFunc={this._goBack.bind(this)}/>
          		<WebView
		           style={{width:deviceWidth, height:deviceHeight}}
		          source={{uri:url}}
		        /> 
  			</ScrollView>
  			);
  	}
  }