'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   Alert,
   TouchableOpacity
 } from 'react-native';

 import {StyleConfig} from '../../../style/index';
 import TitleBar from '../../../components/TitleBar';
 import {goBack} from '../../../utils/NavigatorBack';
 import Service from '../../../utils/service';
 import Authentication from './Authentication';//身份验证
 import Mobile from './MobileVerification';//手机验证
 import LoginPassword from './LoginPassword';//登录密码
 import Gesture from './GestureCipher';//手势密码
 const oPx = StyleConfig.oPx;

 export default class SecurityCenter extends Component{
  	constructor(props) {
  	  super(props);
  	  this.state = {};
  	}

  	_goBack(){
  		goBack(this.props.navigator);
  	}

  	componentDidMount(){
  		this._getData();
  	}

  	_getData(){
  		let personData = new FormData();
  		personData.append("OPT","156");
  		Service.post(personData,(data)=>{
  			console.log(data);
  			this.setState({
  				realName:data.result.realName, //真实姓名
				cardId:data.result.cardId,     //身份证号
				phone:data.result.phone,       //手机号码
  			});
  		})
  	}

  	//身份是否验证
  	verify(realName,cardId){
  		if(realName==null||realName==''||cardId==null||cardId=='')
  		{
  			return "未验证";
  		}else{
  			return "已验证";
  		}
  	}

  	//身份验证
  	_goToAuthentication = ()=>{
  		this.props.navigator.push({
          component: Authentication,
          name: 'Authentication',
        }); 
  	}

  	//手机验证
  	_goToMobile = ()=>{
  		this.props.navigator.push({
          component: Mobile,
          name: 'Mobile'
        }); 
  	}

  	//登录密码
  	_goToLoginPassword = ()=>{
  		this.props.navigator.push({
          component: LoginPassword,
          name: 'LoginPassword'
        }); 
  	}

  	//手势密码
  	_goToGesture = ()=>{
  		this.props.navigator.push({
          component: Gesture,
          name: 'Gesture'
        });
  	}

	render(){
		return(
			<View>
				<TitleBar title="安全中心" leftBtnFunc={this._goBack.bind(this)}/>
				<View style={{marginTop:20/oPx}}>
					<TouchableOpacity style={styles.line} onPress={this._goToAuthentication}>
 						<Text style={styles.line_font}>身份验证</Text>
 						<Text>{this.verify(this.state.realName,this.state.cardId)}</Text>
 						<Image source={require('../../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
 					<TouchableOpacity style={styles.line} onPress={this._goToMobile}>
 						<Text style={styles.line_font}>手机验证</Text>
 						<Text>已验证</Text>
 						<Image source={require('../../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
				</View>
				<View style={{marginTop:20/oPx}}>
					<TouchableOpacity style={styles.line} onPress={this._goToLoginPassword}>
 						<Text style={styles.left_font}>登录密码</Text>
 						<Image source={require('../../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
 					<TouchableOpacity style={styles.line} onPress={this._goToGesture}>
 						<Text style={styles.left_font}>手势密码</Text>					
 						<Image source={require('../../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
				</View>
			</View>
			);
	}
  }

 const styles = StyleSheet.create({
 	//行
		line:{
			height:100/oPx,
			width:StyleConfig.screen_width,
			backgroundColor:'#fff',
			borderColor:StyleConfig.borderColor,
			borderBottomWidth:StyleConfig.borderWidth,
			paddingLeft:24/oPx,
			paddingRight:24/oPx,
			flexDirection:'row',
			alignItems:'center',
		},
		line_font:{
			color:'#333',
			fontSize:28/oPx,
			width:600/oPx,
			paddingLeft:10/oPx
		},
		left_font:{
			color:'#333',
			fontSize:28/oPx,
			width:680/oPx,
			paddingLeft:10/oPx
		},
		have:{
			fontSize:28/oPx,
			color:'#333',
		},
		no:{
			fontSize:28/oPx,
			color:'#666',
		},
		icon_right:{
			width:22/oPx,
			height:22/oPx,
		},
 })