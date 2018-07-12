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
   Switch,//开关
   TouchableOpacity
 } from 'react-native';

 import {StyleConfig} from '../../../style/index';
 import TitleBar from '../../../components/TitleBar';
 import {goBack} from '../../../utils/NavigatorBack';
 import setGesture from '../../other/setGesture';
 import {Navigator} from 'react-native-deprecated-custom-components';
 const oPx = StyleConfig.oPx;

 export default class Gesture extends Component{
  	constructor(props) {
  	  super(props);
  	  this.state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
      };
  	}

  	_goBack(){
  		goBack(this.props.navigator);
  	}

    _goToGesture(){
      this.props.navigator.push({
        name:'setGesture',
        component:setGesture,
        params:{
          isSetOrLogn:'set'
        }
      })
    }

  	render(){
  		return(
  			<View style={{backgroundColor:'#f5f5f5',height:StyleConfig.screen_heigth}}>
  				<TitleBar title="手势密码" leftBtnFunc={this._goBack.bind(this)}/>
          <View style={{marginTop:20/oPx}}>
              <View style={styles.line}>
                <Text style={styles.line_font}>手势密码:</Text>
                <View style={styles.right}>
                  <Switch
                    onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                    value={this.state.falseSwitchIsOn}                   
                    thumbTintColor='#f5f5f5'
                    tintColor='#f5f5f5' />
                </View>
            </View>
            <Text style={styles.text}>
              进入应用时需要手势密码验证
            </Text>
            <TouchableOpacity style={styles.line} onPress={this._goToGesture.bind(this)}>
              <Text style={styles.line_fontG}>修改手势密码</Text>
              <Image source={require('../../../imgs/myWealth/icon_right.png')}
                  style={styles.icon_right}/>
          </TouchableOpacity>
          </View>
        </View>
          );
    }
  }

  const styles =StyleSheet.create({
     line:{
      height:100/oPx,
      width:StyleConfig.screen_width,
      backgroundColor:'#fff',
      paddingLeft:24/oPx,
      paddingRight:24/oPx,
      flexDirection:'row',
      alignItems:'center',
    },
    line_font:{
      color:'#333',
      fontSize:28/oPx,
      width:600/oPx,
      paddingLeft:10/oPx,
    },
    line_fontG:{
      color:'#333',
      fontSize:28/oPx,
      width:680/oPx,
      paddingLeft:10/oPx,
    },
    right:{
      marginLeft:10/oPx,
    },
    text:{
      fontSize:28/oPx,
      color:'#666',
      marginLeft:24/oPx,
      paddingTop:20/oPx,
      paddingBottom:20/oPx,
    },
    icon_right:{
      width:22/oPx,
      height:22/oPx,
    },
  })