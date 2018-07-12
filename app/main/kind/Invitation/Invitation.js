import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Share,
  TouchableOpacity,
} from 'react-native';

import TitleBar from '../../../components/TitleBar';
import {StyleConfig} from '../../../style';
import Rules from '../../kind/Invitation/Rules';
import {goBack} from '../../../utils/NavigatorBack';
import Index from '../../index/index';
import Service from '../../../utils/service';
import {toastShort} from '../../../utils/Toast';
import MyInvitation from '../../kind/Invitation/MyInvitation';
import {Navigator} from 'react-native-deprecated-custom-components';
const oPx = StyleConfig.oPx;
var WeChat=require('react-native-wechat');
import * as QQAPI from 'react-native-qq';
export default class Invitation extends Component{
  constructor(props) {
      super(props);
      this.state={};
  }

  //返回
    _goBack(){
        goBack(this.props.navigator);
    }

  _goToRules = () =>{
    this.props.navigator.push({
          component : Rules,
          name:'Rules',
      });
  }

  _goToMyInvitation = () => {
    this.props.navigator.push({
      component: MyInvitation,
      name: 'MyInvitation'
    });
  }

  componentDidMount(){
       this._getData();
  }

  _getData(){
    let shareData = new FormData();
    shareData.append('OPT','162');
    Service.post(shareData,(data)=>{
      console.log(data);
      if(data.errorCode==0){
        this.setState({
          strtxt:data.result.strtxt,//分享文本，
          strurl:data.result.strurl,//分享地址
          totalbonus:data.result.totalbonus,//推荐奖金总额
        })
      }else{
          toastShort(data.errorMsg,-300);
      }
    });
  }

  //微信朋友分享
  shareFriends(){
    WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToTimeline({
          title:'中仁财富',
          description: this.state.strtxt,
          thumbImage: '../../../imgs/icon/icon_01_pre.png',
          type: 'news',
          webpageUrl: this.state.strurl
        })
        .catch((error) => {
          ToastShort(error.message);
        });
      } else {
        ToastShort('没有安装微信软件，请您安装微信之后再试');
      }
    });
  }

  //微信朋友圈分享
  /*shareCircle(){
     WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToTimeline({
          title:'中仁财富',
          description: this.state.strtxt,
          thumbImage: '../../../imgs/icon/icon_01_pre.png',
          type: 'news',
          webpageUrl:this.state.strurl
        })
        .catch((error) => {
          ToastShort(error.message);
        });
      } else {
        ToastShort('没有安装微信软件，请您安装微信之后再试');
      }
    });
  }*/

  //QQ朋友分享
  QQshare(){
   return QQAPI.shareToQQ({
      type:'news',
      title:'中仁财富',
      description:this.state.strtxt,//分享内容
      webpageUrl:this.state.strurl,//网页地址
      //imageUrl:远程图片地址,
    })
  }

  //QQ空间分享
  Qzone(){
   QQAPI.shareToQzone({
      type:'news',
      title:'中仁财富',
      description:this.state.strtxt,//分享内容
      webpageUrl:this.state.strurl,//网页地址
      //imageUrl:远程图片地址,
    })
  }

  //短信分享
   shareText() {
    Share.share({
      message: this.state.strtxt+this.state.strurl,
      title: '中仁财富'
    }, {
      dialogTitle: '邀请好友',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then()
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }
  render(){
    return(
      <View>
        <TitleBar title="邀请好友" leftBtnFunc={this._goBack.bind(this)}/>
        <TouchableOpacity style={styles.top_right} onPress={this._goToMyInvitation}>
          <Text style={styles.top_right_text}>我的邀请</Text>
        </TouchableOpacity>
        <Text style={styles.prize}> 您已获得{this.state.totalbonus}元邀请奖励</Text>
        <Text style={styles.info}>每成功邀请一位好友注册且投资，邀请人即可获得15元现金红包</Text>
        <TouchableOpacity style={styles.look} onPress={this._goToRules}>
          <Text style={styles.look_text}>查看规则</Text>
        </TouchableOpacity>
        <View style={styles.margin}>
          <TouchableOpacity onPress={this.shareFriends.bind(this)}>
            <Image source={require('../../../imgs/index/invitation/wechart.png')}
                   style={styles.share}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../imgs/index/invitation/friendCircle.png')}
                   style={styles.share}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../imgs/index/invitation/weibo.png')}
                   style={styles.share}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.QQshare.bind(this)}>
            <Image source={require('../../../imgs/index/invitation/qq.png')}
                   style={styles.share}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Qzone.bind(this)}>
            <Image source={require('../../../imgs/index/invitation/space.png')}
                   style={styles.share}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.shareText.bind(this)}>
            <Image source={require('../../../imgs/index/invitation/message.png')}
                   style={styles.share}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.info}>注：邀请页默认状态下会填入您绑定的手机号部分信息哦！</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
      top_right:{
        position:'absolute',
        right:28/oPx,
        top:40/oPx,
      },
      top_right_text:{
        color:'#fff',
        fontSize:28/oPx,
      },
      prize:{
        width:StyleConfig.screen_width,
        paddingBottom:24/oPx,
        paddingTop:24/oPx,
        paddingLeft:24/oPx,
        paddingRight:24/oPx,
        justifyContent:'center',
        alignItems:'center',
        fontSize:28/oPx,
        color:'#fc0d1b',
        fontWeight:'400',
      },
      info:{
        width:StyleConfig.screen_width,
        justifyContent:'center',
        paddingLeft:24/oPx,
        paddingRight:24/oPx,
        alignItems:'center',
        fontSize:28/oPx,
        color:'#999',
      },
      look:{
        marginLeft:24/oPx,
        marginRight:24/oPx,
        marginTop:24/oPx,
        marginBottom:24/oPx,
        height:80/oPx,
        borderColor:'#fc0d1b',
        borderWidth:2/oPx,
        paddingTop:10/oPx,
        paddingBottom:10/oPx,
        justifyContent:'center',
        alignItems:'center',
      },
      look_text:{
        fontSize:26/oPx,
        color:'#fc0d1b',
        fontWeight:'400',
      },
      margin:{
        marginLeft:24/oPx,
        marginRight:24/oPx,
        marginBottom:24/oPx,
        justifyContent:'center',
        flexDirection:'row',
      },
      share:{
        width:100/oPx,
        height:100/oPx,
        marginRight:10/oPx,
      }
})
