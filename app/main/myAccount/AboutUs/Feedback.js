import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
const oPx = StyleConfig.oPx;

export default class Feedback extends Component {
	constructor(props) {
    super(props);
    this.state={};
 }

 _goBack(){
    goBack(this.props.navigator);
  }

 render(){
 	return (
 		<View style={styles.container}>
	 		<TitileBar title="意见反馈" leftBtnFunc={this._goBack.bind(this)}/>
	 		<View style={styles.inputBox}>
	 			<TextInput
	 				style={styles.textArea}
	 				placeholderTextColor="#999"
                    underlineColorAndroid = "transparent"
                    multiline = {true}
                    numberOfLines ={5}
	 			 	placeholder="您们的吐槽和反馈，是我们进步的方向"/>
	 		</View>
	 		<View style={styles.inputView}>
	 			<Text style={styles.text}>联系方式</Text>
	 			<TextInput
	 			    style={styles.input} 
	 				placeholder="邮箱或手机号,可不填"
	 				placeholderTextColor="#999"
                    underlineColorAndroid = "transparent"/>
	 		</View>
	 		<TouchableOpacity style={styles.button}>
	 			<Text style={styles.buttonText}>提交</Text>
	 		</TouchableOpacity>
	 		<View style={styles.bottomView}>
	 			<Text style={styles.infoText}>您还可以通过以下方式反馈给我们</Text>
	 			<View style={styles.line}>
	 				<Image source={require('../../../imgs/myAccount/invite_icon_sina.png')}
	 						style={styles.image}/>
	 				<Text style={styles.lineText}>官方微博: 深圳中仁财富</Text>
	 			</View>
	 			<View style={styles.line}>
	 				<Image 
	 					style={styles.image}
	 					source={require('../../../imgs/myAccount/invite_icon_WeChat.png')}/>
	 				<Text style={styles.lineText}>官方微信: zhongrencaifu</Text>
	 			</View>
	 		</View>	 		
	 	</View>
 	);
 }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#f5f5f5',
	},
	inputBox:{
		marginTop:42/oPx,
		marginLeft:24/oPx,
		marginRight:24/oPx,
		borderColor:'#c9c9c9',
		height:300/oPx,
		width:StyleConfig.screen_width-48/oPx,
		borderRadius:8/oPx,
		backgroundColor:'#fff',
		borderWidth:StyleConfig.borderWidth,
	},
	input:{
		fontSize:24/oPx,
		color:'#999',
		height:70/oPx,
		width:520/oPx,
	},
	textArea:{
		height:300/oPx,
		paddingLeft:30/oPx,
		fontSize:24/oPx,
		color:'#999',
		width:StyleConfig.screen_width-72/oPx,
	},
	inputView:{
		marginTop:24/oPx,
		marginLeft:24/oPx,
		marginRight:24/oPx,
		borderColor:'#c9c9c9',
		height:70/oPx,
		width:StyleConfig.screen_width-48/oPx,
		borderRadius:8/oPx,
		backgroundColor:'#fff',
		borderWidth:StyleConfig.borderWidth,
		flexDirection:'row',
		alignItems:'center',
	},
	text:{
		fontSize:24/oPx,
		color:'#333',
		marginLeft:30/oPx,
		marginLeft:30/oPx,
	},
	button:{
		backgroundColor:'#ffb133',
		height:80/oPx,
		borderRadius:8/oPx,
		marginTop:50/oPx,
		marginLeft:24/oPx,
		marginRight:24/oPx,
		alignItems:'center',
		justifyContent:'center',
	},
	buttonText:{
		color:'#fff',
		fontSize:36/oPx,
	},
	infoText:{
		fontSize:28/oPx,
		color:'#333',
	},
	bottomView:{
		marginTop:50/oPx,
		marginLeft:24/oPx,
		marginRight:24/oPx,
	},
	line:{
		flexDirection:'row',
		marginTop:10/oPx,
	},
	lineText:{
		fontSize:24/oPx,
		color:'#333',
	},
	image:{
		width:40/oPx,
		height:40/oPx,
		marginRight:10/oPx,
	},

})


