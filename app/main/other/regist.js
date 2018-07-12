import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  //Navigator,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  LayoutAnimation,
  Keyboard,
} from 'react-native';

import {StyleConfig} from '../../style/index';
import TitleBar from '../../components/TitleBar';
import {styles} from '../../style/regist';
import Button from '../../components/Button';
import Login from '../../main/other/login';
import Service from '../../utils/service';
import {goBack} from '../../utils/NavigatorBack';
import {toastShort} from '../../utils/Toast';
import {Navigator} from 'react-native-deprecated-custom-components';

var codeTime = 60;
let DEFAULT_URL  = Service.HOST+'/cic/code?name=phonecheckrand&id='+new Date();
export default class Regist extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
            url:DEFAULT_URL,
            phone: '',
            passWord: '',
            //图形验证码
            phoneCheckImg: '',
            // 是否获取过验证码
            isGetCode: false,
            // 获取验证码方法
            onClick: this.getCode,
            //手机验证码
            phoneCode:null,
            timerCount:'',
            timerTitle:'获取验证码',
            // 是否有推荐人
            isRecommend: false,
            //推荐人
            referrer:'',
            isMarginTop: 180,
            showDialog:false,
        };
	}
  //返回
  _goBack(){
      goBack(this.props.navigator);
  }
  componentWillMount () {
        LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onFocus);
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onBlur);
  }

  componentWillUnmount () {
      this.keyboardDidShowListener.remove();
      this.state.keyboardDidHideListener.remove();
  }

  _getImgCode(){
      this.setState({
        url:Service.HOST+'/cic/code?name=phonecheckrand&id='+new Date(),
    })
  }

  tapEvent(e){
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
  }

  onFocus = () => {
      this.setState({
         isMarginTop:80,
      });
  }

  onBlur = () => {
      this.setState({
          isMarginTop:180,
      });
  }

	getCode = () => {
  		if (this.state.phone ==null || this.state.phone ==''){
  			return (
  				 toastShort('请先输入手机号！',-300)
  				);
  		}
  		if (this.state.phone.toString().length < 11 || this.state.phone.toString().length > 11) {
              return (
                  toastShort('手机号码格式不正确！',-300)
              );
      }
      if (this.state.phoneCheckImg ==null || this.state.phoneCheckImg ==''){
        return (
           toastShort('请先输入图形验证码！',-300)
          );
      }
       this.setState({
          onClick: null,
          timerCount:codeTime,
          timerTitle:'请留意短信',
          isGetCode: true,
      });

      let formData = new FormData();
      formData.append("OPT","105");
      formData.append("phoneNum",this.state.phone);
      formData.append("phoneCheckImg",this.state.phoneCheckImg)
      formData.append("codeType","REG_CODE");
      console.log(formData);
      Service.post(formData,(data)=>{    
        console.log(data);      
      	if (data.errorCode == 0){
      		this.setState({phoneNum:data.phoneNum});
      		this.interval=setInterval(() =>{
      			codeTime = this.state.timerCount - 1;
      			if(this.state.timerCount===0){
                      this.interval&&clearInterval(this.interval);
                      this.setState({
                          timerCount:'',
                          timerTitle:'获取验证码',
                          onClick: this.getCode,
                      });
                      codeTime = 60;
                  } else {
                      if (!this.state.isClick) {
                          this.setState({
                              timerCount:codeTime,
                              timerTitle:'请留意短信'
                          })
                      } else {
                          codeTime = 60;
                      }
                  }
              },1000);
       } else {
     	    this.setState({
                  onClick: this.getCode,
                  timerCount:'',
                  timerTitle:'获取验证码',
                  isGetCode: false,
              });
              toastShort(data.errorMsg,-300);
              //alert(data.errorMsg);
          }
     },(error)=>{
          console.log(error);
          Alert.alert(
              '提示信息',
              '您的网络不稳定，请稍后再试！',
              [
                  {text: '确定', },
              ]
          )
      });
    };

	clickRecommend = () => {
        this.setState({referrer: !this.state.referrer});
    };

	onClick (){
			 this.setState({
	           isClick: true,
	        });
	        this.props.navigator.push({component:Login,name:'Login'})
	};

	 //回退
    /*_goBack(){
        this.setState({
            isClick: true,
        });
        let route = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(route[0]);
    }*/

    //注册
    regist = () =>{
    	 if (this.state.phone == '') {
            return (
                toastShort('请先输入手机号！',-300)
            );
        }
        /*if (this.state.phoneNum.length < 11 || this.state.phoneNum.length > 11) {
            return (
                toastShort('手机号码格式不正确！',-300)
            );
        }*/
        if (this.state.passWord == null || this.state.passWord == '') {
            return (
                toastShort('请先输入密码！',-300)
            );
        }
        if (this.state.isGetCode == false) {
            return (
                toastShort('请先获取验证码！',-300)
            );
        }
        if (this.state.phoneCode == null || this.state.phoneCode == '') {
            return (
                toastShort('请输入验证码！',-300)
            );
         }
        this.setState({showDialog:true,});
        let formTjData = new FormData();
        formTjData.append("OPT","102");
        formTjData.append("phoneNum",this.state.phone);
        formTjData.append("passWord",this.state.passWord);
        formTjData.append("referrer",this.state.referrer);
        formTjData.append("phonecheckImgVal",this.state.phoneCheckImg);
        formTjData.append("phoneCode",this.state.phoneCode);
        formTjData.append("appType",1);
        formTjData.append("en","F");
        console.log(formTjData);
        Service.post(formTjData,(data)=>{
          console.log(data);
          this.setState({
            isClick:true,
          });
          if(data.errorCode == 0){
            this.setState({showDialog:false});
            this.props.navigator.push({component:AppMain,name:'AppMain'});
            //跳转
            Alert.alert(
              '提示信息',
              '注册成功，立即登录吧！',
              [
                {text:'取消',},
                {text:'确定',onPress:() => this.props.navigator.push({
                  component:Login,name:'Login'
                })},
              ]
            )
          }
          else {
            toastShort(data.errorMsg,300);
            this.setState({showDialog:false});
          }
        },(error) => {
          this.setState({showDialog:false});
          Alert.alert('提示信息','您的网络不稳定，请稍后再试！')
        });
    };

	render(){
		return(
			<View style={styles.container}>
				<TitleBar
				           title={"注册"}
				           leftBtnFunc={this._goBack.bind(this)}
		         		/>
		         <View style={styles.content}>
		         	<View style={styles.line}>
		         		<Image
		         		    style={styles.icon}
		         			source={require("../../imgs/other/phone.png")}/>
		         		<TextInput style={styles.textInput}
		         			placeholderTextColor="#999"
		         			placeholder="请输入手机号码"
                  ref="phone"
		         			onChangeText={(phone) => this.setState({phone})}
		         			underlineColorAndroid = "transparent"/>
		         	</View>
		         	<View style={styles.line}>
		         		<Image
							style={styles.icon}
		         			source={require("../../imgs/other/password.png")}/>
		         		<TextInput style={styles.textInput}
		         			placeholder="请输入密码"
                  secureTextEntry={true}
                  ref="passWord"
		         			placeholderTextColor="#999"
		         			onChangeText={(passWord) => this.setState({passWord})}
		         			underlineColorAndroid = "transparent"/>
		         	</View>
		         	<View style={styles.line}>
		         		<Image
		         		    style={styles.icon}
		         			source={require("../../imgs/other/people.png")}/>
		         		<TextInput style={styles.textInput}
		         			placeholderTextColor="#999"
		         			placeholder="推荐人(可不填)"
                  ref="referrer"
		         			onChangeText={(referrer) => this.setState({referrer})}
		         			underlineColorAndroid = "transparent"/>
		         	</View>
              <View style={styles.line}>
                <Image
                  style={styles.icon}
                  source={require("../../imgs/other/cord.png")}/>
                <TextInput style={{width:400/StyleConfig.oPx,fontSize:15,color:'#999'}}
                  placeholder="请输入图形验证码"
                  placeholderTextColor="#999"
                  ref="phoneCheckImg"
                  onChangeText={(phoneCheckImg) => this.setState({phoneCheckImg})}
                  underlineColorAndroid = "transparent"/>
                <View style={styles.imgCord}>
                  <Image source={{uri:this.state.url}} style={{width:160/StyleConfig.oPx,height:52/StyleConfig.oPx}}/>
                  <TouchableOpacity onPress={this._getImgCode.bind(this)}>
                    <Text style={styles.imgFont}>刷新</Text>
                  </TouchableOpacity>
                </View>
              </View>
		         	<View style={styles.line}>
		         		<Image
		         			style={styles.icon}
		         			source={require("../../imgs/other/cord.png")}/>
		         		<TextInput style={{width:400/StyleConfig.oPx,fontSize:15,color:'#999'}}
		         			placeholder="请输入手机验证码"
		         			placeholderTextColor="#999"
                  ref="phoneCode"
		         			onChangeText={(phoneCode) => this.setState({phoneCode})}
		         			underlineColorAndroid = "transparent"/>
		         		<TouchableOpacity style={styles.getCord}>
		         			<Text style={styles.getFont}  
                    onPress={this.state.onClick}>{this.state.timerCount} 
                    {this.state.timerTitle}</Text>
		         		</TouchableOpacity>
		         	</View>

		         	<View style={{marginTop:100/StyleConfig.oPx}}>
		         		<Button 
                  text="注册" textColor="#fff"
		         		 	onPress={this.regist}
		         			height={104/StyleConfig.oPx}
				  			width={685/StyleConfig.oPx}/>
		         	</View>
		         	<View style={styles.login}>
		         		<Text>已有账号,</Text>
		         		<TouchableOpacity onPress={this.onClick.bind(this)}>
		         			<Text style={styles.loginBtn}>马上登录</Text>
		         		</TouchableOpacity>
		         	</View>
		         </View>
	    	</View>
			);

	}
}
