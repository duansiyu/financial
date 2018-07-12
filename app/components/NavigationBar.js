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

export default class NavigationBar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
	 	return(
	 		<View style={styles.cotainer}>
	 			<View style={styles.statusBarHeight}>
					<StatusBar/>
				</View>
	 			<View style={styles.navbar}>
	 				<Text style={styles.font}>
	 					{this.props.title}
	 				</Text>		
	 			</View>
	 		</View>
	 		
	 		);
	 }
	 
}

	 const styles = StyleSheet.create({
	 	cotainer:{
	 		
	 	},
	 	statusBarHeight:{
			backgroundColor:'#ffb133',
     		//height:STATUS_BAR_HEIGHT
   		},
	 	navbar:{
	 		justifyContent:'center',
	 		alignItems:'center',
	 		height:NAV_BAR_HEIGHT,
	 		backgroundColor:'#ffb133'
	 	},
	 	font:{	 		
		 	fontSize:42/oPx,
		 	justifyContent:'center',
	 		alignItems:'center',
			color:'#fff'
		}	
	 });