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

 import Title from '../../../components/TitleBar';
 import Service from '../../../utils/service';
 import {goBack} from '../../../utils/NavigatorBack';

 let url = Service.HOST+'/userBank/toAddUserCard';
 //let url = 'https://m.facebook.com';
 var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

export default class AddBank extends Component{
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
  				<Title title="添加银行卡" leftBtnFunc={this._goBack.bind(this)}/>
          		<WebView
		           style={{width:deviceWidth, height:deviceHeight}}
		           source={{uri:url}}
		        /> 
  			</ScrollView>
  			);
  	}
  }