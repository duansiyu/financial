import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';

import TitleBar from '../../components/TitleBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Service from '../../utils/service';
import Login from './login';
import RetrievePasswordPage from './retrievePasswordPage';
import {toastShort} from '../../utils/Toast';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class SetNewPassword extends Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  	setNewPassword:'',
	  	surePassword:'',
      	onNextClick: this.onPressNext,
	  };
	}

	//返回
    _goBack(){
        goBack(this.props.navigator);
    }

    componentDidMount (){
      this.setState({mobilePhone:this.props.mobilePhone});
    }
    //保存
    onPressNext=() =>{
        if (this.state.setNewPassword=='') {
            toastShort('请设置新密码',-300);
            return;
        };
        if (this.state.setNewPassword.length<6) {
            toastShort('新密码长度少于6位字符！',-300);
            return;
        };
        if (this.state.surePassword=='') {
            toastShort('请确认密码',-300);
            return;
        };        
        if (this.state.setNewPassword!=this.state.surePassword) {
        	toastShort('两次密码输入不一致，请重新设置',-300);
            return;
        };

        this.setState({
            onNextClick: null,
        });

        let formData = new FormData();
        formData.append("OPT","104");
        formData.append("phoneNum",this.state.mobilePhone);
        formData.append("newPassword",this.state.setNewPassword);
        formData.append("en","F");
        Service.post(formData,(data)=>{
        	console.log(data);
            if(data.errorCode ==0){
                this.props.navigator.push({component:Login,name:'Login'});
            }else{
                Alert.alert('提示',data.errorMsg);
            }

            this.setState({
                onNextClick: this.onPressNext,
            })
        },(error)=>{
            this.setState({
                onNextClick: this.onPressNext,
            })
            console.log(error);
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
    }

	render(){
		return(
			<View style={styles.body}>
				<TitleBar
				title="找回密码"
                leftBtnFunc={this._goBack.bind(this)}/>
                <View style={styles.container}>
                	<View style={[styles.line]}>
						<Image source={require('../../imgs/other/password.png')}
							style={styles.img}>
						</Image>
						<TextInput style = {[styles.inputs,{paddingTop:100/StyleConfig.oPx}]}
						   underlineColorAndroid = "transparent"
						   placeholder= "设置新密码"
               placeholderTextColor="#999"
						   onChangeText = {
				       	   (setNewPassword) =>{this.setState({setNewPassword})}}
				       	   />
					</View>
					<View style={[styles.line2]}>
						<Image source={require('../../imgs/other/password.png')}
							style={styles.img2}>
						</Image>
						<TextInput style = {[styles.inputs,{paddingTop:60/StyleConfig.oPx}]}
						   underlineColorAndroid = "transparent"
						   placeholder= "确认密码"
               placeholderTextColor="#999"
						    onChangeText = {
				       	   (surePassword) =>{this.setState({surePassword})}}
				       	   />
					</View>
					<View style={[styles.btnContainer]}>
						<Button
						  text={'保存'}
						  textColor={'#fff'}
						  imgSource={require('../../imgs/other/index_exp_btn.png')}
						  height={104/StyleConfig.oPx}
						  width={680/StyleConfig.oPx}
						  onPress={this.state.onNextClick}
						/>
					</View>
        </View>
			</View>

		);
	}
}

const styles = StyleSheet.create({
  body:{
	width:StyleConfig.screen_width,
	height:StyleConfig.screen_height,
	backgroundColor:'#FFFFFF'
  },
  flex: {
	flex: 1  //平分填满父空间。
  },
  /**布局内容*/
  container: {
	marginLeft:40/StyleConfig.oPx,
	marginRight:40/StyleConfig.oPx,
	height:448/StyleConfig.oPx,
	width:StyleConfig.screen_width
  },
  line:{
	flexDirection: 'row',
	height:178/StyleConfig.oPx,
	width:StyleConfig.screen_width-80/StyleConfig.oPx,
	borderBottomWidth:1,
	borderColor:'#cccccc'
  },
  img:{
	marginLeft:10/StyleConfig.oPx,
	marginTop:106/StyleConfig.oPx,
    height:42/StyleConfig.oPx,
    width:28/StyleConfig.oPx
  },
  img2:{
  	marginLeft:10/StyleConfig.oPx,
	marginTop:60/StyleConfig.oPx,
    height:42/StyleConfig.oPx,
    width:28/StyleConfig.oPx
  },
  line2:{
	flexDirection: 'row',
	height:120/StyleConfig.oPx,
	width:StyleConfig.screen_width-80/StyleConfig.oPx,
	borderBottomWidth:1,
	borderColor:'#cccccc'
  },
  inputs: {
	paddingLeft:32/StyleConfig.oPx,
	width:450/StyleConfig.oPx,
	fontSize:15,
	color:'#999',
  },
  verticalLine:{
	marginTop:60/StyleConfig.oPx,
	height:42/StyleConfig.oPx,
	width:3/StyleConfig.oPx,
	backgroundColor:'#cccccc'
  },
  textStyle:{
	marginTop:60/StyleConfig.oPx,
	color:'#5aafff',
	paddingLeft:26/StyleConfig.oPx,
  },
  btnContainer:{
	height:148/StyleConfig.oPx,
	width:StyleConfig.screen_width-80/StyleConfig.oPx,
  marginTop:60/StyleConfig.oPx,
  },

});

// 输出
module.exports = SetNewPassword;
