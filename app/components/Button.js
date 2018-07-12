//按钮
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {StyleConfig} from '../style';
const oPx = StyleConfig.oPx;

export default class Button extends Component{
   constructor(props) {
     super(props);
   }

   render(){
     //初始化按钮组件
     let height = !this.props.height ? 88/oPx :this.props.height;
     let width = !this.props.width ? 576/oPx :this.props.width;
     let imgSource = !this.props.imgSource ? require('../imgs/other/index_exp_btn.png') : this.props.imgSource;
     let oText = this.props.text;
     let textColor = !this.props.textColor ? '#fff': this.props.textColor;
     let fontSize = !this.props.fontSize ? 18 :this.props.fontSize;
     let backgroundColor = !this.props.backgroundColor ? '#ff4a55': this.props.backgroundColor;
     return (
       <TouchableOpacity onPress={this.props.onPress} >
         <Image style={{height:height, width:width, justifyContent:'center',alignSelf:'center'}} source={imgSource}>
           <Text style={{backgroundColor:'transparent',textAlign:'center',fontSize:fontSize,color:textColor}}>
             {oText}
           </Text>
         </Image>
       </TouchableOpacity>
     )
   }
 }