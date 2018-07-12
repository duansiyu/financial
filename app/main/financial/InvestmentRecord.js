'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   TextInput,
   ScrollView,
   TouchableOpacity
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 const oPx = StyleConfig.oPx;

 export default class InvestmentRrecord extends Component {
   constructor(props){
     super(props);
     this.state = {

     }
   }

   render(){
     let data = this.props.data;
       return(
         <View style={styles.data_line}>
           <View style={styles.text_view}>
             <Text style={styles.text}>{data.investDate}</Text>
           </View>
           <View style={styles.text_view}>
             <Text style={styles.text}>{data.userName}</Text>
           </View>
           <View style={styles.text_view}>
             <Text style={styles.text}>{data.amount}</Text>
           </View>
         </View>
       );
    }
  }
   const styles = StyleSheet.create({
     record:{
       fontSize:28/oPx,
       color:'#666',
       paddingLeft:24/oPx,
       paddingTop:10/oPx,
       paddingBottom:10/oPx,

     },
     title:{
       width:750/oPx,
       flexDirection:'row',
       justifyContent:'center',
       backgroundColor:'#fff',
       alignItems:'center',
       height:80/oPx,
     },
     text_view:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
     },
     text:{
       fontSize:28/oPx,
       color:'#666',
     },
     data_line:{
       width:750/oPx,
       flexDirection:'row',
       justifyContent:'center',
       backgroundColor:'#fff',
       alignItems:'center',
       paddingTop:10/oPx,
       paddingBottom:10/oPx
     }

   })
