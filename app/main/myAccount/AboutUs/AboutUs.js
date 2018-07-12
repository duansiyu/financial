import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
import AboutUsIn from './AboutUsIn';
import Feedback from'./Feedback';
import {toastShort} from '../../../utils/Toast';
import {Navigator} from 'react-native-deprecated-custom-components';

const oPx = StyleConfig.oPx;
export default class  AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  _goToAboutUsIn= () => {
    this.props.navigator.push({
      component: AboutUsIn,
      name: 'AboutUsIn'
    });
  }

  _goToFeedback= () => {

   /* this.props.navigator.push({
      component: Feedback,
      name: 'Feedback'
    });*/
    toastShort("该功能正在开发中",-300);
  }

  _goBack(){
    goBack(this.props.navigator);
  }

  render(){
    return(
      <View style={styles.container}>
        <TitileBar title='关于我们' leftBtnFunc={this._goBack.bind(this)}/>
        <View style={styles.top}>
          <Image style={styles.image} source={require('../../../imgs/myAccount/icon.png')}/>
          <Text style={{fontSize:30/oPx,color:'#333',marginTop:10/oPx}}>
            中仁财富
          </Text>
        </View>
        <View style={styles.center_box}>
          <TouchableOpacity style={styles.line} onPress={this._goToFeedback}>
            <Text style={styles.font}>意见反馈</Text>
            <Image style={styles.icon_right} source={require('../../../imgs/myWealth/icon_right.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.line} onPress={this._goToAboutUsIn}>
            <Text style={styles.font}>关于我们</Text>
            <Image style={styles.icon_right} source={require('../../../imgs/myWealth/icon_right.png')}/>
          </TouchableOpacity>
          <View  style={styles.line}>
            <Text style={styles.font}>版本信息</Text>
            <View style={{width:222/oPx,alignItems:'center',marginLeft:350/oPx}}>
              <Text style={styles.font_right}>当前版本v1.0</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.line}>
            <Text style={styles.font}>缓存清理</Text>
            <View style={{width:200/oPx,alignItems:'center',marginLeft:372/oPx}}>
              <Text style={styles.cash}>0.0B</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottom_font}>深圳前海中仁互联网金融服务有限公司</Text>
          <Text style={styles.bottom_font}>Copyright © 201509 中仁财富</Text>
          <Text style={styles.bottom_font}>粤ICP备15084118号</Text>
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
    top:{
      height:260/oPx,
      width:750/oPx,
      justifyContent:'center',
      alignItems:'center',
    },
    image:{
      width:120/oPx,
      height:120/oPx,
    },
    center_box:{
      width:750/oPx,
      backgroundColor:'#fff',
    },
    line:{
      height:80/oPx,
      backgroundColor:'#fff',
			borderColor:StyleConfig.borderColor,
			borderBottomWidth:StyleConfig.borderWidth,
			paddingLeft:24/oPx,
			paddingRight:24/oPx,
			flexDirection:'row',
			alignItems:'center',
    },
    font:{
      fontSize:28/oPx,
      color:'#333',
      fontWeight:'400',
      width:140/oPx,
    },
    icon_right:{
      width:22/oPx,
			height:22/oPx,
      marginLeft:550/oPx,
    },
    bottom:{
      width:750/oPx,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      bottom:20/oPx,
      left:0,
    },
    bottom_font:{
      fontSize:24/oPx,
      color:'#999',
      marginTop:10/oPx,
    },
    font_right:{
      fontSize:28/oPx,
      color:'#999',
      textAlign:'right',
      width:220/oPx,
    },
    cash:{
      fontSize:28/oPx,
      color:'#999',
      width:200/oPx,
      textAlign:'right'
    }
  });
