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

 export default class ProductDetail extends Component {
   constructor(props) {
     super(props);
     this.state = {}
   }

   render(){
     return(
       <ScrollView>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>项目名称</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>中邮宝</Text>
           </View>
         </View>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>项目金额</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>3千万</Text>
           </View>
         </View>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>融资企业</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>深圳前海国有商业保理有限公司</Text>
           </View>
         </View>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>资金托管人</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>汇付天下有限公司</Text>
           </View>
         </View>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>资金投向</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>
               投资人的资金用于国内优质石油贸易公司
               （仅限于拥有国家办法成品油贸易牌照的石油贸易公司）
               在石油交易过程中上下游交易环节中获得的应收账款。</Text>
           </View>
         </View>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>收益起算日</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>产品募集完成之后的第二天开始计算利息</Text>
           </View>
         </View>
         <View style={styles.line}>
           <View style={styles.title}>
             <Text style={styles.title_text}>还款到账方式</Text>
           </View>
           <View style={styles.content}>
             <Text style={styles.content_text}>
               中油宝理财产品管理人预计将在产品到期日的第二个工作日将应还资金
               （包含投资本金和投资收益）划入投资者在中仁财富平台合作的第三方
               资金托管账户，具体到账时间将以汇付天下的到账时间表作为参考。如
               若原始资产发行人未能及时足额兑付本金及收益损失的风险，届时中仁
               财富将会按照平台安全保障方案中的措施依次实施，从而保障投资人的
               本息安全。具体可参考《中仁财富保障页面》。
             </Text>
           </View>
         </View>
       </ScrollView>
     );
   }
 }

 const styles = StyleSheet.create({
   line:{
     width:750/oPx,
     paddingLeft:24/oPx,
     paddingRight:24/oPx,
     flexDirection:'row',
     marginTop:20/oPx,
   },
   title:{
     flex:1,
     paddingRight:24/oPx,
   },
   title_text:{
     fontSize:28/oPx,
     color:'#999',
     lineHeight:26,
   },
   content:{
     flex:2,
   },
   content_text:{
     fontSize:28/oPx,
     color:'#666',
     lineHeight:26,
   }
 })
