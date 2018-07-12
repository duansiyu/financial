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
 import Service from '../../../utils/service';
 const oPx = StyleConfig.oPx;

 export default class Mobile extends Component{
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
          phone:data.result.phone,
        });
      })
    }

    render(){
      return(
      <View>
        <TitleBar title="手机验证" leftBtnFunc={this._goBack.bind(this)}/>
        <View style={{marginTop:20/oPx}}>
          <View style={styles.line}>
            <Text style={styles.line_font}>手机号码:</Text>
            <Text style={styles.right}>{this.state.phone}</Text>
          </View>
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
      paddingLeft:24/oPx,
      paddingRight:24/oPx,
      flexDirection:'row',
      alignItems:'center',
    },
    line_font:{
      color:'#333',
      fontSize:28/oPx,
      width:160/oPx,
      paddingLeft:10/oPx
    },
    right:{
      marginLeft:10/oPx,
      width:470/oPx,
      fontSize:28/oPx,
      color:'#666',
    },
   })