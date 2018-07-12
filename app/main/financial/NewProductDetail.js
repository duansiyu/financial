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

 export default class NewProductDetail extends Component {
   constructor(props) {
     super(props);
     this.state = {}
   }

   render(){
     return(
       <ScrollView>
         <View style={styles.new_box}>
           <Image source={require('../../imgs/financial/new.png')}
                  style={styles.new}/>
         </View>
         <View style={styles.center}>
           <View style={styles.left}>
             <Text style={styles.title}>安全保障</Text>
             <View style={styles.line}>
               <View style={styles.point}></View>
               <Text style={styles.text}>借款企业业绩稳步发展，还款能力有保障；</Text>
             </View>
             <View style={styles.line}>
               <View style={styles.point}></View>
               <Text style={styles.text}>第三方资金托管，全程监管资金流向；</Text>
             </View>
             <View style={styles.line}>
               <View style={styles.point}></View>
               <Text style={styles.text}>债券覆盖，三重担保，到期回购；</Text>
             </View>
             <View style={styles.line}>
               <View style={styles.point}></View>
               <Text style={styles.text}>知名实力担保公司连带责任担保；</Text>
             </View>
           </View>
           <View style={styles.right}>
             <Image source={require('../../imgs/financial/protect.png')}
                    style={styles.circle}/>
           </View>
         </View>
         <View style={styles.bottom}>
           <View style={styles.bottom_title}>
             <Text style={styles.title_text}>资金投向</Text>
           </View>
           <Text style={styles.bottom_text}>投资产品为
             <Text style={{color:'#fc0d1b'}}>优质供应链金融应收应付账款项目（中金链）</Text>
             资产端项目均来自于国家战略新兴产业和中央重点扶持产业领域内的上下游企业，多为上市公司
             、国有企业稀缺优质供应链、政府项目等。借款资金主要用于借款企业在供应链管理经营过程中
             对接优质的电子科技、新能源、旅游开发等领域供应链资产项目，扩大企业业务规模，增强企业盈利能力。
           </Text>
           <Text style={styles.bottom_text}>
             此产品由
             <Text style={{color:'#fc0d1b'}}>优质供应链金融应收应付账款项目（中金链）</Text>
             （以下简称“公司”）担保，成立于2010年，地址位于深圳市福田区CBD，公司注册资本为30000万元，
             实收资本为30000万元。公司持有中华人民共和国融资性担保机构经营许可证（机构编码为粤8800404）。
           </Text>
         </View>
       </ScrollView>
     );
   }
 }

 const styles = StyleSheet.create({
   new_box:{
     width:750/oPx,
     height:395/oPx,
   },
   new:{
     width:StyleConfig.screen_width,
     height:395/oPx,
   },
   left:{
     flex:2.5,
     paddingLeft:24/oPx,
     alignItems:'center',
     paddingTop:20/oPx,
     paddingBottom:20/oPx,
   },
   right:{
     flex:1.5,
     paddingRight:24/oPx,
     alignItems:'center',
     paddingLeft:10/oPx,
     paddingTop:20/oPx,
     paddingBottom:20/oPx,
   },
   title:{
     fontSize:30/oPx,
     color:'#666',
   },
   point:{
     width:20/oPx,
     height:20/oPx,
     borderRadius:10/oPx,
     backgroundColor:'#666666',
     marginRight:10/oPx,
   },
   line:{
     flexDirection:'row',
     alignItems:'center',
     marginTop:10/oPx,
   },
   text:{
     fontSize:28/oPx,
     color:'#333',
   },
   circle:{
     width:295/oPx,
     height:295/oPx,
   },
   center:{
     width:750/oPx,
     flexDirection:'row',
     alignItems:'center',
   },
   bottom:{
     width:750/oPx,
     paddingLeft:24/oPx,
     paddingRight:24/oPx,
     marginTop:20/oPx,
     backgroundColor:'#fce5cf',
     paddingBottom:20/oPx,
   },
   bottom_title:{
     paddingTop:10/oPx,
     height:80/oPx,
     alignItems:'center',
     borderBottomWidth:1/oPx,
     borderColor:'#666',
     justifyContent:'flex-start',
   },
   title_text:{
     fontSize:30/oPx,
     width:702/oPx,
     color:'#333',
   },
   bottom_text:{
     fontSize:28/oPx,
     color:'#333',
     lineHeight:34,
   },
 })
