'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   Alert,
   TextInput,
   TouchableOpacity
 } from 'react-native';

 import {StyleConfig} from '../../../style/index';
 import TitleBar from '../../../components/TitleBar';
 import {goBack} from '../../../utils/NavigatorBack';
 import {toastShort} from '../../../utils/Toast';
 import Service from '../../../utils/service';
 import Login from '../../other/login';
 import ForgetPwd from '../../other/retrievePasswordPage';
 import Storage from '../../../utils/Storage';
 import {Navigator} from 'react-native-deprecated-custom-components';
 const oPx = StyleConfig.oPx;

 export default class LoginPassword extends Component{
  	constructor(props) {
  	  super(props);
  	  this.state = {
        oldPassword:null,
        newPassword:null,
        surePassword:null,
      };
  	}

  	_goBack(){
  		goBack(this.props.navigator);
  	}

    _goForget(){
       this.props.navigator.resetTo({component:ForgetPwd,name:'ForgetPwd'});
    }

    //修改
    button(){
      if(this.state.oldPassword==null||this.state.oldPassword==''){
         return (
            toastShort('请先输入旧密码！',-300)
          );
      }
      if(this.state.newPassword==null||this.state.newPassword==''){
        return (
            toastShort('请输入新密码！',-300)
          );
      }
      if(this.state.surePassword==null||this.state.surePassword==''){
        return (
            toastShort('请确认新密码！',-300)
          );
      }
      if(this.state.newPassword.length<6){
         return (
            toastShort('新密码长度少于6位字符！',-300)
          );
      }
      if(this.state.newPassword!=this.state.surePassword){
        return (
            toastShort('两次密码不一致',-300)
          )
      }
      if(this.state.oldPassword==this.state.newPassword){
        return (
            toastShort('新密码与原密码相同',-300)
          )
      }
      let data = global.USER;
      console.log(data.PHONE);

      let modifyPwd = new FormData();
      modifyPwd.append("OPT","158");
      modifyPwd.append("oldPwd",this.state.oldPassword);
      modifyPwd.append("pwd",this.state.newPassword);
      Service.post(modifyPwd,(data)=>{
        if(data.errorCode==0){
          toastShort('修改成功',-300);
           global.USER = null;
           Storage.clear();
           this.props.navigator.resetTo({component:Login,name:'Login'});
        }else{
          toastShort(data.errorMsg,-300)
        }
      })
    }

  	render(){
  		return(
  			<View style={{backgroundColor:'#f5f5f5',height:StyleConfig.screen_heigth}}>
  				<TitleBar title="登录密码" leftBtnFunc={this._goBack.bind(this)}/>
  				<View style={{marginTop:20/oPx}}>
		          <View style={styles.line}>
		            <Text style={styles.line_font}>旧密码:</Text>
		            <TextInput style={styles.right} 
                  underlineColorAndroid = "transparent"
                   placeholder="原登录密码"
                   placeholderTextColor="#999"
                   ref="oldPassword"
                   onChangeText={(oldPassword) => this.setState({oldPassword})}/>
		          </View>
        		</View>
        		<View style={{marginTop:20/oPx}}>
		          <View style={styles.lineB}>
		            <Text style={styles.line_font}>新密码:</Text>
		            <TextInput style={styles.right} 
                  underlineColorAndroid = "transparent"
                  placeholder="最少6个字符"
                  placeholderTextColor="#999"
                  ref="newPassword"
                  onChangeText={(newPassword) => this.setState({newPassword})}
                  />
		          </View>
		          <View style={styles.line}>
		            <Text style={styles.line_font}>重新输入:</Text>
		            <TextInput style={styles.right} 
                  underlineColorAndroid = "transparent"
                  placeholder="重新输入新密码"
                  placeholderTextColor="#999"
                  ref="surePassword"
                  onChangeText={(surePassword) => this.setState({surePassword})}/>
		          </View>
        		</View>
        		<View style={styles.forget}>
        			<TouchableOpacity style={styles.forgetBotton} onPress={this._goForget.bind(this)}>
        				<Text style={styles.forgetText}>忘记密码？</Text>
        			</TouchableOpacity>
        		</View>
        		<TouchableOpacity style={styles.button} onPress={this.button.bind(this)}>
		          <Text style={styles.button_text}>修改信息</Text>
		        </TouchableOpacity>
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
      paddingLeft:24/oPx,
      paddingRight:24/oPx,
      flexDirection:'row',
      alignItems:'center',
    },
    lineB:{
      height:100/oPx,
      width:StyleConfig.screen_width,
      backgroundColor:'#fff',
      paddingLeft:24/oPx,
      paddingRight:24/oPx,
      flexDirection:'row',
      alignItems:'center',
      borderColor:StyleConfig.borderColor,
      borderBottomWidth:StyleConfig.borderWidth,
    },
    line_font:{
      color:'#333',
      fontSize:28/oPx,
      width:160/oPx,
      paddingLeft:10/oPx,
      //textAlign:'right',
    },
    right:{
      marginLeft:10/oPx,
      width:470/oPx,
      fontSize:28/oPx,
      color:'#666',
    },
    forget:{
      width:750/oPx,
      justifyContent:'flex-end',
    },
    forgetBotton:{
      width:132/oPx,
      marginTop:30/oPx,
      marginBottom:30/oPx,
      marginLeft:600/oPx,
    },
    forgetText:{
      fontSize:24/oPx,
      color:'#4772b2',
    },
    button:{
      backgroundColor:'#ffb133',
      marginLeft:30/oPx,
      marginRight:30/oPx,
      height:80/oPx,
      width:StyleConfig.screen_width-60/oPx,
      alignItems:'center',
      justifyContent:'center',
    },
    button_text:{
      fontSize:28/oPx,
      color:'#fff',
    }
 })