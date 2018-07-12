'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   ScrollView,
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 const oPx = StyleConfig.oPx;

 export default class  RiskControl extends Component {
   constructor(props) {
     super(props);
     this.state = {

     };
   }

   render(){
     return(
       <ScrollView style={{backgroundColor:'#f5f5f5'}}>
         <View style={styles.line}>
           <Text style={styles.title}>一、核实基础交易</Text>
           <Text style={styles.content}>核实基础交易；专业律师团队尽调基础合同（买卖双方企业贸易合同）的真实合法性，保证项目的真实、有效、合法；</Text>
         </View>
         <View style={styles.line}>
           <Text style={styles.title}>二、甄选优质核心企业</Text>
           <Text style={styles.content}>实地调查采购商（买方）和供应商（卖方）的企业运转情况，评估采购商的付款能力和采购商违约的情况下供应商回购应收账款的能力；保证项目资金的安全性；</Text>
         </View>
         <View style={styles.line}>
           <Text style={styles.title}>三、双重尽调，保证信息真实有效公开</Text>
           <Text style={styles.content}>中仁财富对每笔交易项目进行再次尽调后再发布收益权转让信息；</Text>
         </View>
         <View style={styles.line}>
           <Text style={styles.title}>四、债券覆盖，三重担保，到期回购</Text>
           <Text style={styles.content}>融资金额为应收账款的70%以内，保证债券覆盖；供应商及实际控制人保证到期回购转让的应收账款；在其无法回购时，中仁财富将在特定条件下回购投资份额；</Text>
         </View>
         <View style={styles.line}>
           <Text style={styles.title}>五、资金全程监督，保证资金不被挪用</Text>
           <Text style={styles.content}>投资人资金由第三方支付公司汇富天下监督，保证投资人的投资资金、回收资金不被挪用。</Text>
         </View>
         <View style={styles.line}>
           <Text style={styles.title}>六、担保公司担保保障</Text>
           <Text style={styles.content}>深圳中汇金融资担保有限公司对项目提供连带责任担保。</Text>
         </View>
       </ScrollView>
     );
   }
 }

 const styles = StyleSheet.create({
   line:{
     width:750/oPx,
     marginTop:20/oPx,
     paddingLeft:24/oPx,
     paddingRight:24/oPx,
   },
   title:{
     fontSize:28/oPx,
     color:'#333',
     paddingTop:10/oPx,
     paddingBottom:10/oPx,
   },
   content:{
     fontSize:28/oPx,
     color:'#666',
     lineHeight:26,
   }
 });
