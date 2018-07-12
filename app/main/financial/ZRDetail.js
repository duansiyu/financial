'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   TextInput,
   ScrollView,
   ListView,
   WebView,
   Dimensions,
   ActivityIndicator,
   TouchableOpacity
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 import TitleBar from '../../components/TitleBar';
 import TabNavigator from 'react-native-tab-navigator';
 import Index from '../../main/index/index';
 import Service from '../../utils/service';
 import ZQZRBuy from './ZQZRBuy';
 import Recharge from '../../main/myWealth/Recharge/Recharge';
 import InvestmentRecord from './InvestmentRecord';
 import {ActionUrl} from '../../utils/ActionUrl';
 import {goBack} from '../../utils/NavigatorBack';
 import {toastShort} from '../../utils/Toast';
 import ViewHtml from '../../components/ViewHtml';

 const oPx = StyleConfig.oPx;
  var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
 export default class  ZRDetail extends Component {
   constructor(props){
      super(props);
      let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        id:null,
        title:null,
        tap:'1',
        isShowBottomRefresh:true,
        listData: listData.cloneWithRows([]),
      };
    }

   _goBack(){
      goBack(this.props.navigator);
   }

   //充值
    _goToRecharge =()=>{
      this.props.navigator.push({
        component:Recharge,
        name:'Recharge',
      })
    }

   componentDidMount() { 
      this._getData();   
      this.setState({  
          id:this.props.id,  
          title:this.props.title, 
      });
    } 

   //产品详情
    _productUri(loansignid){
      let uri = ActionUrl.PROJECT_DETAIL_ADDRESS+"?id="+loansignid+"&device=app";
      return uri;
    }

    //风控措施
    _RisktUri(loansignid){
      let uri = ActionUrl.WIND_CONTROL_ADDRESS+"?id="+loansignid+"&device=app";
      return uri;
    }

   _getData(){
      let zqzrData = new FormData();
      zqzrData.append("OPT","154");
      zqzrData.append("id",this.props.id);
      Service.post(zqzrData,(data)=>{
        this.setState({
          /*id:data.result.id,
          title:data.result.title,*/
          price:data.result.price, //价格
          period:data.result.period, //转让期数
          periodtotle:data.result.periodtotle, //总期数
          state:data.result.state, //转让状态
          money:data.result.money, //本金
          interest:data.result.interest,// 利息
          rate:data.result.rate,   //标的利率
          endtime:data.result.endtime, //本次转让到期时间
          myBalance:data.result.myBalance, //我的余额
          loansignid:data.result.loansignid, //标的id
        });
      })

      //余额
       let balanceData = new FormData();
       balanceData.append("OPT","120");
       Service.post(balanceData,(data)=>{
         this.setState({
            balance:data.result.balance,//余额
          });
      }); 
   };

   _getInvestData(loansignid){
    //投资记录
       let investData = new FormData();
       investData.append("OPT","115");
       investData.append("bId",loansignid);
       Service.post(investData,(data)=>{
        if(data.errorCode==0){
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
        }else{
          toastShort(data.errorMsg,-300);
        }
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
    //生成list
     _renderRow = (data) => {
         return (
       <InvestmentRecord data={data}/>
         );
     }

    _tapPress(tag){
      this.setState({tap:tag});
   }

   //待收本息
   _getInterest(money,interest){
    return money+interest;
   }

    //投标
    buy(){
      let url=ActionUrl.TRANSFER_ADDRESS;//购买债权转让地址
      url+= "?bId=" +this.props.id;
      this._openUrl(url,"购买");
      /*this.props.navigator.push({
        component:ZQZRBuy,
        name:'ZQZRBuy',
        params:{
          uri:uri
        }
      })*/
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

   render(){
     return(
       <View style={{backgroundColor:'#f5f5f5',flex:1}}>
         <TitleBar title='转让详情' leftBtnFunc={this._goBack.bind(this)}/>
         <ScrollView style={{marginBottom:100/oPx}}>
           <View style={styles.box}>
             <Text style={styles.title}>{this.state.title}</Text>
           </View>
           <View style={styles.box}>
             <View style={styles.left}>
               <Text style={styles.unit}>
                 <Text style={styles.num}>{this.state.price}</Text>
                 元
               </Text>
               <Text style={styles.info}>转让价格</Text>
             </View>
             <View style={styles.right}>
               <Text style={styles.unit}>
                 <Text style={styles.num}>{this._getInterest(this.state.money,this.state.interest)}</Text>
                 元
               </Text>
               <Text style={styles.info}>待收本息</Text>
             </View>
           </View>
           <View style={styles.box}>
             <View style={styles.right}>
               <Text style={styles.font}>{this.state.rate*100}%的年化收益</Text>
               <View style={styles.border}>
                 <Text style={styles.border_text}>每月付息到期还本</Text>
               </View>
             </View>
             <View style={styles.right}>
               <Text style={styles.font}>转让期数/总期数：{this.state.period}/{this.state.periodtotle}</Text>
               <View style={styles.border}>
                 <Text style={styles.border_text}>到期时间：{this.state.endtime}</Text>
               </View>
             </View>
           </View>
           <View style={styles.line}>
             <View style={{width:375/oPx,paddingLeft:24/oPx}}>
               <Text style={styles.balance_text}>可用余额
                 <Text style={styles.balance_num}>{this.state.balance}</Text>
                 元
               </Text>
             </View>
             <View style={{width:375/oPx,paddingRight:24/oPx,flexDirection:'row',justifyContent:'flex-end',}}>
               <TouchableOpacity style={styles.top_up} onPress={this._goToRecharge}>
                 <Text style={styles.top_text}>立即充值</Text>
               </TouchableOpacity>
             </View>
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
                source={{uri: this._productUri(this.state.loansignid)}}
                />
              </ScrollView>:null}
           {this.state.tap==='2'?
             <ScrollView>
               <WebView 
                style={{width:750/oPx,height:deviceHeight}}
                source={{uri: this._RisktUri(this.state.loansignid)}}
                />
              </ScrollView>:null}
           {this.state.tap==='3'?
           <View>
               <Text style={styles.record}>
                 记录每一条投资信息
               </Text>
               <View style={styles.record_title}>
                 <View style={styles.text_view}>
                   <Text style={styles.text}>加入时间</Text>
                 </View>
                 <View style={styles.text_view}>
                   <Text style={styles.text}>用户名</Text>
                 </View>
                 <View style={styles.text_view}>
                   <Text style={styles.text}>金额</Text>
                 </View>
               </View>
                { this._getInvestData(this.state.loansignid)}
               <ListView
                  dataSource={this.state.listData}
                  renderRow={this._renderRow}
                  enableEmptySections={true}
                  renderFooter={this._renderFooter.bind(this)}
                />
            </View>
           :null}
        </ScrollView>
        {this.state.state=="转让完成"?
          <View style={styles.finish}>
            <Text style={{fontSize:34/oPx,color:'#fff'}}>已完成</Text>
          </View>:
          <TouchableOpacity style={styles.buy} onPress={this.buy.bind(this)}>
            <Text style={{fontSize:34/oPx,color:'#fff'}}>立即购买</Text>
          </TouchableOpacity>
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
   box:{
     width:750/oPx,
     justifyContent:'center',
     alignItems:'center',
     paddingTop:10/oPx,
     paddingBottom:10/oPx,
     backgroundColor:'#fff',
     flexDirection:'row',
   },
   title:{
     fontSize:34/oPx,
     color:'#333',
     fontWeight:'400',
   },
   left:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     borderRightWidth:StyleConfig.borderWidth,
     borderColor:'#f5f5f5',
   },
   right:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     paddingBottom:10/oPx,
   },
   num:{
     fontSize:36/oPx,
     color:'#ff6600',
     fontWeight:'400',
   },
   info:{
     fontSize:24/oPx,
     color:'#666',
     fontWeight:'400',
     marginTop:10/oPx,
   },
   unit:{
     fontSize:28/oPx,
     color:'#999',
     fontWeight:'400',
   },
   font:{
     fontSize:28/oPx,
     color:'#333',
     fontWeight:'400',
   },
   border:{
     marginTop:10/oPx,
     borderWidth:1/oPx,
     borderColor:'#e5e5e5',
     borderRadius:8/oPx,
     paddingTop:5/oPx,
     paddingBottom:5/oPx,
     paddingLeft:5/oPx,
     paddingRight:5/oPx,
   },
   border_text:{
     fontSize:24/oPx,
     color:'#999',
     fontWeight:'300',
   },
   line:{
     width:750/oPx,
     backgroundColor:'#fff',
     flexDirection:'row',
     paddingBottom:10/oPx,
     marginBottom:20/oPx,
   },
   balance_text:{
     fontSize:28/oPx,
     color:'#666',
     fontWeight:'300',
   },
   balance_num:{
     fontSize:28/oPx,
     color:'#ff6600',
     fontWeight:'300',
   },
   top_up:{
     backgroundColor:'#ff404c',
     height:55/oPx,
     justifyContent:'center',
     alignItems:'center',
     width:150/oPx,
     borderRadius:5/oPx,
    // marginRight:24/oPx,
   },
   top_text:{
     color:'#fff',
     fontSize:30/oPx,
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
   finish:{
     position:'absolute',
     left:0,
     right:0,
     bottom:0,
     backgroundColor:'#c5c5c5',
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
     record_title:{
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
