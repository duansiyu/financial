import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

import {StyleConfig} from '../style';
let oPx = StyleConfig.oPx;
//状态栏
let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
//导航栏高度
const NAV_BAR_HEIGHT = 120/oPx;

export default class TitleBar extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}

	render(){
    const {leftBtnFunc} = this.props;
		return(
			<View>
				<View style={styles.statusBarHeight}>
					<StatusBar/>
				</View>
				<View  style={styles.nvBarView}>
					<TouchableOpacity style={styles.left} onPress={leftBtnFunc}>
						<Image style={styles.icon} source={require('../imgs/icon/icon_left.png')}/>
					</TouchableOpacity>
					<View style={styles.right}>
						 <Text style={styles.text} numberOfLines={1}>
	           				{this.props.title}
	         			</Text>
					</View>
				</View>
			</View>
			);
	}

}

const styles = StyleSheet.create({
	statusBarHeight:{
		backgroundColor:'#fff',
     	//height:STATUS_BAR_HEIGHT
   },
	nvBarView:{
		backgroundColor:'#ffb133',
		flexDirection:'row',
		height:NAV_BAR_HEIGHT,
		alignItems:'center',
	},
	left:{
		width:50/oPx,
		height:50/oPx,
		justifyContent:'center',
		marginLeft:20/oPx
	},
	icon:{
		width:50/oPx,
		height:50/oPx
	},
	right:{
		marginLeft:20/oPx,
		height:120/oPx,
		justifyContent:'center',
	},
	text:{
		fontSize:40/oPx,
		color:'#fff',
		textAlign:'center',
	}
})
