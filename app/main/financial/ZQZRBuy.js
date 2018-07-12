'use strict';
 import React, {Component} from 'react';
 import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	ListView,
	WebView,
	ScrollView,
	Platform,
	Alert,
 } from 'react-native';

 import {goBack} from '../../utils/NavigatorBack';
 import {StyleConfig} from '../../style/index';
 import TitleBar from '../../components/TitleBar';
 import TabNavigator from 'react-native-tab-navigator';
 const oPx = StyleConfig.oPx;
 var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');



export default class ZQZRBuy extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	_goBack(){
      goBack(this.props.navigator);
    }

	componentDidMount() {  
	      this.setState({  
	          uri:this.props.uri,  	      
	      });
	    } 

    render(){
    	return(
    		<ScrollView>
    		<TitleBar title="购买" leftBtnFunc={this._goBack.bind(this)}/>
    		<WebView 
                style={{width:750/oPx,height:deviceHeight}}
                source={{uri: this.state.uri}}
                />
             </ScrollView>
    		);
    } 
 }