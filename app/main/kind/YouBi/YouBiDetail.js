'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   Alert,
   TouchableOpacity,
 } from 'react-native';

 import {StyleConfig} from '../../../style/index';
 const oPx = StyleConfig.oPx;
 export default class YouBiDetail extends Component{
   constructor(props) {
 	  super(props);
 	  this.state = {
    }
  }
  render(){
    let data = this.props.data;
    return(
      <View style={styles.line}>
        <View style={{flex:1.5,alignItems:'center'}}>
          <Text style={styles.title}>数量</Text>
          <Text style={styles.blue}>{data.amount}</Text>
        </View>
        <View style={{flex:2.5,alignItems:'center'}}>
          <Text style={styles.title}>事件</Text>
          <Text style={styles.content}>{data.memo}</Text>
        </View>
        <View style={{flex:2.5,alignItems:'center'}}>
          <Text style={styles.title}>时间</Text>
          <Text style={styles.content}>{data.createDate} {data.createTime}</Text>
        </View>
      </View>
    );
  }
 }

 const styles = StyleSheet.create({
   line:{
     paddingLeft:24/oPx,
     paddingTop:10/oPx,
     paddingBottom:10/oPx,
     paddingRight:24/oPx,
     flexDirection:'row',
     borderColor:'#e5e5e5',
     borderBottomWidth:StyleConfig.borderWidth,
     position:'relative',
     backgroundColor:'#fff',
   },
   title:{
     fontSize:24/oPx,
     color:'#999',
     paddingBottom:10/oPx,
     fontWeight:'400'
   },
   content:{
     fontSize:28/oPx,
     color:'#333',
     fontWeight:'400'
   },
   blue:{
     fontSize:28/oPx,
     color:'#0f98df',
     fontWeight:'400'
   },
   red:{
     fontSize:28/oPx,
     color:'#fc0d1b',
     fontWeight:'400'
   }
 })
