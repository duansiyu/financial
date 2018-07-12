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
 let url = Service.HOST + '/mobileVisitor/hd_16120102.htm';

 var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

 export default class LookPrize extends Component{
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
  				<Title title="查看奖品" leftBtnFunc={this._goBack.bind(this)}/>
          		<WebView
		           style={{width:deviceWidth, height:deviceHeight}}
		          source={{uri:url}}
		        /> 
  			</ScrollView>
  			);
  	}
  }