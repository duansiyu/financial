'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   ListView
 } from 'react-native';
 import {StyleConfig} from '../style/index.js';
 const oPx = StyleConfig.oPx;
 export default class ProductList extends Component{
 	constructor(props) {
 	  super(props);
 	  this.state = {};
 	}

 	_getState(data){
      let state = this.props.data.state;
 	   let status = state =='转让完成'?
      <Image style={styles.img} source={require('../imgs/financial/turned.png')}/>
      :null;
      return status;
 	}

 	//利率转化百分比
 	_getRate(rate){
 		return (rate*100).toFixed(2);
 	}

   //待收本息
   _getInterest(money,interest){
      return money+interest;
   }

 	_renderElm(){
 		let data = this.props.data;
      let onPress = this.props.onPress;
 		return(
 			<TouchableOpacity style={styles.product_box} onPress={()=>onPress(data.id,data.title)}>
 				<View style={styles.product_title}>
 					<Text style={styles.product_title_text}>{data.title}</Text>
 				</View>
 				<View style={styles.product_bottom}>
	 				<View style={styles.product_left}>
	 					<View style={styles.product_row}>
		 					<Text style={styles.info}>转让价格:</Text>
		 					<Text style={styles.fontBlack}>{data.price}</Text>
		 					<Text>元</Text>
		 				</View>
		 				<View style={styles.product_row_end}>
		 					<Text style={styles.info}>待收本息:</Text>
		 					<Text style={styles.fontRed}>{this._getInterest(data.money,data.interest)}</Text>
		 				</View>
	 				</View>
	 				<View>
	 					<View style={styles.product_row}>
		 					<Text style={styles.info}>转让期数/总期数:</Text>
		 					<Text style={styles.fontBlack}>{data.period}/{data.periodtotle}</Text>
		 				</View>
		 				<View style={styles.product_row_end}>
		 					<Text style={styles.info}>利率:</Text>
		 					<Text style={styles.fontRed}>{this._getRate(data.rate)}</Text>
		 					<Text style={styles.symbol}>%</Text>
		 				</View>
	 				</View>
	 			</View>
	 			{this._getState(data)}
 			</TouchableOpacity>
 			);
 	}

 	render(){
 		const elm = this._renderElm();
 		return(
 				<TouchableOpacity>
 					{elm}
 				</TouchableOpacity>
 			);
 	}


 }

 const styles = StyleSheet.create({
 	product_box:{
 		position:'relative',
 		height:200/oPx,
 		paddingLeft:30/oPx,
	  marginTop:10/oPx,
	  backgroundColor:'#fff',
	  overflow:'hidden'
 	},
 	product_title:{
	    height:60/oPx,
	    marginTop:10,
	    flexDirection:'row',
	    alignItems:'center',
   },
   product_title_text:{
	    fontSize:28/oPx,
	    color:'#333',
	    alignSelf:'center',
	    fontWeight:'200'
   },
   product_bottom:{
   		height:110/oPx,
   		flexDirection:'row',
	    alignItems:'center',
   },
   product_left:{
   		width:StyleConfig.screen_width/2,
   },
   product_row:{
   		flexDirection:'row',
	    alignItems:'center',
	    height:50/oPx
   },
   product_row_end:{
   		flexDirection:'row',
	    alignItems:'center',
	    height:50/oPx
   },
   info:{
   		fontWeight:'200',
   		fontSize:24/oPx,
   		color:'#999999'
   },
   fontBlack:{
   		fontWeight:'200',
   		fontSize:28/oPx,
   		color:'#333',
   		marginLeft:5/oPx,
   },
   fontRed:{
   		color:'#ff6600',
   		fontWeight:'200',
   		fontSize:28/oPx,
   		marginLeft:5/oPx,
   },
   symbol:{
   		marginLeft:5/oPx,
   		color:'#ff6600',
   		fontWeight:'200',
   		fontSize:20/oPx,
   },
   img:{
   		position:'absolute',
   		top:0,
   		right:0,
   		width:94/oPx,
   		height:108/oPx
   }
 })
