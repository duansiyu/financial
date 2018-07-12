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

 export default class Authentication extends Component{
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
        });
      })
    }

    //姓名
    name(realName){
      if(realName==null||realName=='')
      {
        return <TextInput  underlineColorAndroid = "transparent" style={styles.right}/>;
      }else{
        return <Text style={styles.right}>{realName}</Text>;
      }
    }

    //身份证
    cardNum(cardId){
      if(cardId==null||cardId=='')
      {
        return <TextInput  underlineColorAndroid = "transparent" style={styles.right}/>;
      }else{
        return <Text style={styles.right}>{cardId}</Text>;
      }
    }

    //按钮
    button(realName,cardId){
      if(realName!=null&&realName!=''&&cardId!=null&&cardId!=''){
        return null;
      }else{
        return <TouchableOpacity style={styles.button}>
                  <Text style={styles.button_text}>提交信息</Text>
               </TouchableOpacity>;
      }
    }

    render(){
      return(
      <View>
        <TitleBar title="身份验证" leftBtnFunc={this._goBack.bind(this)}/>
        <View style={{marginTop:20/oPx}}>
          <View style={styles.line}>
            <Text style={styles.line_font}>姓名:</Text>
            {this.name(this.state.realName)}
          </View>
          <View style={styles.line}>
            <Text style={styles.line_font}>身份证件:</Text>
            {this.cardNum(this.state.cardId)}
          </View>
        </View>
        {this.button(this.state.realName,this.state.cardId)}
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
      width:160/oPx,
      paddingLeft:10/oPx
    },
    right:{
      marginLeft:10/oPx,
      width:470/oPx,
      //fontSize:28/oPx,
      color:'#666',
    },
    button:{
      backgroundColor:'#ffb133',
      marginTop:90/oPx,
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