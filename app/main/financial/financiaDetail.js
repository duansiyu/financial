'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   TextInput,
   ScrollView,
   ART,
   Alert,
   ListView,
   WebView,
   ActivityIndicator,
   Dimensions,
   TouchableOpacity
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 import TitleBar from '../../components/TitleBar';
 import TabNavigator from 'react-native-tab-navigator';
 import NewProductDetail from '../../main/financial/NewProductDetail';
 import InvestmentRecord from '../../main/financial/InvestmentRecord';
 import Index from '../../main/index/index';
 import {goBack} from '../../utils/NavigatorBack';
 import Service from '../../utils/service';
 import {toastShort} from '../../utils/Toast';
 import CouponList from './CouponList';
 import IncreaseList from './IncreaseList';
 import Recharge from '../../main/myWealth/Recharge/Recharge';
 import ViewHtml from '../../components/ViewHtml';
 import {ActionUrl} from '../../utils/ActionUrl';
 import AppMain from '../appMain';
 import {Navigator} from 'react-native-deprecated-custom-components';
 import PercentageCircle from 'react-native-percentage-circle'; 
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
 const oPx = StyleConfig.oPx;
 var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
 export default class financialDetail extends Component{
   constructor(props) {
     super(props);
      let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
      isRefreshing:false,
      isShowBottomRefresh:true,
      id:null,
      title:null,
      tap:'1',
      listData: listData.cloneWithRows([]),
      investMoney:0,
      increaseMoney:0,
      money:0,
    };
   }

   _goBack(){
      goBack(this.props.navigator);
      /*this.props.navigator.push({
        name:"AppMain",
        component:AppMain,
        params:{
          selectedTab:'financial'
        }
      });*/
   }

   componentDidMount() { 
      this._getData();   
      this.setState({  
          id:this.props.id, 
          title:this.props.title, 
          money:this.props.money,//代金券金额
          increaseMoney:this.props.increaseMoney,//加息券金额
          investMoney:this.props.investMoney,//投资金额
      });
    }  

    //剩余可投金额
    surplus(amount,progress) {
      let percent = progress/100;
      let surplus = amount - amount*percent;
      return surplus.toFixed(2);
    }

    //产品详情
    _productUri(){
      let uri = ActionUrl.PROJECT_DETAIL_ADDRESS+"?id="+this.props.id+"&device=app";
      return uri;
    }

    //风控措施
    _RisktUri(){      
      let uri = ActionUrl.WIND_CONTROL_ADDRESS+"?id="+this.props.id+"&device=app";
      return uri;
    }

    //充值
    _goToRecharge =()=>{
      this.props.navigator.push({
        component:Recharge,
        name:'Recharge',
      })
    }

    _investMoney(investMoney,money,increaseMoney){
      let  couponMoney=parseInt(money)+parseInt(increaseMoney);
      if(investMoney>0&&money>0&&increaseMoney>0){
      let total = parseInt(investMoney)+parseInt(money)+parseInt(increaseMoney);
      return total;
      }
      if(money>0&&investMoney>0){
        return parseInt(investMoney)+parseInt(money);
      }
      if(increaseMoney>0&&increaseMoney>0){
        return parseInt(investMoney)+parseInt(increaseMoney);
      }
      return investMoney
    }

    //投标
    buy(){
      let investMoney = parseInt(this.state.investMoney);
      if(investMoney==''||this.state.investMoney==null){
       return( toastShort("请输入投资金额",-300))
      }
      if(investMoney>this.state.balance){
       return(toastShort("余额不足请先充值",-300))
      }
      if(investMoney>this.surplus(this.state.amount,this.state.progress)){
       return(toastShort("投资金额大于剩余可投资金额",-300))
      }
      if(investMoney<(this._investMoney(this.state.investMoney,this.state.money,this.state.increaseMoney)-investMoney)){
        return (toastShort("投资金额小于优惠券金额"));
      }
      else{
        let url=ActionUrl.INVEST_ADDRESS;//投标地址
          url+="?bId=" +this.props.id+"&amount="+this._investMoney(this.state.investMoney,this.state.money,this.state.increaseMoney);
          this._openUrl(url,"投标");
       }
    }

    //webview打开页面
    _openUrl = (url_,title_) =>{
        console.log(title_+':'+url_);
        this.props.navigator.push({
            component:ViewHtml,
            name:'openViewHtml',
            params:{
                url:url_,
                title:title_,
                showTitle:true
            }
        });
    }
    _getData() {
         this.setState({showDialog:true});
         this.setState({isRefreshing: true});   //显示刷新中
         let formTjData = new FormData();
         formTjData.append("OPT","110");
         formTjData.append("id",this.props.id);
         Service.post(formTjData,(data)=> {
           var errorCode = data.errorCode;
           var errorMsg = data.errorMsg;
           console.log(data);
           if(errorCode==0){
               this.setState({
                  apr:data.result.apr,       //年化利率
                  period:data.result.period ,//借款期限
                  progress:data.result.progress,//进度
                  periodUnit:data.result.periodUnit,//借款期限单位
                  state:data.result.state ,//状态
                  amount:data.result.amount,//总额
                  sendTime:data.result.sendTime,//发标时间
                  addRate:data.result.addRate,//加息
                  baseRate:data.result.baseRate,//基本利息
               });
           }else{
               toastShort(data.errorMsg,-300)
               //alert(errorMsg);
           }
         },(error)=>{
               });


         //余额
         let balanceData = new FormData();
         balanceData.append("OPT","120");
         Service.post(balanceData,(data)=>{
          console.log(data);
           this.setState({
              balance:data.result.balance,//余额
            });
        }); 

         //代金券
         let cashData = new FormData();
         cashData.append("OPT","129");
         cashData.append("status","1");
         Service.post(cashData,(data)=>{
          this.setState({
            cash:data.result.myredmoney.length,//代金券数量
          });
         });

         //加息券
         let IncreaseData = new FormData();
         IncreaseData.append("OPT","129");
         IncreaseData.append("status","2");
         Service.post(IncreaseData,(data)=>{
          this.setState({
            increase:data.result.myredmoney.length,//代金券数量
          });
         });

         //投资记录
         let investData = new FormData();
         investData.append("OPT","115");
         investData.append("bId",this.props.id);
         Service.post(investData,(data)=>{
          var invest = data.result.records;
          if(invest.length==0){
             this.setState({
             isEmpty:true
           });
           return;
          }; 
          this.setState({
            listData: this.state.listData.cloneWithRows(invest),
          });
         }); 
    }

    _renderFooter() {
     if(this.state.isEmpty){
       return (<View style={styles.moreBottom}>
               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
       </View>)
     }
     if(this.state.isShowBottomRefresh){
         return (<View style={{marginVertical: 10}}>
                 <ActivityIndicator />
         </View>)
     }
    }

    cashButton(cash){
      if (cash == '0'){
        return <View style={styles.right_half}>
                   <Text style={styles.no_choose}>暂不可选择</Text>
               </View>;
       
        }else{
          if(this.state.money>0){
            return <TouchableOpacity style={styles.right_half} onPress={this._goToCash.bind(this)}>
                    <Text style={styles.choose} ref="money" onChangeText={(money) => this.setState({money})}>{this.state.money}</Text>
                 </TouchableOpacity>;
          }
          if(this.state.money=='a'){
             return <TouchableOpacity style={styles.right_half} onPress={this._goToCash.bind(this)}>
                    <Text style={styles.no_choose}>不使用</Text>
                 </TouchableOpacity>;}
            else{
          }
          return <TouchableOpacity style={styles.right_half} onPress={this._goToCash.bind(this)}>
                    <Text style={styles.choose}>去使用</Text>
                 </TouchableOpacity>;}
        }

    _goToCash(){
      this.props.navigator.push({
        component: CouponList,
          name: 'CouponList',
          params:{           
            id:this.props.id,
            title:this.props.title,
            increaseMoney:this.state.increaseMoney,
            investMoney:this.state.investMoney,
          }
      })
    }

    increaseButton(increase){
       if (increase == '0'){
        return <View style={styles.right_half}>
                   <Text style={styles.no_choose}>暂不可选择</Text>
               </View>;
       
        }else{
          if(this.state.increaseMoney>0){
            return <TouchableOpacity style={styles.right_half}  onPress={this._goToIncrease.bind(this)}>
                      <Text style={styles.choose}>{this.state.increaseMoney}</Text>
                   </TouchableOpacity>;
          }
          if(this.state.increaseMoney=='a'){
             return <TouchableOpacity style={styles.right_half} onPress={this._goToIncrease.bind(this)}>
                    <Text style={styles.no_choose}>不使用</Text>
                 </TouchableOpacity>;
          }
          else{ return <TouchableOpacity style={styles.right_half}  onPress={this._goToIncrease.bind(this)}>
                   <Text style={styles.choose}>去使用</Text>
                 </TouchableOpacity>;}
        }
    }

    _goToIncrease(){
      this.props.navigator.push({
        component: IncreaseList,
          name: 'IncreaseList',
          params:{
            id:this.props.id,
            title:this.props.title,
            money:this.state.money,
            investMoney:this.state.investMoney,
          }
      })
    }


    //生成list
     _renderRow = (data) => {
         return (
       <InvestmentRecord data={data}/>
         );
     }

    _tapPress(tag){
      this.setState({tap:tag});
   }

   render(){
     return(
       <View style={{backgroundColor:'#f5f5f5',flex:1,position:'relative'}}>
         <TitleBar title='理财详情' leftBtnFunc={this._goBack.bind(this)}/>
         <ScrollView style={{marginBottom:100/oPx}}>
           <View style={styles.Title}>
             <Text style={styles.title_font}>{ this.state.title }</Text>
           </View>
           <View style={styles.info}>
             <View style={styles.left}>
               <View style={styles.circle}></View>
               <Text style={styles.font}>{ this.state.period}{ this.state.periodUnit}</Text>
             </View>
             <View style={styles.center}>
               <View style={styles.circle}></View>
               <Text style={styles.font}>T(满标日)+1计息</Text>
             </View>
             <View style={styles.right}>
               <View style={styles.circle}></View>
               <Text style={styles.font}>先息后本</Text>
             </View>
           </View>
           <View style={styles.percent}>
              <PercentageCircle radius={50} percent={this.state.progress} color={"#ff6600"}>   
                <View style={{position:'absolute',justifyContent:'center'}}>
                  <Text style={styles.font}>年化收益</Text>
                  <Text style={styles.percent_num}>{this.state.apr}%</Text>
                </View> 
              </PercentageCircle>       
           </View>
           <View style={styles.info}>
             <View style={styles.left_half}>
               <Text style={styles.money}>
                 总金额:
                 <Text style={styles.money_num}>{this.state.amount}</Text>
                 元
               </Text>
             </View>
             <View style={styles.right_half}>
               <Text style={styles.money}>
                 剩余可投资金额:
                 <Text style={styles.money_num}>{this.surplus(this.state.amount,this.state.progress)}</Text>
                 元
               </Text>
             </View>
           </View>
           <View style={styles.info}>
             <View style={styles.left_half}>
               <Text style={styles.money}>
                 可用余额:
                 <Text style={styles.money_num}>{this.state.balance}</Text>
                 元
               </Text>
             </View>
             <View style={styles.right_half}>
               <TouchableOpacity style={styles.btn} onPress={this._goToRecharge}>
                 <Text style={styles.btn_text}>立即充值</Text>
               </TouchableOpacity>
             </View>
           </View>
           <View style={{marginTop:20/oPx}}>
             <View style={styles.info}>
               <View style={styles.left_half}>
                 <Text style={styles.money}>投资金额</Text>
               </View>
               <View style={styles.right_half}>
                 <TextInput style={styles.input}
                   placeholder="请输入购买金额"
                   placeholderTextColor="#999"
                   ref="investMoney"
                   onChangeText={(investMoney) => this.setState({investMoney})}
                   underlineColorAndroid = "transparent">
                   {this.state.investMoney}
                   </TextInput>
                </View>
             </View>
           </View>
           <View style={{marginTop:20/oPx}}>
               <View style={styles.line}>
                 <View style={styles.left_half}>
                   <Text style={styles.money}>代金券</Text>
                   <Text style={styles.vouchers}>{this.state.cash}张可用</Text>
                 </View>
                 {this.cashButton(this.state.cash)}
               </View>
               <View style={styles.line}>
                 <View style={styles.left_half}>
                   <Text style={styles.money}>加息券</Text>
                   <Text style={styles.vouchers}>{this.state.increase}张可用</Text>
                 </View>
                 {this.increaseButton(this.state.increase)}
               </View>
           </View>
           <View style={styles.details}>
             <Text style={{fontSize:32/oPx,color:'#999'}}>项目详情</Text>
             <Image style={styles.details_img}
               source={require('../../imgs/financial/detail.png')}/>
           </View>
           <View style={styles.menu}>
             <TouchableOpacity style={styles.menu_view} onPress={()=>this._tapPress('1')}>
                <Text style={this.state.tap==='1'?styles.menu_pre:styles.menu_text}>产品详情</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.menu_view} onPress={()=>this._tapPress('2')}>
                <Text style={this.state.tap==='2'?styles.menu_pre:styles.menu_text}>风控措施</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.menu_view} onPress={()=>this._tapPress('3')}>
                <Text style={this.state.tap==='3'?styles.menu_pre:styles.menu_text}>投资记录</Text>
             </TouchableOpacity>
           </View>
           {this.state.tap==='1'?
             <ScrollView>
               <WebView 
                style={{width:750/oPx,height:deviceHeight}}
                source={{uri: this._productUri()}}
                />
              </ScrollView>:null}
           {this.state.tap==='2'?
             <ScrollView>
               <WebView 
                style={{width:750/oPx,height:deviceHeight}}
                source={{uri: this._RisktUri()}}
                />
              </ScrollView>:null}
           {this.state.tap==='3'?
           <View>
               <Text style={styles.record}>
                 记录每一条投资信息
               </Text>
               <View style={styles.title}>
                 <View style={styles.text_view}>
                   <Text style={styles.text}>加入事件</Text>
                 </View>
                 <View style={styles.text_view}>
                   <Text style={styles.text}>用户名</Text>
                 </View>
                 <View style={styles.text_view}>
                   <Text style={styles.text}>金额</Text>
                 </View>
               </View>
               <ListView
                  dataSource={this.state.listData}
                  renderRow={this._renderRow}
                  enableEmptySections={true}
                  renderFooter={this._renderFooter.bind(this)}
                />
            </View>
           :null}
         </ScrollView>
         {this.state.state==2?
         <TouchableOpacity style={styles.buy} onPress={this.buy.bind(this)}>
           <Text style={{fontSize:34/oPx,color:'#fff'}}>立即购买</Text>           
         </TouchableOpacity>:null
        }
        {this.state.state==6?
         <View style={styles.will}>
           <Text style={{fontSize:34/oPx,color:'#fff'}}>即将开售</Text>           
         </View>:null
        }
        {this.state.state==3?
         <View style={styles.finish}>
           <Text style={{fontSize:34/oPx,color:'#fff'}}>还款中</Text>           
         </View>:null
        }
        {this.state.state==4?
         <View style={styles.finish}>
           <Text style={{fontSize:34/oPx,color:'#fff'}}>已完成</Text>           
         </View>:null
        }
       </View>
     );
   }
  }
  const styles = StyleSheet.create({
  listView:{
    backgroundColor:'#e9ecf3',
    marginTop:16/oPx
  },
  moreBottom:{
    height:80/oPx,
    justifyContent:'center',
    alignItems:'center'
  },
    Title:{
      width:750/oPx,
      alignItems:'center',
      justifyContent:'center',
      paddingTop:28/oPx,
      backgroundColor:'#fff',
      //paddingBottom:28/oPx,
    },
    title_font:{
      fontSize:33/oPx,
      color:'#333',
    },
    info:{
      flexDirection:'row',
      width:750/oPx,
      alignItems:'center',
      backgroundColor:'#fff',
      paddingTop:10/oPx,
      paddingBottom:10/oPx,
    },
    left:{
      justifyContent:'flex-end',
      flex:1,
      alignItems:'center',
      flexDirection:'row',
    },
    center:{
      justifyContent:'center',
      flex:1,
      alignItems:'center',
      flexDirection:'row',
    },
    right:{
      justifyContent:'flex-start',
      flex:1,
      alignItems:'center',
      flexDirection:'row',
    },
    circle:{
      width:6/oPx,
      height:6/oPx,
      backgroundColor:'#fc0d1b',
      borderRadius:3/oPx,
      marginRight:10/oPx,
    },
    font:{
      fontSize:24/oPx,
      color:'#999',
    },
    //进度条
    percent:{
      width:750/oPx,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      paddingTop:20/oPx,
      paddingBottom:20/oPx
    },
    percent_num:{
      fontSize:54/oPx,
      color:'#fc0d1b'
    },
    left_half:{
      paddingLeft:24/oPx,
      flexDirection:'row',
      justifyContent:'flex-start',
      flex:1,
    },
    right_half:{
      flex:1,
      paddingRight:24/oPx,
      flexDirection:'row',
      justifyContent:'flex-end'
    },
    money:{
      fontSize:28/oPx,
      color:'#999',
    },
    money_num:{
      color:'#ff6600',
      fontSize:28/oPx,
      fontWeight:'400',
    },
    btn:{
      width:160/oPx,
      height:60/oPx,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8/oPx,
      backgroundColor:'#fc0d1b',
    },
    btn_text:{
      fontSize:30/oPx,
      color:'#fff',
    },
    input:{
      width:270/oPx,
      fontSize:28/oPx,
      color:'#999',
      textAlign:'right'
    },
    vouchers:{
      fontSize:28/oPx,
      color:'#999',
      marginLeft:20/oPx,
    },
    choose:{
      color:'#ff6600',
      fontSize:28/oPx,
    },
    no_choose:{
      fontSize:28/oPx,
      color:'#999',
    },
    line:{
      flexDirection:'row',
      width:750/oPx,
      alignItems:'center',
      backgroundColor:'#fff',
      paddingTop:20/oPx,
      paddingBottom:20/oPx,
    },
    //项目详情
    details:{
      width:750/oPx,
      height:280/oPx,
      justifyContent:'center',
      alignItems:'center',
    },
    details_img:{
      width:28/oPx,
      height:25/oPx,
    },
    //菜单
    menu:{
      width:750/oPx,
      height:80/oPx,
      backgroundColor:'#fff',
      justifyContent:'center',
      flexDirection:'row',
      alignItems:'center',
    },
    menu_view:{
      width:250/oPx,
      justifyContent:'center',
      alignItems:'center',
      height:80/oPx,
      paddingLeft:50/oPx,
      paddingRight:50/oPx,
    },
    menu_text:{
      textAlign:'center',
      fontSize:28/oPx,
      alignItems:'center',
      color:'#333',
    },
    menu_pre:{
      alignItems:'center',
      textAlign:'center',
      fontSize:28/oPx,
      color:'#fc0d1b',
     /* borderBottomWidth:3/oPx,
      borderColor:'#fc0d1b',*/
    },
    //立即购买
    buy:{
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      backgroundColor:'#ffb133',
      height:100/oPx,
      justifyContent:'center',
      alignItems:'center',
    },
    will:{
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      backgroundColor:'#ffc097',
      height:100/oPx,
      justifyContent:'center',
      alignItems:'center',
    },
    finish:{
       position:'absolute',
      left:0,
      right:0,
      bottom:0,
      backgroundColor:'#d8d8d8',
      height:100/oPx,
      justifyContent:'center',
      alignItems:'center',
    },
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
