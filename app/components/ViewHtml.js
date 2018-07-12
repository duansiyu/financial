/**
 * Created by cqm on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Dimensions,
    WebView
} from 'react-native';
import { goBack } from '../utils/NavigatorBack';
import TitleBar from '../components/TitleBar';
import Service from '../utils/service';
import AppMain from '../main/appMain';
import ShowMsg from './ShowMsg';

//获取设备的宽度和高度
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

export default class ViewHtml extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: this.props.url?this.urlCheck(this.props.url):null,          //显示地址
            title: this.props.title?this.props.title:'',                     //显示标题
            method: this.props.method?this.props.method:'GET',               //获取方式
            showTitle: this.props.showTitle==false?false:true,               //是否显示标题（默认显示）
        }
    }

    urlCheck(url_){
        //console.log("url:"+url_);
        console.log("this.props.showTitle:"+this.props.showTitle);
        console.log("deviceWidth:"+deviceWidth);
        console.log("deviceHeight:"+deviceHeight);
        var urlResult='';
        if(url_ && (url_.indexOf('http://')==-1 && url_.indexOf('www.')==-1) ){
            urlResult=Service.HOST+url_;
        }else{
            urlResult=url_;
        }
        //console.log("urlResult:"+urlResult);
        return urlResult;
    }

    _goBack(){
        goBack(this.props.navigator);
    }

    _onMessage(event){
     console.log("event.nativeEvent.data:"+event.nativeEvent.data);
     try{
        let callbackData = JSON.parse(event.nativeEvent.data);
        if(callbackData.app){
            //this.props.navigator.resetTo({component:AppMain,name:'AppMain',params:callbackData});
            console.log("callbackData.app-true:");
        }else{
            //this.props.navigator.push({component:ShowMsg,name:'ShowMsg',params:callbackData});
            console.log("callbackData.app-false:");
        }
        console.log("callbackData:"+JSON.stringify(callbackData));

        //提示并返回
        if(callbackData.result){
            Alert.alert(
                '提示信息',
                ''+callbackData.result,
                [
                    {text: '确定', onPress: () => goBack(this.props.navigator)},
                ]
            )
        }
     }catch(error){
        console.log("error:"+error);
        //报错并返回
        Alert.alert(
            '错误信息',
            ''+error,
            [
                {text: '确定', onPress: () => goBack(this.props.navigator)},
            ]
        )
     }
        
     
   }

    render(){
        const jsCode = `window.reactNativePostmsg = window.postMessage;window.Native = true;`;
        const {url,html} = this.props;
        let source = html?
                    {html:html}
                    :
                    {uri:this.state.url, method: this.state.method};
        return (
            <View style={{flex:1}}>
                {
                this.state.showTitle ?
                <TitleBar title={this.state.title} leftBtnFunc={this._goBack.bind(this)}/>
                : 
                null
                }

            <WebView
                onError={()=>alert('error')}
                source={source}
                injectedJavaScript={jsCode}
                messagingEnabled={false}
                onMessage={(event) => this._onMessage(event)}
                style={[{backgroundColor:'#fff'}]}
                startInLoadingState={true}
                />

                {/*
                 <WebView bounces={false}
                         scalesPageToFit={true}
                         source={{uri:this.state.url, method: this.state.method}}
                         style={{width:deviceWidth, height:deviceHeight}}
                         scrollEnabled={true}
                         >
                </WebView>
                */}

            </View>
        );
    }
}
