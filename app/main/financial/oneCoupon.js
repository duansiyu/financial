'use strict';
 import React, {Component} from 'react';
 import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	ListView,
 } from 'react-native';

 import {StyleConfig} from '../../style/index';
 import financiaDetail from './financiaDetail';
 import {Navigator} from 'react-native-deprecated-custom-components';
 const oPx = StyleConfig.oPx;

 export default class oneCoupon extends Component{
 	constructor(props) {
 	  super(props); 	
 	  this.state = {};
 	}
	
 	render(){
 		let data = this.props.data;
 		let onPress = this.props.onPress; 
 		return(
 			<View>
	 			{ data.usestatus=='0'&&data.statedesc=='1'?
		 			<TouchableOpacity style={styles.one} onPress={()=>onPress(data.money)}>
		 				<View style={styles.line}></View>
		 				<View style={styles.content}>
		 					<View style={styles.left}>
		 						<Text style={styles.num}>￥{data.money}</Text>
		 					</View>
		 					<View style={styles.right}>
		 						<Text style={styles.text}>最小投资{data.minTendMoney}元,最小投资月份{data.minTendMonth}月</Text>
		 						<Text style={styles.text}>{data.inserttime}-{data.useendtime}</Text>
		 					</View>
		 				</View>
		 			</TouchableOpacity>:null
		 		}	
 			</View>		
 			);
 	}
 }

 const styles = StyleSheet.create({
 	one:{
 		marginLeft:24/oPx,
 		marginRight:24/oPx,
 		marginTop:20/oPx,
 		borderRadius:8/oPx, 
 		backgroundColor:'#fff',
 		width:StyleConfig.screen_width-48/oPx,		
 	},
 	line:{
 		height:30/oPx,
 		width:StyleConfig.screen_width-48/oPx,
 		backgroundColor:'#f7315c',
 		borderTopLeftRadius:8/oPx,
 		borderTopRightRadius:8/oPx,
 	},
 	used:{
 		height:30/oPx,
 		width:StyleConfig.screen_width-48/oPx,
 		backgroundColor:'#666',
 		borderTopLeftRadius:8/oPx,
 		borderTopRightRadius:8/oPx,
 	},
 	content:{
 		width:StyleConfig.screen_width-48/oPx,
 		height:100/oPx,
 		flexDirection:'row',
 	},
 	left:{
 		flex:1,
 	},
 	right:{
 		flex:4,
 		paddingRight:10/oPx,
 	},
 	num:{
 		marginTop:10/oPx,
 		marginLeft:10/oPx,
 		marginRight:10/oPx,
 		fontSize:30/oPx,
 		color:'#f7315c',
 	},
 	text:{
 		fontSize:24/oPx,
 		color:'#666',
 		marginTop:10/oPx,
 		textAlign:'right',
 	}
 })