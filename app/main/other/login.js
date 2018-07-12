import React, { Component } from 'react';
import {
   	View,
    Text,
    Appregistry,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,//键盘遮挡
    StatusBar,
    Animated,
    Keyboard,
    LayoutAnimation,
    Alert,
} from 'react-native';

import Service from '../../utils/service';
import Button from '../../components/Button';
import TitleBar from '../../components/TitleBar';
import {StyleConfig} from '../../style/index';
import {goBack} from '../../utils/NavigatorBack';
import {toastShort} from '../../utils/Toast';
import Regist from '../../main/other/regist';
import AppMain from '../../main/appMain';
import Storage from '../../utils/Storage';
import RetrievePasswordPage from './retrievePasswordPage';
import {Navigator} from 'react-native-deprecated-custom-components';
//import 3des from 'nod3des';

const oPx = StyleConfig.oPx;
export default class Login extends Component{
	 constructor(props) {
        super(props);
        this.state = {
            userName: 'zr1020',
            passWord: '111111',
            phone: null,
            phoneNum: 'zr1020',
            logoW:266,
            logoH:360,
            logoTop:160,
            marginTop:180,
            keyboardDidHideListener:null,
        }
     }

   componentWillMount () {
        Storage.clear();
        //LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onFocus);
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onBlur);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.state.keyboardDidHideListener.remove();
    }
    tapEvent(e){
        //LayoutAnimation.spring();
        this.setState({
            logoW:266,
            logoH:360,
            logoTop:160,
            marginTop:180,
        });
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }
    onFocus = () => {
        //LayoutAnimation.spring();
        this.setState({
            logoW:160,
            logoH:217,
            logoTop:120,
            marginTop:120,
        });
    }

    onBlur = () => {
        LayoutAnimation.spring();
        this.setState({
            logoW:266,
            logoH:360,
            logoTop:160,
            marginTop:180,
        });
    }
    login(){
        if (this.state.phoneNum == null || this.state.phoneNum == '') {
            return (
                toastShort('请先输入手机号/用户名！',-300)
            );
        }
        if (this.state.passWord == null || this.state.passWord == '') {
            return (
                toastShort('请先输入密码！',-300)
            );
        }

        this.setState({showDialog:true});
        let formTjData = new FormData();
        formTjData.append("OPT","101");
        formTjData.append("phoneNum",this.state.phoneNum);
        formTjData.append("passWord",this.state.passWord);  
        formTjData.append("en","F");
        Service.post(formTjData,(data)=> {

           console.log(data);
           /*console.log(data.errorCode);

           /*console.log(data);
           console.log(data.errorCode);

            /*
           console.log(data);
           console.log(data.errorCode);

           console.log(data.errorMsg);
           console.log("data.result.userID:"+data.result.userID);
            */
           
           if(data.errorCode==0){
                let param = {
                    OPID:data.result.opId,//第三方托管账户ID
                    PHONE:data.result.phone,
                    USERID:data.result.userId,
                    UID:data.result.userId,
                    USERNAME:data.result.userName,
                    USERNAMECN:data.result.userNameCN,
                };
                Storage.setItem('USER',param);
                Storage.getItem('USER');
                global.USER = param;
                this.props.navigator.resetTo({
                    component:AppMain,
                    name:'AppMain',
                    param:{
                        selectedTab:'myAcccount'
                    }
                });
           }else{
               toastShort(data.errorMsg,-300)
           }
         },(error)=>{
            Alert.alert(
                '提示信息',
                '您的网络不稳定，请稍后再试！',
                [
                    {text: '确定', },
                ]
            )
         })
    }

        onClick(){
        // 进行跳转并传递参数
        this.props.navigator.push({
          component: Regist,
          name: 'Regist'
          });
        }

        //忘记密码
        onForgetPwd(){
          this.props.navigator.push({
            component:RetrievePasswordPage,
            name:'RetrievePasswordPage',
          })
        }

        //返回
        _goBack(){
            goBack(this.props.navigator);
        }

        render(){
        	return(
        		<View style={styles.bodyView}>
                    <TitleBar title="登录" leftBtnFunc={this._goBack.bind(this)}/>
                    <View style={styles.content}>
                        <View style={styles.line}>
                            <Image
                                style={styles.icon}
                                source={require("../../imgs/other/phone.png")}/>
                            <TextInput style={styles.textInput}
                                placeholder="用户名或手机号"
                                placeholderTextColor="#999"
                                underlineColorAndroid = "transparent"
                                ref="phoneNum"
                                onChangeText={(phoneNum) => this.setState({phoneNum})}
                            />
                        </View>
                        <View style={styles.line}>
                            <Image
                                style={styles.icon}
                                source={require("../../imgs/other/password.png")}/>
                            <TextInput style={styles.textInput}
                                placeholderTextColor="#999"
                                underlineColorAndroid = "transparent"
                                placeholder="密码"
                                ref="passWord"
                                secureTextEntry={true}
                                onChangeText={(passWord) => this.setState({passWord})}
                                />
                        </View>
                        <View  style={styles.forget}>
                            <TouchableOpacity onPress={this.onForgetPwd.bind(this)}>
                                <Text style={styles.forgetText}>忘记密码?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:50/StyleConfig.oPx}}>
                            <Button 
                                text="登录" textColor="#fff" onPress={this.login.bind(this)}
                                height={104/StyleConfig.oPx}
                                width={680/StyleConfig.oPx}/>
                        </View>
                        <View style={{marginTop:20/StyleConfig.oPx}}>
                            <Button
                                text="注册送红包" textColor="#ffb133"
                                imgSource={require('../../imgs/other/index_regist_btn.png')}
                                onPress={this.onClick.bind(this)}
                                height={104/StyleConfig.oPx}
                                width={676/StyleConfig.oPx}
                            />
                        </View>
            		</View>
                </View>
        	);
        }
}

const styles = StyleSheet.create({
	bodyView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content:{
        paddingLeft:40/oPx,
        paddingTop:20/oPx,
        paddingRight:40/oPx,
    },
    line:{
        flexDirection:'row',
        justifyContent:'flex-start',
        height:100/oPx,
        alignItems:'center',
        marginTop:30/oPx,
        width:StyleConfig.screen_width-80/StyleConfig.oPx,
        borderBottomWidth:StyleConfig.borderWidth,
        borderColor:'#ccc'
    },
    textInput:{
        width:515/oPx,
        color:'#999',
        fontSize:15,
        //height:80/oPx,
    },
    icon:{
        width:46/oPx,
        height:46/oPx
    },
    forget:{
        height:80/oPx,
        marginTop:15/oPx,
    },
    forgetText:{
        textAlign:'right',
        fontSize:15,
        color:'#0f98df'
    },
});
